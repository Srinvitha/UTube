package utube_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utube_backend.like.Like;
import utube_backend.repository.LikeRepository;

@Service
public class LikeService {

    private final LikeRepository likeRepository;

    public LikeService(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    @Transactional(readOnly = true)
    public Like getLikeById(Long id) {
        return likeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Like not found"));
    }

    @Transactional
    public Like saveLike(Like like) {
        return likeRepository.save(like);
    }

    @Transactional
    public void deleteLike(Long id) {
        if (!likeRepository.existsById(id)) {
            throw new RuntimeException("Like not found");
        }

        likeRepository.deleteById(id);
    }
}