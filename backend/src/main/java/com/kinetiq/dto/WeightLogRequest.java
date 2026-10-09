package com.kinetiq.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class WeightLogRequest {

    @NotNull(message = "Weight is required")
    private Double weightKg;

    private Double bodyFatPercentage;

    private LocalDate recordedDate;

    public WeightLogRequest() {}

    public Double getWeightKg() {
        return weightKg;
    }

    public void setWeightKg(Double weightKg) {
        this.weightKg = weightKg;
    }

    public Double getBodyFatPercentage() {
        return bodyFatPercentage;
    }

    public void setBodyFatPercentage(Double bodyFatPercentage) {
        this.bodyFatPercentage = bodyFatPercentage;
    }

    public LocalDate getRecordedDate() {
        return recordedDate != null ? recordedDate : LocalDate.now();
    }

    public void setRecordedDate(LocalDate recordedDate) {
        this.recordedDate = recordedDate;
    }
}
