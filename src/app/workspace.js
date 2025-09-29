import Project from './project.js';

export default (function() {
    const projects = [];
    let activeProject;

    function addProject(project) {

        if (
            !(project instanceof Project)
            || projects.includes(project)
        ) {
            return;
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
