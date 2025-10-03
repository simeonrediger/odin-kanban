import assert from '../utils/assert.js';
import Board from './board.js';

const boards = [];
let activeBoard;

function addBoard(board) {
    assert.instanceOf(Board, board, "'board'");
    boards.push(board);
}

function removeBoard(targetBoard) {
    assert.instanceOf(Board, targetBoard, "'targetBoard'");

    if (!boards.includes(targetBoard)) {
        throw new Error("'targetBoard' not found in this workspace");
    }

    boards.splice(boards.indexOf(targetBoard), 1);
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
