import deepFreeze from '../utils/deep-freeze.js';

const boards = [];
let activeBoard;

function addBoard(board) {
    boards.push(board);
}

function getActiveBoard() {

    if (activeBoard) {
        return activeBoard;

    } else if (boards.length >= 1) {
        return boards[0];

    } else {
        return null;
    }
}

const workspace = {
    getBoards: () => deepFreeze(boards),
    addBoard,
    getActiveBoard,
};

export default workspace;
