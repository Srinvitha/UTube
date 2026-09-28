package utube_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import utube_backend.view.View;

public interface ViewRepository extends JpaRepository<View, Long> {

}