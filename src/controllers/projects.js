// Import any neede model functions
import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// // Define any controllers functions
// const showProjectsPage = async (req, res) => {
//     const projects = await getAllProjects();
//     const title = 'Service Projects';

//     res.render('projects', { title, projects });
// };

const showProjectsPage = async (req, res) => { 
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};


const showProjectDetailsPage = async (req, res) => {
    const id = req.params.id;
    const project = await getProjectDetails(id);

    res.render('project', { title: project.title, project });
};

// Export any controller functions
export { showProjectsPage, showProjectDetailsPage };