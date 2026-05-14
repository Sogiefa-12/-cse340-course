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
-- =========================
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