package utube_backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import utube_backend.config.RabbitConfig;
import utube_backend.video.Video;
import utube_backend.video.VideoStatus;

@Component
public class VideoProcessingListener {
    private final VideoService videoService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public VideoProcessingListener(VideoService videoService) {
        this.videoService = videoService;
    }

    @RabbitListener(queues = RabbitConfig.COMPLETED_QUEUE)
    public void completed(String body) throws Exception {
        JsonNode n = objectMapper.readTree(body);
        Long id = n.get("videoId").asLong();
        Video video = videoService.getVideoById(id);
        video.setStatus(VideoStatus.READY);
        video.setHlsObjectKey(n.get("masterPlaylistKey").asText());
        video.setThumbnailObjectKey(n.get("thumbnailKey").asText());
        videoService.saveVideo(video);
        System.out.println("Video " + id + " is READY");
    }

    @RabbitListener(queues = RabbitConfig.FAILED_QUEUE)
    public void failed(String body) throws Exception {
        JsonNode n = objectMapper.readTree(body);
        Long id = n.get("videoId").asLong();
        Video video = videoService.getVideoById(id);
        video.setStatus(VideoStatus.FAILED);
        videoService.saveVideo(video);
        System.out.println("Video " + id + " FAILED: " + n.get("error").asText());
    }
}
