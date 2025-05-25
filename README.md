      University Management System

Title : University Management System
Group No : Group 07
University : South Eastern University Of Sri Lanka
Subject :SWT31012:Software Engineering
	Instructor’s Name :  Fathima Musfira

	Group Members:

  o	SEU/IS/20/ICT/084 (P.R.P.S.Kalhara)
  o	SEU/IS/20/ICT/083(Pabodha Sewwandi)
  o	SEU/IS/20/ICT/088(Dinusha Sewmini)
  o	SEU/IS/20/ICT/086(Lasandi Mihara)
  o	SEU/IS/20/ICT/081(P.Niroshan)

1. Introduction
The University Management System (UMS) is a web-based application developed to digitally manage academic and administrative operations in a university. It ensures seamless integration of various processes such as admissions, faculty management, student records, examinations, and fee payments.
2. Objectives
- Provide a centralized platform for all academic activities.
- Facilitate digital interaction between students, faculty, and administration.
- Automate routine tasks like attendance, marks entry, and notifications.
- Maintain transparency, security, and integrity of institutional data.
3. Problem Statement
Traditional university operations rely heavily on paperwork and manual processes, leading to inefficiencies, data loss, and difficulty in managing large volumes of information. A digital solution is essential to streamline operations and enable real-time data access.
4. Scope of the Project
- Student life cycle management: Admission to graduation.
- Faculty management: Course assignments, attendance, result entry.
- Admin panel: Department creation, user role assignment, reporting.
- Financial management: Fees, scholarships, dues tracking.
- Academic tracking: Syllabus, exams, grades, certificates.
5. User Roles and Access Levels
Admin - Manages entire system - Full access
Faculty - Manages classes, attendance, grades - Limited to assigned classes
Student - Views courses, grades, profile - Self-access only
Accountant - Manages fee payments and reports - Finance section only
IT Staff - Handles system maintenance - Backend access
Examination Cell - Manages results, exam schedules - Exam-related modules
6. Modules Description
Student Module: Admission, enrollment, attendance, results, certificates
Faculty Module: Attendance, grades, communication
Admin Module: Department/user management, notifications, reports
Examination & Result Module: Schedules, grading, transcripts
Finance Module: Fees, scholarships, reports
Library Module (Optional): Book issue/return, fines
7. Tools and Technologies Used
Frontend: React
Backend: PHP with Laravel 
Database: MySQL 
Authentication: JWT / Laravel Auth 
Hosting: Apache 
Version Control: GitHub 
Design Tools: Figma 
8. System Design
- ER Diagram: Student, Faculty, Course, Department, Fee, Exam
- Use Case Diagram: Login, Register, Enroll Course, Upload Grade
- Data Flow Diagram: Level 0 and Level 1 DFDs
9. Security Features
- Role-Based Access Control (RBAC)
- Input Validation and Sanitization
- Password Hashing
- Session Management
- CSRF and XSS Protection
- Audit Logs
10. Testing
- Unit Testing
- Integration Testing
- System Testing
- User Acceptance Testing (UAT)
- Bug Tracking: Trello/JIRA
11. Data Dictionary
students (id, name, course_id)
courses (course_id, course_name)
results (student_id, course_id, marks)
12. Screenshots
Screenshots of Login Page, Student Dashboard, Faculty Panel, Admin Reports (To be added).
13. Challenges Faced
- Synchronization between modules
- Concurrent data access issues
- UI consistency
- Data migration from legacy systems
14. Conclusion
The University Management System brings efficiency and transparency to academic administration, supporting students and staff with an easy-to-use, scalable platform.
15. Future Enhancements
- Mobile App Integration
- AI Recommendations for Students
- LMS Integration
- Cloud Hosting
- Government Portal API Integration
16. References
- Laravel  Documentation
- MySQL Guide
- Bootstrap Docs
- Educational ERP Studies
17. Project Timeline
Requirement Analysis: 1 week
System Design: 1 week
Database Design: 3 days
Frontend Development: 2 weeks
Backend Development: 2 weeks
Integration: 4 days
Testing: 1 week
Deployment: 2 days
Documentation: 3 days

18. Team Structure
Project Leader: Planning, Coordination
Backend Developer: API, DB
Frontend Developer: UI/UX
Tester: QA, UAT
Documentation: Reporting, Manuals
19. Deployment and Hosting
- Local Server (XAMPP/WAMP)
- AWS EC2, Firebase (optional)
- Steps: Upload code > configure .env > run migrations > set permissions
20. Maintenance Plan
- Monthly Backup
- Periodic Feature Updates
- User Feedback Integration
- Security Audit each semester
21. User Training & Support
- Training for Staff
- User Manual (PDF)
- Email/WhatsApp/Help Desk Support
22. Risk Management
- Data Breach: Use encryption, RBAC
- Downtime: Cloud backup
- Resistance: Training
- Bugs: Thorough testing
23. Feedback Mechanism
- Built-in Feedback Form
- Stored in DB and reviewed weekly
24. Legal and Ethical Considerations
- Data Privacy Laws
- Academic Integrity
- Consent Collection
- Open-source Compliance
25. Summary
UMS enhances transparency, automates workflows, and improves efficiency in managing university operations, paving the way for digital transformation in education.

