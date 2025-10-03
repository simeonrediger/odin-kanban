import assert from '../utils/assert.js';
import Board from './board.js';
import List from './list.js';

const boards = [];
let activeBoard;

function addBoard(board, targetIndex) {
    assert.instanceOf(Board, board, "'board'");

    if (targetIndex === undefined) {
        boards.push(board);
    } else {
        assert.nonNegativeInteger(targetIndex, "'targetIndex'");
        boards.splice(targetIndex, 0, board);
    }
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

function findBoardWithList(list) {
    return boards.find(board => board.lists.includes(list));
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
    addBoard,
    removeBoard,
    moveBoard,
    moveList,
    toJson,

    get activeBoard() {

        if (activeBoard) {
            return activeBoard;

        } else if (boards.length >= 1) {
            return boards[0];

        } else {
            return null;
        }
    },

    set activeBoard(board) {
        assert.instanceOf(Board, board, "'board'");
        activeBoard = board;
    }
};

export default workspace;
