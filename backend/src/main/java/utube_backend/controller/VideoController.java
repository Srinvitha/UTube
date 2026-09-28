package utube_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import utube_backend.service.UserService;
import utube_backend.service.VideoProcessingMessagingService;
import utube_backend.service.VideoService;
import utube_backend.service.StorageService;
import utube_backend.user.User;
import utube_backend.video.Video;
import utube_backend.video.VideoStatus;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
public class VideoController {
    private final VideoService videoService;
    private final UserService userService;
    private final StorageService storageService;
    private final VideoProcessingMessagingService messagingService;

    public VideoController(VideoService videoService, UserService userService,
                           StorageService storageService,
                           VideoProcessingMessagingService messagingService) {
        this.videoService = videoService;
        this.userService = userService;
        this.storageService = storageService;
        this.messagingService = messagingService;
    }

    @GetMapping
    public ResponseEntity<List<Video>> getVideos() {
        return ResponseEntity.ok(videoService.getAllVideos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Video> getVideo(@PathVariable Long id) {
        return ResponseEntity.ok(videoService.getVideoById(id));
    }

    @PostMapping
    public ResponseEntity<Video> createVideo(@RequestBody Video video, Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        video.setUser(user);
        video.setStatus(VideoStatus.UPLOADING);
        video.setViews(0L);
        return ResponseEntity.status(HttpStatus.CREATED).body(videoService.saveVideo(video));
    }

    @PostMapping("/upload")
    public ResponseEntity<Video> uploadVideo(
            @RequestParam("video") MultipartFile videoFile,
            @RequestParam("title") String title,
            @RequestParam(value = "description", defaultValue = "") String description,
            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail,
            Authentication authentication) throws Exception {

        User user = userService.getUserByUsername(authentication.getName());

        Video video = new Video();
        video.setUser(user);
        video.setTitle(title);
        video.setDescription(description);
        video.setOriginalFilename(videoFile.getOriginalFilename());
        video.setFileSize(videoFile.getSize());
        video.setStatus(VideoStatus.UPLOADING);
        video.setViews(0L);

        Video saved = videoService.saveVideo(video);

        try {
            String originalKey = storageService.uploadOriginal(videoFile, saved.getId());
            saved.setOriginalObjectKey(originalKey);

            if (thumbnail != null && !thumbnail.isEmpty()) {
                saved.setThumbnailObjectKey(
                        storageService.uploadThumbnail(thumbnail, saved.getId()));
            }

            saved.setStatus(VideoStatus.UPLOADED);
            saved = videoService.saveVideo(saved);

            messagingService.publishProcessing(saved.getId(), originalKey);

            saved.setStatus(VideoStatus.PROCESSING);
            saved = videoService.saveVideo(saved);

            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            saved.setStatus(VideoStatus.FAILED);
            videoService.saveVideo(saved);
            throw e;
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Video> updateVideo(@PathVariable Long id, @RequestBody Video request,
                                             Authentication authentication) {
        Video existing = videoService.getVideoById(id);
        if (!existing.getUser().getUsername().equals(authentication.getName()))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        existing.setTitle(request.getTitle());
        existing.setDescription(request.getDescription());
        return ResponseEntity.ok(videoService.saveVideo(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVideo(@PathVariable Long id, Authentication authentication) {
        Video existing = videoService.getVideoById(id);
        if (!existing.getUser().getUsername().equals(authentication.getName()))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        videoService.deleteVideo(id);
        return ResponseEntity.noContent().build();
    }
}
