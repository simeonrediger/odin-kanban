import Project from './project.js';
import DuplicateNameError from '../errors/duplicate-name-error.js';

const projects = [];
let activeProject;

function addProject(project) {
    const isNotProject = !(project instanceof Project);
    const projectNameAlreadyExists = projects.some(
        existingProject => project.name === existingProject.name
    );

    if (isNotProject || projectNameAlreadyExists) {

        if (isNotProject) {
            throw new ValueError(
                "Project must be an instance of 'Project'"
            );
        }

        if (projectNameAlreadyExists) {
            throw new DuplicateNameError(project.name);
        }
    }

    projects.push(project);
}

function getActiveProject() {

    if (activeProject) {
        return activeProject;

    } else if (projects.length >= 1) {
        return projects[0];

    } else {
        return null;
    }
}

const workspace = {
    addProject,
    getActiveProject,
};

export default workspace;
