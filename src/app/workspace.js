import Project from './project.js';

export default (function() {
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
                throw new Error(
                    `Existing project already has name '${project.name}'`
                );
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

    return {
        addProject,
        getActiveProject,
    };
})();
