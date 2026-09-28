package utube_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import utube_backend.user.User;

public interface UserRepository extends JpaRepository<User, Long> {

}