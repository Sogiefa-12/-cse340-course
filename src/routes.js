import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation,
    showEditProjectForm,
    processEditProjectForm,
    volunteerForProject,
    removeVolunteerFromProject
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,

    showNewCategoryForm,
    processNewCategoryForm,

    showEditCategoryForm,
    processEditCategoryForm,

    categoryValidation

} from './controllers/categories.js';
 
import { testErrorPage } from './controllers/errors.js';

import {
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';
 
import { 
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard,
    requireRole,
    showUsersPage 
 } from './controllers/users.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

// Route for new organization Page
router.get('/new-organization',requireRole('admin'), showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

// Route to display the edit organization form
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', requireRole('admin'), processEditOrganizationForm);

// Route for new project page
router.get('/new-project', requireRole('admin'), showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);

router.post('/assign-categories/:projectId', requireRole('admin'),  processAssignCategoriesForm);

// Display the edit project form
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);

// Handle the edit project form submission
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);


// Create category routes
router.get('/new-category', showNewCategoryForm);

router.post('/new-category', categoryValidation, processNewCategoryForm);

// Edit category routes
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);

router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

//Login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
//Logout Route
router.get('/logout', processLogout);

// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard)

// User page route
router.get(
    '/users',
    requireRole('admin'),
    showUsersPage
);

// Volunteer Routes

router.post(
    '/project/:projectId/volunteer',
    requireLogin,
    volunteerForProject
);

router.post(
    '/project/:projectId/remove-volunteer',
    requireLogin,
    removeVolunteerFromProject
);


// error-handling routes
router.get('/test-error', testErrorPage);



export default router;
