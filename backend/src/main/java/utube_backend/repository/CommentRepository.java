package utube_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import utube_backend.comment.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}