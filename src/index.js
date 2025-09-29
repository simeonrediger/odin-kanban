import Project from './app/project.js';
import List from './app/list.js';
import Task from './app/task.js';

const defaultProject = new Project ('Project Name', [
    new List('List A', [
        new Task('Task A1'),
        new Task('Task A2'),
    ]),
    new List('List B', [
        new Task('Task B1'),
        new Task('Task B2'),
        new Task('Task B3'),
        new Task('Task B4'),
    ]),
    new List('List C', [
        new Task('Task C1'),
        new Task('Task C2'),
        new Task('Task C3'),
    ]),
]);
