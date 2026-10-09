package com.kinetiq.controller;

import com.kinetiq.model.Challenge;
import com.kinetiq.model.ChallengeParticipation;
import com.kinetiq.model.User;
import com.kinetiq.service.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/challenges")
public class ChallengeController {

    @Autowired
    private ChallengeService challengeService;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getChallenges(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(challengeService.getChallengesForUser(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Challenge> getChallengeById(@PathVariable Long id) {
        return ResponseEntity.ok(challengeService.getChallengeById(id));
    }

    @PostMapping("/{id}/join")
    public ResponseEntity<ChallengeParticipation> joinChallenge(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        ChallengeParticipation participation = challengeService.joinChallenge(user, id);
        return new ResponseEntity<>(participation, HttpStatus.CREATED);
    }

    @PostMapping("/{id}/check-in")
    public ResponseEntity<ChallengeParticipation> checkInChallenge(
            @AuthenticationPrincipal User user,
            @PathVariable Long id,
            @RequestParam(defaultValue = "1") int increment) {
        ChallengeParticipation participation = challengeService.checkInChallenge(user, id, increment);
        return ResponseEntity.ok(participation);
    }

    @GetMapping("/history")
    public ResponseEntity<List<ChallengeParticipation>> getChallengeHistory(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(challengeService.getUserHistory(user));
    }
}
