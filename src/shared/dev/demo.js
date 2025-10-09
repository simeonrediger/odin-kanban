import Board from '@/domains/board/model/board.js';
import List from '@/domains/list/model/list.js';
import Task from '@/domains/task/model/task.js';

function run(workspace) {
    const task1 = new Task('Task 1');
    const task2 = new Task('Task 2');
    const task3 = new Task('Task 3');
    const task4 = new Task('Task 4');

    const listA = new List('List A', [task1, task2, task3]);
    const listB = new List('List B', []);
    const listC = new List('List C', [task3, task4]);

    const board2 = new Board('Board 2', [listA, listB, listC]);
    workspace.addBoard(board2);

    const listD = new List('List D', []);
    const board3 = new Board('Board 3', [listD]);
    workspace.addBoard(board3);

    // console.log(workspace.toJson(null, 2));
}

const demo = {
    run,
}

export default demo;
