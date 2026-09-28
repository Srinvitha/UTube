package utube_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import utube_backend.like.Like;

public interface LikeRepository extends JpaRepository<Like, Long> {

}