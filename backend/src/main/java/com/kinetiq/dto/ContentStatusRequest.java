package com.kinetiq.dto;

public class ContentStatusRequest {
    private String status; // APPROVED, REJECTED, PENDING

    public ContentStatusRequest() {}

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
