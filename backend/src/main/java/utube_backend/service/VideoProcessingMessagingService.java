package utube_backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import utube_backend.config.RabbitConfig;

import java.util.HashMap;
import java.util.Map;

@Service
public class VideoProcessingMessagingService {
    private final RabbitTemplate rabbitTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public VideoProcessingMessagingService(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishProcessing(Long videoId, String originalKey) {
        Map<String, Object> msg = new HashMap<>();
        msg.put("videoId", videoId);
        msg.put("originalKey", originalKey);
        rabbitTemplate.convertAndSend(RabbitConfig.PROCESSING_QUEUE, write(msg));
    }

    private String write(Map<String,Object> msg) {
        try { return objectMapper.writeValueAsString(msg); }
        catch (Exception e) { throw new RuntimeException(e); }
    }
}
