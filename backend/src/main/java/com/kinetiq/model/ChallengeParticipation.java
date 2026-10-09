package com.kinetiq.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "challenge_participations", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "challenge_id"})
})
public class ChallengeParticipation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"password", "bio", "createdAt"})
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge;

    private Integer currentProgress = 0;

    @Column(nullable = false, length = 30)
    private String status = "JOINED"; // JOINED, COMPLETED

    @Column(nullable = false)
    private LocalDate joinedDate = LocalDate.now();

    private LocalDate completedDate;

    public ChallengeParticipation() {}

    public ChallengeParticipation(User user, Challenge challenge) {
        this.user = user;
        this.challenge = challenge;
        this.currentProgress = 0;
        this.status = "JOINED";
        this.joinedDate = LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Challenge getChallenge() {
        return challenge;
    }

    public void setChallenge(Challenge challenge) {
        this.challenge = challenge;
    }

    public Integer getCurrentProgress() {
        return currentProgress != null ? currentProgress : 0;
    }

    public void setCurrentProgress(Integer currentProgress) {
        this.currentProgress = currentProgress;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getJoinedDate() {
        return joinedDate;
    }

    public void setJoinedDate(LocalDate joinedDate) {
        this.joinedDate = joinedDate;
    }

    public LocalDate getCompletedDate() {
        return completedDate;
    }

    public void setCompletedDate(LocalDate completedDate) {
        this.completedDate = completedDate;
    }
}
