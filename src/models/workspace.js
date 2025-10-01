const boards = [];
let activeBoard;

function addBoard(board) {
    boards.push(board);
}

function removeBoard(targetBoard) {
    boards.splice(boards.indexOf(targetBoard), 1);
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
    boards,
    addBoard,
    removeBoard,
    getActiveBoard,
};

export default workspace;
