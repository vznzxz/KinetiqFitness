package com.kinetiq.service;

import com.kinetiq.dto.ContentRequest;
import com.kinetiq.exception.ResourceNotFoundException;
import com.kinetiq.model.ActivityLog;
import com.kinetiq.model.FitnessContent;
import com.kinetiq.model.User;
import com.kinetiq.repository.ActivityLogRepository;
import com.kinetiq.repository.FitnessContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FitnessContentService {

    @Autowired
    private FitnessContentRepository contentRepository;

    @Autowired
    private ActivityLogRepository activityLogRepository;

    public List<FitnessContent> getApprovedContent() {
        return contentRepository.findByStatusOrderByCreatedAtDesc("APPROVED");
    }

    public List<FitnessContent> getAllContent() {
        return contentRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional
    public FitnessContent submitContent(User user, ContentRequest request) {
        FitnessContent content = new FitnessContent();
        content.setAuthor(user);
        content.setTitle(request.getTitle());
        content.setCategory(request.getCategory());
        content.setContent(request.getContent());
        content.setReadTime(request.getReadTime() != null ? request.getReadTime() : "5 min");
        content.setTags(request.getTags());

        // Admins are approved automatically, users need approval
        if ("ROLE_ADMIN".equals(user.getRole())) {
            content.setStatus("APPROVED");
        } else {
            content.setStatus("PENDING");
        }

        FitnessContent saved = contentRepository.save(content);

        activityLogRepository.save(new ActivityLog(
                "Content Submitted",
                user.getName() + " submitted article: " + saved.getTitle(),
                user.getName(),
                "content"
        ));

        return saved;
    }

    @Transactional
    public FitnessContent updateStatus(Long id, String status) {
        FitnessContent content = contentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Content not found with id: " + id));

        content.setStatus(status.toUpperCase());
        FitnessContent saved = contentRepository.save(content);

        activityLogRepository.save(new ActivityLog(
                "Content Status Updated",
                "Article #" + id + " (" + content.getTitle() + ") marked as " + status,
                "Admin",
                "content"
        ));

        return saved;
    }

    @Transactional
    public FitnessContent likeContent(Long id) {
        FitnessContent content = contentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Content not found with id: " + id));

        content.setLikes(content.getLikes() + 1);
        return contentRepository.save(content);
    }
}
