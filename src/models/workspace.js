const projects = [];
let activeProject;

function addProject(project) {
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
