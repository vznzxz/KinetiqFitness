# ⚡ KINETIQ — Next-Gen Precision Fitness Platform

> High-performance full-stack fitness tracking application engineered with **React**, **Tailwind CSS**, **Java 21 / Spring Boot 3**, and **MySQL**. Designed with a premium charcoal dark theme and high-contrast lime-green accents.

---

## 📸 Key Highlights & Feature Matrix

### 🏃 Athlete Portal (`ROLE_USER`)
- **Secure Authentication:** JWT token-based authentication with BCrypt encryption, auto-refresh session handling, and biometric onboarding (height, weight, target weight, fitness level).
- **Workout Logging Engine:** Complete CRUD functionality for workouts (Running, Weightlifting, HIIT, Cycling, Swimming, Yoga, CrossFit, Boxing). Automatic MET (Metabolic Equivalent of Task) calorie burn estimation, intensity grading, and exercise set builder.
- **Biometrics & Progress Tracking:** Weight trajectory charts, daily weigh-in logger, target goal progress bars, and instant BMI / health indicator calculations.
- **Fitness Challenges Arena:** Browse active challenges, join, log "+1" daily progress check-ins, view completion status, and inspect completed challenge history.
- **Personalized Guidance:** Dynamic hydration protocol calculator based on body mass and training volume, macronutrient fuel breakdown, and approved community training guides with upvoting.
- **Athlete Profile:** Real-time updates to bio, fitness tier, body metrics, and training streak counters.

### 🛡️ Admin Console (`ROLE_ADMIN`)
- **Protected Role-Based Access:** Isolated admin views guarded by Spring Security role authorization (`hasRole('ADMIN')`).
- **Athlete Directory & Permissions:** View all registered athletes, toggle account status (`ACTIVE` / `SUSPENDED`), promote or demote user roles (`ROLE_USER` / `ROLE_ADMIN`), and delete accounts.
- **Content Moderation Queue:** Review athlete-submitted articles and fitness guides with 1-click **Approve** or **Reject** actions.
- **Challenge Operations:** Create new platform challenges with custom targets, durations, disciplines, and point rewards; delete obsolete challenges.
- **System Settings:** Real-time system configuration panel (app name, maintenance mode toggle, user registration toggle, daily tip message).
- **Live Audit Trail:** Chronological activity stream tracking user logins, workout submissions, status updates, and administrative actions.
- **Platform Analytics:** Real aggregate calculations derived directly from the database (active athletes, workout volume, total caloric expenditure, challenge engagement).

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Tailwind CSS v4, Lucide React icons, Vite 8 |
| **Backend** | Java 21, Spring Boot 3.3.4, Spring Security 6, Spring Data JPA, Hibernate, Bean Validation |
| **Security** | JJWT (Java JWT 0.12.6), BCrypt Password Encoder, Stateless Session Filter |
| **Database** | MySQL 8.0 (Persistent Production) & H2 Database (Zero-Config Development Profile) |
| **Build & Test** | Maven 3.9+, JUnit 5, Mockito, Spring Boot Test |

---

## 🔑 Pre-Seeded Demonstration Accounts

For immediate evaluation, the database is pre-seeded with sample data:

| Role | Email | Password | Permissions & Scope |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@kinetiq.fit` | `admin123` | Full access to Admin Console, user management, moderation, challenge creator, system settings |
| **Athlete (Alex)** | `alex@kinetiq.fit` | `user123` | Athlete dashboard, workout logs, goals, challenges, profile |

> 💡 **Tip:** The landing page features **"1-Click Fill Demo Credentials"** buttons for both Athlete and Admin to log in instantly.

---

## 💻 IntelliJ IDEA Setup & Run Guide (Backend)

Follow these exact steps to open and run the Spring Boot backend inside **IntelliJ IDEA**:

### Step 1: Open the Project
1. Open **IntelliJ IDEA**.
2. Select **File ➔ Open...** (or click **Open** on the Welcome screen).
3. Navigate to and select the `backend` directory:
   ```
   kinetiq/backend
   ```
4. Choose **Open as Project** and trust the project if prompted.

### Step 2: Configure the Java 21 SDK
1. Open **File ➔ Project Structure...** (or press `Cmd + ;` on macOS / `Ctrl + Alt + Shift + S` on Windows/Linux).
2. Under **Project Settings ➔ Project**, set **SDK** to **Java 21** (or Java 22+).
   - *If Java 21 is not installed, click "Add SDK" ➔ "Download JDK" and select Eclipse Temurin or Amazon Corretto 21.*
3. Set **Project language level** to **21 - Records, pattern matching...**.
4. Click **Apply** and **OK**.

### Step 3: Maven Dependency Sync
1. Open the **Maven** tool window on the right sidebar.
2. Click the **Reload All Maven Projects** icon (the circular arrows icon).
3. IntelliJ will download Spring Boot 3.3.4 dependencies and index the project.

### Step 4: Run the Backend
1. In the Project Explorer, expand `src/main/java/com/kinetiq`.
2. Locate and right-click `KinetiqApplication.java`.
3. Click **Run 'KinetiqApplication'** (or press `Ctrl + Shift + R` / `Shift + F10`).
4. **Choose your database profile:**
   - **Default (Zero-Setup H2):** Runs automatically without any configuration. It boots an in-memory database on port `8080` with sample seed data.
   - **MySQL Profile:** In **Run ➔ Edit Configurations...**, under **Active profiles**, enter `mysql` (or add VM option `-Dspring.profiles.active=mysql`). Ensure MySQL is running on port 3306.

---

## 💻 Visual Studio Code (VS Code) Setup & Run Guide

The workspace includes pre-configured `.vscode` configurations (`launch.json`, `tasks.json`, `extensions.json`, `settings.json`) for 1-click execution.

### Step 1: Open the Project in VS Code
1. Open **VS Code**.
2. Select **File ➔ Open Folder...** and choose the root `kinetiq` directory:
   ```
   /Users/vansh/.gemini/antigravity/scratch/kinetiq
   ```
   *(Or run `code /Users/vansh/.gemini/antigravity/scratch/kinetiq` from your terminal).*

### Step 2: Install Recommended Extensions
When prompted with *"Do you want to install the recommended extensions for this repository?"*, click **Install All**.
Or install them manually from the Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`):
- **Extension Pack for Java** (`vscjava.vscode-java-pack`) by Microsoft
- **Spring Boot Extension Pack** (`vmware.vscode-spring-boot`) by VMware
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)

### Step 3: Run Using VS Code Pre-Configured Tasks (Easiest)
1. Open the Command Palette (`Cmd + Shift + P` on Mac, `Ctrl + Shift + P` on Windows/Linux).
2. Type **Tasks: Run Task** and press Enter.
3. You will see pre-configured options:
   - **`1. Run Frontend (Vite)`**: Launches Vite dev server at `http://localhost:5173`.
   - **`2. Run Backend (Spring Boot - H2 Zero Setup)`**: Launches Spring Boot backend at `http://localhost:8080`.
   - **`Run Backend (Spring Boot - MySQL)`**: Launches backend targeting local MySQL.

### Step 4: Run Using Terminal (Inside VS Code)
Open the integrated terminal in VS Code (``Ctrl + ` `` or ``Cmd + ` ``):

**Terminal 1 — Backend (Spring Boot):**
```bash
cd backend
./mvnw spring-boot:run
```
*(On Windows Command Prompt / PowerShell: `.\mvnw.cmd spring-boot:run`)*

**Terminal 2 — Frontend (React / Vite):**
```bash
npm run dev
```

### Step 5: Debug with F5 (Run & Debug View)
1. Press `F5` or switch to the **Run and Debug** view (`Cmd+Shift+D` / `Ctrl+Shift+D`).
2. Select **"Spring Boot - KinetiqApplication (H2 Default)"** from the dropdown.
3. Click the green **Play** button or press `F5` to start with breakpoints enabled!

---

## 🌐 Frontend Setup & Run Guide

### Step 1: Install Node Dependencies
Open a terminal in the root directory:
```bash
cd kinetiq
npm install
```

### Step 2: Start Vite Dev Server
```bash
npm run dev
```
The application will be accessible at:
```
http://localhost:5173
```
Vite is pre-configured with a development reverse proxy that automatically routes all `/api/*` calls directly to the Spring Boot backend at `http://localhost:8080`.

### Step 3: Build for Production
To verify production bundle build:
```bash
npm run build
```

---

## 🗄️ Database Setup (MySQL vs. H2)

### Option A: MySQL via Docker Compose (Recommended for MySQL testing)
A pre-configured `docker-compose.yml` is included in the project root:
```bash
# Start MySQL 8.0 container on port 3306
docker compose up -d
```
- **Database Name:** `kinetiq_db`
- **Username:** `kinetiq_user`
- **Password:** `kinetiq_secret`
- **Root Password:** `rootpassword`

To run the backend against this MySQL container:
```bash
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=mysql
```

### Option B: Zero-Config In-Memory H2 (Instant Evaluation)
If you do not have MySQL installed or Docker running, the application defaults to H2 in-memory mode:
```bash
cd backend
./mvnw spring-boot:run
```
- **H2 Console:** Accessible at `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:kinetiq_db`
  - User Name: `SA`
  - Password: *(leave blank)*

---

## 🧪 Running Automated Backend Tests

The backend includes comprehensive unit and integration tests using JUnit 5 and Mockito:

```bash
cd backend
./mvnw test
```

### Test Coverage Highlights:
- `AuthServiceTest`: User registration duplicate prevention, credential verification, and JWT generation.
- `WorkoutServiceTest`: Workout CRUD permissions, MET calorie burn calculations, user isolation.
- `AdminServiceTest`: User role updates, moderation workflows, platform statistics calculation.
- `KinetiqApplicationTests`: Spring Boot context loading and application health verification.

---

## 📡 REST API Documentation Summary

### Public & Authentication Endpoints
- `GET  /api/health` — Platform service health check
- `POST /api/auth/register` — Register a new athlete account
- `POST /api/auth/login` — Authenticate and receive a JWT Bearer token
- `GET  /api/auth/me` — Retrieve current authenticated athlete profile
- `PUT  /api/auth/profile` — Update biometrics, fitness tier, and bio
- `GET  /api/content/public` — Retrieve approved fitness guides

### Athlete Endpoints (`ROLE_USER` & `ROLE_ADMIN`)
- `GET  /api/dashboard` — Athlete dashboard KPIs, 7-day caloric trend, active challenges
- `GET  /api/workouts` — List athlete's workouts (supports `startDate` & `endDate` query params)
- `POST /api/workouts` — Create a workout entry
- `PUT  /api/workouts/{id}` — Update workout entry
- `DELETE /api/workouts/{id}` — Delete workout entry
- `GET  /api/goals` — Retrieve personal fitness goals
- `PUT  /api/goals` — Update target calories, workouts/week, and target weight
- `GET  /api/goals/weight-history` — Retrieve weigh-in trajectory
- `POST /api/goals/weight-history` — Log today's weight measurement
- `GET  /api/challenges` — List platform challenges with user participation status
- `POST /api/challenges/{id}/join` — Join a fitness challenge
- `POST /api/challenges/{id}/check-in?increment=1` — Submit challenge progress check-in
- `GET  /api/challenges/history` — List completed challenges
- `POST /api/content` — Submit an article for admin moderation
- `POST /api/content/{id}/like` — Upvote an approved article

### Admin Endpoints (`ROLE_ADMIN` only)
- `GET  /api/admin/stats` — Platform aggregates (total athletes, total volume, pending approvals)
- `GET  /api/admin/users` — List all registered platform users
- `PUT  /api/admin/users/{id}/role` — Update user role (`ROLE_USER` / `ROLE_ADMIN`) and status (`ACTIVE` / `SUSPENDED`)
- `DELETE /api/admin/users/{id}` — Delete user account
- `GET  /api/admin/content` — Moderation queue (all pending, approved, and rejected articles)
- `PUT  /api/admin/content/{id}/status` — Approve or reject fitness articles (`status: APPROVED | REJECTED`)
- `POST /api/admin/challenges` — Create a new challenge
- `DELETE /api/admin/challenges/{id}` — Delete a challenge
- `GET  /api/admin/settings` — Get system configuration parameters
- `PUT  /api/admin/settings` — Update system configuration parameters
- `GET  /api/admin/activity-logs` — Audit log trail of system activities

---

## 🎨 Design Philosophy & Architecture

KINETIQ follows a modern, modular design:
- **Palette:** High-performance charcoal background (`#090d14` / `#0f172a`), slate borders (`#1e293b`), crisp typography (`#f8fafc`), with high-voltage neon lime accents (`#84cc16`, `#a3e635`, `#ccff00`).
- **Responsive Layout:** Adaptive sidebar for desktop, drawer overlay for mobile screens, sticky top navbar with active route titles and live backend connection badge.
- **Data Isolation:** Spring Security principal binding guarantees that athletes can only access and manipulate their own workouts, weigh-ins, and goals.
- **Offline & Error Resilience:** Standardized notification toasts for real-time feedback on network actions, loading skeletons, and form validation states.
