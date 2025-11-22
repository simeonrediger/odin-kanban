function save(workspaceJsonString) {
    localStorage.setItem('workspace', workspaceJsonString);
}

function load() {
    const workspaceJsonString = localStorage.getItem('workspace');

    if (!workspaceJsonString) {
        return null;
    }

    try {
        return JSON.parse(workspaceJsonString);

    } catch (error) {
        console.error('Failed to parse localStorage:', error);
        return null;
    }
}

const storage = {
    save,
    load,
};

export default storage;
