package utube_backend.config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableRabbit
public class RabbitConfig {
    public static final String PROCESSING_QUEUE = "video.processing";
    public static final String COMPLETED_QUEUE = "video.completed";
    public static final String FAILED_QUEUE = "video.failed";

    @Bean
    Queue processingQueue() { return new Queue(PROCESSING_QUEUE, true); }

    @Bean
    Queue completedQueue() { return new Queue(COMPLETED_QUEUE, true); }

    @Bean
    Queue failedQueue() { return new Queue(FAILED_QUEUE, true); }

    @Bean
    SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory(
            ConnectionFactory connectionFactory) {
        var factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        return factory;
    }
}
