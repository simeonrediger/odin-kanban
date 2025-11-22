import Board from '@/domains/board/model.js';
import List from '@/domains/list/model.js';
import Task from '@/domains/task/model.js';

const currentDate = Date.now();
const oneDayInMs = 24 * 60 * 60 * 1000;

export default function applyDefaultWorkspace(workspace) {

    workspace.addBoard(new Board('Traditional example', [

        new List('To do', [

            new Task(
                'Add a new task',
                'To add a new task, click the + (plus) icon at the bottom of a list.',
                40,
                currentDate,
            ),

            new Task(
                'Add a new list',
                'To add a new list, click "New list" in the upper corner of the page.',
                30,
                currentDate + oneDayInMs,
            ),

            new Task(
                'Add a new board',
                'To add a new board, click the + (plus) icon at the top of the "Boards" list in the page sidebar.',
                50,
                currentDate + 2 * oneDayInMs,
            ),
        ]),

        new List('Doing', [

            new Task(
                "Click the caret to view this task's description",
                'Description viewed successfully.',
            ),

            new Task(
                'Edit this task',
                `To edit a task, hover over the task card, select the ⋮ icon, and select "Edit".`,
                20,
                currentDate + 7 * oneDayInMs,
            ),

            new Task(
                'Move this task',
                "Oops, this feature isn't implemented yet.",
            ),

            new Task(
                'Delete this task',
                `To delete a task, hover over the task card, select the ⋮ icon, select "Delete", and then confirm.`,
                10,
            ),
        ]),

        new List('Done', [

            new Task(
                'Edit this list',
                `To edit a list, hover over the list card, select the ⋮ icon at the top, and select "Edit".`,
            ),

            new Task(
                'Edit this board',
                `To edit a board, hover over the board name in the "Boards" list in the page sidebar, select the ⋯ icon, and select "Edit".`,
            ),
        ]),
    ]));

    workspace.addBoard(new Board('Alternative example', [

        new List('Ready', [

            new Task(
                'Go to the store',
                'Buy milk, eggs, and chicken breast.',
                10,
                currentDate,
            ),

            new Task(
                'Buy plane tickets',
                undefined,
                40,
                currentDate + 14 * oneDayInMs,
            ),

            new Task(
                'Plan trip',
                'Research good restaurants and sight-seeing. Find the train schedule.',
                30,
                currentDate + 60 * oneDayInMs,
            ),
        ]),

        new List('Waiting', [

            new Task(
                'Confirm plans with the group',
                undefined,
                20,
                currentDate + 2 * oneDayInMs,
            ),

            new Task(
                'Sign for package',
                undefined,
                40,
                currentDate + 5 * oneDayInMs,
            ),
        ]),

        new List('Planned', [

            new Task(
                'Head to the airport',
                undefined,
                50,
                currentDate + 67 * oneDayInMs,
            ),
        ]),

        new List('Recurring', [

            new Task(
                'Clean litter box',
                undefined,
                30,
                currentDate + 1 * oneDayInMs,
            ),

            new Task(
                'Pay credit card',
                undefined,
                40,
                currentDate + 12 * oneDayInMs,
            ),
        ]),
    ]));
}
