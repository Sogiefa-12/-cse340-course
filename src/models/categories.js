import db from './db.js';

const getAllCategories = async () => {
    try {
        const query = `
         SELECT * FROM category
         ORDER BY category_name`
            ;
        
        const result = await db.query(query);

        return result.rows;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};


const getCategoryById = async (id) => {
    try {
        const sql = `
        SELECT * FROM category
        WHERE category_id = $1`;
        const result = await db.query(sql, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        throw error;
    }
    
};


const getCategoriesByProject = async (projectId) => {
    try {
        const sql = `
        SELECT 
            c.category_id,
            c.category_name
        FROM 
            category c
        JOIN 
            project_category pc ON c.category_id = pc.category_id
        WHERE 
            pc.project_id = $1`;

        const result = await db.query(sql, [projectId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching categories by project:', error);
        throw error;
    }
};

const getProjectsByCategory = async (categoryId) => {
    try {
        const sql = `
        SELECT 
            p.project_id,
            p.title,
            p.project_date
        FROM 
            projects p
        JOIN 
            project_category pc ON p.project_id = pc.project_id
        WHERE 
            pc.category_id = $1`;

        const result = await db.query(sql, [categoryId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching projects by category:', error);
        throw error;
    }
};

export { getAllCategories, getCategoryById, getCategoriesByProject, getProjectsByCategory };