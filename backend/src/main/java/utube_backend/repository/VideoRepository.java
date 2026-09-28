package utube_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import utube_backend.user.User;
import utube_backend.video.Video;
import utube_backend.video.VideoStatus;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {

    List<Video> findByUser(User user);

    List<Video> findByStatus(VideoStatus status);
}