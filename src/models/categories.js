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


const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}


const createCategory = async (categoryName) => {
    try {
        const sql = `
        INSERT INTO category (category_name)
        VALUES ($1)
        RETURNING category_id;
        `;
        const result = await db.query(sql, [categoryName]);
        return result.rows[0].category_id;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};


const updateCategory = async (categoryId, categoryName) => {
    try {
        const sql = `
        UPDATE category
        SET category_name = $1
        WHERE category_id = $2
        RETURNING *
        `;

        const result = await db.query(sql, [categoryName, categoryId]);
        if (result.rows.length === 0) {
            throw new Error('Category not found');
        }
        return result.rows[0];

    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
}

export { getAllCategories, getCategoryById, getCategoriesByProject, getProjectsByCategory, updateCategoryAssignments, createCategory, updateCategory };