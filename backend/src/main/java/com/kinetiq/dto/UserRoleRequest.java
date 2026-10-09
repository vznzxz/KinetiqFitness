package com.kinetiq.dto;

public class UserRoleRequest {
    private String role; // ROLE_USER or ROLE_ADMIN
    private String status; // ACTIVE or SUSPENDED

    public UserRoleRequest() {}

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
