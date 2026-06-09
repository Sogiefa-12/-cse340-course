import db from './db.js';

const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO project_volunteers
            (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id)
        DO NOTHING
        `;

        await db.query(query, [userId, projectId]);
};


const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM project_volunteers
        WHERE user_id = $1
        AND project_id = $2
        `;

        await db.query(query, [userId, projectId]);
};


const getVolunteerProjects = async (userId) => {
    const query =`
        SELECT 
            p.project_id,
            p.title
        FROM projects p
        JOIN project_volunteers pv
            ON p.project_id = pv.project_id
        WHERE pv.user_id = $1
        ORDER BY p.title
        `;

        const result = await db.query(query, [userId]);

        return result.rows;
};