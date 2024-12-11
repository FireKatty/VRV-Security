# VRV-Security

# RBAC System - Role-Based Access Control

**Overview**

This project implements a Role-Based Access Control (RBAC) system with a user-friendly interface for managing users, roles, and permissions. It provides functionalities for administrators to perform CRUD operations on users, update roles and permissions, toggle user statuses, and more.

## Features

->User Management: Admins can add, update, and delete users, ensuring effective control over the system.
->Role Management: Admins can assign and update roles and permissions for each user, ensuring proper access levels.
->Permissions Handling: Each role has specific permissions that control what actions a user can perform within the system.
->Status Toggle: Admins can toggle the active/inactive status of users, enabling flexible user management.
->Input Validation & Security: Includes basic validation for email, phone numbers, and password to ensure secure and correct data entry.

## Functionality

1. Creativity and Design Quality:

The UI is clean, intuitive, and responsive, aligning with RBAC principles. It features a user-friendly layout for administrators to manage users and roles effectively.

2. Responsiveness:
The interface adapts seamlessly across devices, providing a consistent experience on mobile, tablet, and desktop.

3. Functionality:
Implements core RBAC features: user creation, role assignment, status toggling, and CRUD operations.
Includes error handling and proper validation for inputs to ensure smooth interaction.

4. User Experience (UX):
The UI is designed for ease of use with clear navigation and quick access to key functionalities, reducing the complexity of role and user management.

5. Technical Skill:
Modular, maintainable, and well-organized code adhering to best practices.
The backend uses MongoDB for efficient data storage, while the frontend ensures an interactive and intuitive user experience.

6. Documentation:
Detailed explanations of the features, setup instructions, and how to use the system are provided in this README. The code is clean and well-commented.

7. Security Practices:
->Input Validation: Checks for valid email formats, mobile numbers, and other necessary fields.
->Error Handling: Proper error responses are returned for invalid operations.
->Authentication & Authorization: JWT tokens are used to secure endpoints, ensuring only authenticated users can access restricted   routes.

# Setup Instructions

**Clone the Repository:**
->git clone https://github.com/FireKatty/VRV-Security

**Install Dependencies: Ensure you have Node.js installed, then run:**
->npm install

**Environment Variables: Create a .env file at the root of the project and add the following:**
->port = Your_port_number
->JWT_SECRET=your_jwt_secret
->MONGO_URI=mongodb://localhost:27017/VRV_Security

**Run the Application: To start the server, run:**
->npm start


#### Features Overview

1. **User Registration (Signup)**
Users can sign up by providing their name, email, password, and role.
The system ensures passwords match and validates email uniqueness.

2. **Login**
Users log in with their email and password.
A JWT token is generated upon successful login, allowing access to protected routes.

3. **Role Management**
Admins can assign roles to users and update their permissions.
Each role has a defined set of permissions to control access to various resources.

4. **User Management (CRUD Operations)**
Admins can create, read, update, and delete users.
Each user’s information (such as name, email, phone number, and role) can be edited.

5. **Status Management**
Admins can toggle a user’s status between 'Active' and 'Inactive' to control access.
Security Considerations
JWT Authentication: Ensures that only authorized users can access certain routes.
Input Validation: Prevents invalid data entry and mitigates risks such as XSS and SQL Injection.
Password Hashing: Passwords are securely hashed using bcrypt before being stored in the database.

**Conclusion**

This project provides a robust and secure RBAC system, ensuring that users have the appropriate access based on their roles and permissions. It is designed with a focus on security, usability, and responsiveness to create a seamless experience for administrators.


