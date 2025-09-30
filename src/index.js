import workspace from './models/workspace.js';
import defaultBoard from './data/default-board.js';

//Demo
import Project from './app/project.js';
import List from './app/list.js';
import Task from './app/task.js';

workspace.addBoard(defaultBoard);

// Demo
defaultProject.addList(new List('List D'));
console.log(JSON.stringify(workspace.getActiveProject(), null, 2));
