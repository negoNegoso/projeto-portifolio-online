-- Remova a criação de banco e uso de schema
-- CREATE DATABASE portfolio_online_dsm5;
-- USE portfolio_online_dsm5;

-- Insira os valores diretamente
INSERT INTO authorities(authority) VALUES ('ADMIN');
INSERT INTO authorities(authority) VALUES ('TEACHER');
INSERT INTO authorities(authority) VALUES ('STUDENT');
INSERT INTO authorities(authority) VALUES ('USER');

INSERT INTO users(email, password) VALUES ('admin@gmail.com', 'admin');
INSERT INTO users(email, password) VALUES ('teacher@gmail.com', 'teacher');
INSERT INTO users(email, password) VALUES ('student@gmail.com', 'student');
INSERT INTO users(email, password) VALUES ('user@gmail.com', 'user');

INSERT INTO users_authorities(user_id, authority_id) VALUES (1, 1);
INSERT INTO users_authorities(user_id, authority_id) VALUES (1, 4);
INSERT INTO users_authorities(user_id, authority_id) VALUES (2, 2);
INSERT INTO users_authorities(user_id, authority_id) VALUES (2, 4);
INSERT INTO users_authorities(user_id, authority_id) VALUES (3, 3);
INSERT INTO users_authorities(user_id, authority_id) VALUES (3, 4);
INSERT INTO users_authorities(user_id, authority_id) VALUES (4, 4);

INSERT INTO teachers(first_name, last_name, middle_name, user_id) VALUES ('Teacher', 'Professor', '', 2);

-- Caso precise inserir em subjects, descomente as linhas abaixo
-- INSERT INTO subjects(subject, classroom_id, teacher_id) VALUES (1, 1, 1);
-- INSERT INTO subjects(subject, classroom_id, teacher_id) VALUES (2, 1, 1);
