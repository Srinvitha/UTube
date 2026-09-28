package utube_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import utube_backend.video.Video;

public interface VideoRepository extends JpaRepository<Video, Long> {

}