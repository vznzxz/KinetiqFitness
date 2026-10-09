package com.kinetiq.controller;

import com.kinetiq.dto.ContentRequest;
import com.kinetiq.model.FitnessContent;
import com.kinetiq.model.User;
import com.kinetiq.service.FitnessContentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content")
public class FitnessContentController {

    @Autowired
    private FitnessContentService contentService;

    @GetMapping("/public")
    public ResponseEntity<List<FitnessContent>> getApprovedContent() {
        return ResponseEntity.ok(contentService.getApprovedContent());
    }

    @PostMapping
    public ResponseEntity<FitnessContent> submitContent(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody ContentRequest request) {
        FitnessContent content = contentService.submitContent(user, request);
        return new ResponseEntity<>(content, HttpStatus.CREATED);
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<FitnessContent> likeContent(@PathVariable Long id) {
        return ResponseEntity.ok(contentService.likeContent(id));
    }
}
