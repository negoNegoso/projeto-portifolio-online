INSERT INTO students (name, email, date_birth, academic_year, academic_grade) VALUES ('John Doe', 'john.doe@example.com', '2005-05-15', '2024-2025', 8.5);

INSERT INTO teachers (email, password, name, joining_data) VALUES ('teacher@example.com', 'securePassword123', 'Jane Smith', '2024-01-15');

INSERT INTO user (id, email, password) VALUES (1, 'user@example.com', 'userPassword123'), (2, 'seconduser@user.com', '123456789');

INSERT INTO grade (name_grade, notes) VALUES ('Grade 10', 'This is the tenth grade');

INSERT INTO attendance (attendance_date, attendance_status, student_id) VALUES ('2024-10-28', 0, 1);

INSERT INTO classroom (name_of_class, grade_id) VALUES ('Class A', 1);

INSERT INTO roles (rolename, iduser) VALUES ('ADMIN', 1), ('USER', 2);

INSERT INTO sections (name_section, grade_id, status) VALUES ('Section A', 1, 'ACTIVE');

INSERT INTO teacher_section (teacher_id, section_id) VALUES (1, 1);