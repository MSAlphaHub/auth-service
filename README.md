# Auth System

The Auth System provides user authentication, authorization, email sending, and utilizes a PostgreSQL database. The system supports both local login and Single Sign-On (SSO) methods.

## Features

- **User Authentication**:
  - User registration and login.
  - Authentication via email and password.
  - Support for SSO login methods with third-party providers.

- **Authorization**:
  - Management of user roles.
  - Access control to different resources based on roles.

- **Email Sending**:
  - Sends registration confirmation emails.
  - Sends password recovery emails.
  - Notifies users via email about important activities in the system.

- **Database**:
  - Utilizes PostgreSQL to store user information and manage login sessions.
  - Supports queries for data retrieval and user management.

## Installation

### Prerequisites

- Node.js (>= 14.x)
- PostgreSQL (>= 12.x)
- Yarn or npm

### Step 1: Clone the repository

```bash
git clone git@github.com:vth20/auth-service.git
cd auth-service
