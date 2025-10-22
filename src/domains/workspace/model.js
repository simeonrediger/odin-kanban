import assert from '@/shared/validation/assert.js';
import Board from '@/domains/board/model.js';
import List from '@/domains/list/model.js';
import Task from '@/domains/task/model.js';

const boards = [];
let activeBoard;

function getBoard(boardId) {
    assert.string(boardId, "'boardId'");
    return boards.find(board => board.id === boardId);
}

function addBoard(board, targetIndex) {
    assert.instanceOf(Board, board, "'board'");

    if (targetIndex === undefined) {
        boards.push(board);
    } else {
        assert.nonNegativeInteger(targetIndex, "'targetIndex'");
        boards.splice(targetIndex, 0, board);
    }
}

function addEmptyBoard(boardName) {
    const board = new Board(boardName, []);
    addBoard(board);
}

function removeBoard(targetBoard) {
    assert.instanceOf(Board, targetBoard, "'targetBoard'");

    if (!boards.includes(targetBoard)) {
        throw new Error("'targetBoard' not found in this workspace");
    }

    boards.splice(boards.indexOf(targetBoard), 1);
}

function moveBoard(board, targetIndex) {
    assert.instanceOf(Board, board, "'board'");
    assert.nonNegativeInteger(targetIndex, "'targetIndex'");

    removeBoard(board);
    addBoard(board, targetIndex);
}

function moveList(list, targetBoard, targetIndex) {
    assert.instanceOf(List, list, "'list'");
    assert.instanceOf(Board, targetBoard, "'targetBoard'");

    const board = findBoardWithList(list);

    if (!board) {
        throw new Error("'list' not found in this workspace");
    }

    board.removeList(list);
    targetBoard.addList(list, targetIndex);
}

function moveTask(task, targetList, targetIndex) {
    assert.instanceOf(Task, task, "'task'");
    assert.instanceOf(List, targetList, "'targetList'");

    const list = findListWithTask(task);

    if (!list) {
        throw new Error("'task' not found in this workspace'");
    }

    if (!includesList(targetList)) {
        throw new Error("'targetList' not found in this workspace");
    }

    list.removeTask(task);
    targetList.addTask(task, targetIndex);
}

function findBoardWithList(list) {
    return boards.find(board => board.lists.includes(list));
}

function findListWithTask(task) {

    for (const board of boards) {
        const list = board.findListWithTask(task);

        if (list) {
            return list;
        }
    }
}

function includesList(list) {
    return boards.some(board => board.lists.includes(list));
}

function toObject() {
    const boardsToObjects = [];

    for (const board of boards) {
        boardsToObjects.push(board.toObject());
    }

    return Object.freeze({
        boards: Object.freeze(boardsToObjects),
    });
}

function toJson(replacer, space) {
    return JSON.stringify(toObject(), replacer, space);
}

const workspace = {
    isWorkspace: true,

    getBoard,
    addBoard,
    addEmptyBoard,
    removeBoard,
    moveBoard,
    moveList,
    moveTask,
    toJson,

    get boards() {
        return Object.freeze([...boards]);
    },
};

export default workspace;
