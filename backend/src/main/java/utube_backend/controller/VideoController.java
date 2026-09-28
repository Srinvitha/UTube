package utube_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import utube_backend.service.UserService;
import utube_backend.service.VideoService;
import utube_backend.user.User;
import utube_backend.video.Video;
import utube_backend.video.VideoStatus;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    private final VideoService videoService;
    private final UserService userService;

    public VideoController(
            VideoService videoService,
            UserService userService) {
        this.videoService = videoService;
        this.userService = userService;
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
    public ResponseEntity<Video> createVideo(
            @RequestBody Video video,
            Authentication authentication) {

        User user = userService.getUserByUsername(
                authentication.getName());

        video.setUser(user);
        video.setStatus(VideoStatus.UPLOADING);
        video.setViews(0L);

        Video savedVideo = videoService.saveVideo(video);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedVideo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Video> updateVideo(
            @PathVariable Long id,
            @RequestBody Video request,
            Authentication authentication) {

        Video existing = videoService.getVideoById(id);

        if (!existing.getUser().getUsername()
                .equals(authentication.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        existing.setTitle(request.getTitle());
        existing.setDescription(request.getDescription());

        return ResponseEntity.ok(
                videoService.saveVideo(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVideo(
            @PathVariable Long id,
            Authentication authentication) {

        Video existing = videoService.getVideoById(id);

        if (!existing.getUser().getUsername()
                .equals(authentication.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        videoService.deleteVideo(id);

        return ResponseEntity.noContent().build();
    }
}