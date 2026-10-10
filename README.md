# ⚡ KINETIQ — Next-Gen Precision Fitness Platform

**KINETIQ** is a modern, full-stack fitness tracking platform designed to help athletes monitor their workouts, track physical progress, build healthy habits, and stay consistent with their fitness goals. Combining real-time fitness insights with a premium dark interface, KINETIQ delivers a unified experience for both athletes and platform administrators.

Built with React, Tailwind CSS, Java 21, Spring Boot, and MySQL, the platform brings together personalized fitness tracking, workout analytics, progress monitoring, community content, and administrative management in one application.

## ✨ Features

### 🏃 Athlete Dashboard

- **Personalized Dashboard:** Track daily activity, workout statistics, calorie expenditure, and active fitness challenges.
- **Workout Management:** Create, view, update, and delete workout sessions across running, weightlifting, HIIT, cycling, swimming, yoga, CrossFit, and boxing.
- **Calorie Estimation:** Estimate calories burned using activity-specific MET values, workout duration, and body weight.
- **Progress Tracking:** Monitor weight changes, BMI, target weight, fitness level, and progress toward personal goals.
- **Weight History:** Record daily weigh-ins and visualize changes over time.
- **Fitness Challenges:** Discover challenges, participate in activities, record daily progress, and review completed challenges.
- **Personalized Guidance:** Access hydration recommendations, macronutrient breakdowns, and community-published fitness guides.
- **Athlete Profile:** Manage personal information, body metrics, fitness preferences, and training activity.

### 🛡️ Administration & Platform Management

- **Admin Dashboard:** View platform statistics, athlete activity, workout volume, calorie expenditure, and challenge engagement.
- **Athlete Management:** Browse registered users, manage account status, update roles, and remove accounts.
- **Role-Based Permissions:** Separate athlete and administrator capabilities through Spring Security authorization.
- **Content Moderation:** Review submitted fitness guides and approve or reject content before publication.
- **Challenge Management:** Create fitness challenges with custom goals, durations, activity categories, and reward points.
- **System Configuration:** Manage application settings, registration availability, maintenance mode, and daily fitness tips.
- **Audit Trail:** Review chronological records of logins, workout submissions, account changes, and administrative operations.

## 🎨 Design & User Experience

KINETIQ features a sleek, performance-inspired interface built around a charcoal-black background, subtle slate borders, crisp typography, and high-contrast neon-lime accents.

The responsive design combines an adaptive desktop sidebar with a mobile-friendly navigation drawer, allowing athletes to access their fitness data across screen sizes. Interactive charts, progress indicators, clear data visualizations, loading states, and notification feedback create a focused and intuitive experience.

**Design palette**
- Background: `#090d14`, `#0f172a`
- Borders: `#1e293b`
- Primary text: `#f8fafc`
- Accent colors: `#84cc16`, `#a3e635`, `#ccff00`

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Tailwind CSS v4, Vite 8 |
| UI & Icons | Lucide React |
| Backend | Java 21, Spring Boot 3.3.4 |
| Security | Spring Security 6, JWT, BCrypt |
| Persistence | Spring Data JPA, Hibernate |
| Database | MySQL 8.0, H2 |
| Validation | Jakarta Bean Validation |
| Testing | JUnit 5, Mockito, Spring Boot Test |
| Build System | Maven 3.9+ |

## 🏗️ Architecture

KINETIQ follows a modular full-stack architecture that separates the user interface, application logic, security layer, and data persistence.

- **React frontend:** Provides interactive dashboards, forms, charts, and responsive navigation.
- **REST API:** Connects the frontend to backend services through structured HTTP endpoints.
- **Spring Boot backend:** Handles authentication, workout operations, fitness calculations, goals, challenges, moderation, and administration.
- **Security layer:** Uses JWT-based authentication, BCrypt password hashing, and role-based access control.
- **Data layer:** Uses Spring Data JPA and Hibernate to manage application entities and database operations.
- **Database support:** MySQL provides persistent storage, while H2 supports lightweight development and demonstration environments.

The application is designed to enforce user-level data isolation so that athletes can access and manage their own workouts, goals, and weight history, while authorized administrators manage platform-wide operations.

## 🔐 Authentication & Authorization

KINETIQ uses token-based authentication to secure protected resources and distinguish between athlete and administrator access.

- JWT authentication for protected API requests.
- BCrypt for password hashing.
- Role-based authorization for administrative operations.
- Account-status controls for active and suspended users.
- Server-side authorization to protect user-specific fitness records.

## 📡 Core Platform Modules

| Module | Capabilities |
|---|---|
| Authentication | Registration, login, identity, and profile management |
| Dashboard | Fitness KPIs, calorie trends, and activity summaries |
| Workouts | Workout logging, editing, deletion, and calorie estimation |
| Goals & Biometrics | Weight history, target tracking, BMI, and personal goals |
| Challenges | Participation, daily check-ins, progress, and history |
| Community Content | Fitness guide submissions, approvals, and upvotes |
| Administration | User management, analytics, challenges, and moderation |
| System Settings | Registration controls, maintenance mode, and application configuration |
| Audit Logs | Chronological tracking of platform activities |

## 🧪 Quality & Testing

The backend includes automated tests built with JUnit 5, Mockito, and Spring Boot Test. The test suite covers authentication behavior, duplicate registration prevention, workout operations, calorie calculations, user-level access restrictions, administrative workflows, and application context initialization.

## 🚀 Project Vision

KINETIQ aims to make fitness tracking more structured, insightful, and engaging by combining workout management, personal progress analytics, guided fitness resources, and community challenges in a single platform.

With its modular architecture, secure backend, responsive interface, and support for both persistent and in-memory databases, KINETIQ provides a foundation for an extensible digital fitness ecosystem.

---

**KINETIQ — Train with purpose. Track your progress. Evolve every day.**
