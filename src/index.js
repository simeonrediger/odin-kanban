import Project from './app/project.js';

const defaultProject = new Project ('Project Name', [
    {
        name: 'List A',
        tasks: [
            {
                name: 'Task A1',
            },
            {
                name: 'Task A2',
            },
        ],
    },
    {
        name: 'List B',
        tasks: [
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
        ],
    },
    {
        name: 'List C',
        tasks: [
            {
                name: 'Task C1',
            },
            {
                name: 'Task C2',
            },
            {
                name: 'Task C3',
            },
        ],
    },
]);
