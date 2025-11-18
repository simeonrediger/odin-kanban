import Board from '../model.js';
import List from '@/domains/list/model.js';
import Task from '@/domains/task/model.js';

export default new Board('Board 1', [
    new List('List A', [
        new Task(
            'Task A1',
            'This is an example of a task description.',
            30,
            1763683200000,
        ),
        new Task('Task A2', 'This is another example of a task description.'),
    ]),
    new List('List B', [
        new Task('Task B1', undefined, 50),
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
