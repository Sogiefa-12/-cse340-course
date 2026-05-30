import db from './db.js';

const getAllProjects = async () => {
    const sql = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.project_date,
            o.name AS organization_name
        FROM projects p
        JOIN organization o
            ON p.organization_id = o.organization_id
        ORDER BY p.project_date;
    `;

    const result = await db.query(sql);
    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            project_date
        FROM projects
        WHERE organization_id = $1
        ORDER BY project_date;
    `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

// Team Activity Week 3
const getUpcomingProjects = async (number_of_projects) => {
    const sql = `
        SELECT 
            p.project_id,
            p.title,
            p.description,
            p.project_date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM projects p
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE p.project_date >= CURRENT_DATE
        ORDER BY p.project_date ASC
        LIMIT $1
    `;

    const result = await db.query(sql, [number_of_projects]);

    return result.rows;
};


const getProjectDetails = async (id) => {
    const sql = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.project_date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM projects p
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1
    `;

    const result = await db.query(sql, [id]);

    return result.rows[0];
};


const createProject = async (title, description, location, date, organizationId) => {
    const query = `
        INSERT INTO projects (title, description, location, project_date, organization_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }
    
    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};


// Week 4 Team Activity

const updateProject = async (projectId, title, description, location, date, organizationId) => {
    const sql = `
        UPDATE projects
        SET 
        title = $1,
        description = $2,
        location = $3,
        project_date = $4,
        organization_id = $5
        WHERE project_id = $6
        RETURNING *
    `;

    const queryParams = [title, description, location, date, organizationId, projectId];
    const result = await db.query(sql, queryParams);

    if (result.rowCount === 0) {
        throw new Error('Failed to update project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated project with ID:', projectId);
    }

    return result.rowCount > 0;
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, createProject, updateProject };