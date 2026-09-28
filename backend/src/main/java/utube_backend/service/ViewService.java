package utube_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utube_backend.repository.ViewRepository;
import utube_backend.view.View;

@Service
public class ViewService {

    private final ViewRepository viewRepository;

    public ViewService(ViewRepository viewRepository) {
        this.viewRepository = viewRepository;
    }

    @Transactional(readOnly = true)
    public View getViewById(Long id) {
        return viewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("View not found"));
    }

    @Transactional
    public View saveView(View view) {
        return viewRepository.save(view);
    }

    @Transactional
    public void deleteView(Long id) {
        if (!viewRepository.existsById(id)) {
            throw new RuntimeException("View not found");
        }

        viewRepository.deleteById(id);
    }
}