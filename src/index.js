import workspace from './app/workspace.js';
import defaultProject from './data/default-project.js';

//Demo
import Project from './app/project.js';
import List from './app/list.js';
import Task from './app/task.js';

workspace.addProject(defaultProject);

// Demo
defaultProject.addList(new List('List D'));
console.log(JSON.stringify(workspace.getActiveProject(), null, 2));
