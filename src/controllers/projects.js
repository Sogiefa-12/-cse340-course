// Import any neede model functions
import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByProject } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;


const showProjectsPage = async (req, res) => { 
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};


const showProjectDetailsPage = async (req, res) => {
    const id = req.params.id;
    const project = await getProjectDetails(id);

    const categories = await getCategoriesByProject(id);

    res.render('project', { title: project.title, project, categories });
};





// Export any controller functions
export { showProjectsPage, showProjectDetailsPage };