-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);
-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES (
        'BrightFuture Builders',
        'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
        'info@brightfuturebuilders.org',
        'brightfuture-logo.png'
    ),
    (
        'GreenHarvest Growers',
        'An urban farming collective promoting food sustainability and education in local neighborhoods.',
        'contact@greenharvest.org',
        'greenharvest-logo.png'
    ),
    (
        'UnityServe Volunteers',
        'A volunteer coordination group supporting local charities and service initiatives.',
        'hello@unityserve.org',
        'unityserve-logo.png'
    );
-- ========================================
-- Create Projects Table
-- ========================================
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,
    CONSTRAINT fk_organization FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE CASCADE
);
-- ========================================
-- Insert sample data: Projects
-- ========================================
INSERT INTO projects (
        organization_id,
        title,
        description,
        location,
        project_date
    )
VALUES (
        1,
        'Park Cleanup',
        'Join us to clean up local parks and make them beautiful!',
        'Abuja',
        '2026-06-15'
    ),
    (
        2,
        'Food Drive',
        'Help collect and distribute food to those in need.',
        'Lagos',
        '2026-06-20'
    ),
    (
        3,
        'Community Tutoring',
        'Volunteer to tutor students in various subjects.',
        'Kano',
        '2026-06-25'
    );
// Assignment -- =========================
-- Create Category Table
-- =========================
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);
-- ==============================
-- Create Project_Category Table
-- ===============================
CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE
);
-- ==================================
-- Inserting Values To Category Table
-- ==================================
INSERT INTO category (category_name)
VALUES ('Education'),
    ('Community Service'),
    ('Environmental Cleanup');
-- =========================================
-- Inserting Values To Project_Category Table
-- =========================================
INSERT INTO project_category (project_id, category_id)
VALUES (1, 1),
    (1, 2),
    (2, 3),
    (3, 2);


--==================================
-- CREATE ROLES TABLE
--==================================

CREATE TABLE roles
(role_id SERIAL NOT NULL PRIMARY KEY,
role_name VARCHAR(50) UNIQUE NOT NULL,
role_description TEXT
);

--===================================
-- INSERT VALUES INTO ROLES TABLE
--==================================
INSERT INTO roles(role_name, role_description)
VALUES('user', 'Standard user with basic access'),
('admin', 'Administrator with full system access');


--==========================
-- Create Users Table
--==========================
CREATE TABLE users( 
user_id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
role_id INTEGER REFERENCES roles(role_id),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP	
);


--==================================
-- Create project_volunteers Table
-- With Many to Many relationship
--==================================

CREATE TABLE project_volunteers (
    volunteer_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL,

    CONSTRAINT fk_volunteer_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_volunteer_project
        FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE,

    CONSTRAINT unique_volunteer
        UNIQUE (user_id, project_id)
);