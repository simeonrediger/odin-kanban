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
    boards.splice(boards.indexOf(targetBoard), 1);
}

const workspace = {
    addBoard,
    removeBoard,

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
