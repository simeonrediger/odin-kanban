import Project from './app/project.js';
import List from './app/list.js';

const defaultProject = new Project ('Project Name', [
    new List('List A', [
        {
            name: 'Task A1',
        },
        {
            name: 'Task A2',
        },
    ]),
    new List('List B', [
        {
            name: 'Task B1',
        },
        {
            name: 'Task B2',
        },
        {
            name: 'Task B3',
        },
        {
            name: 'Task B4',
        },
    ]),
    new List('List C', [
        {
            name: 'Task C1',
        },
        {
            name: 'Task C2',
        },
        {
            name: 'Task C3',
        },
    ]),
]);
