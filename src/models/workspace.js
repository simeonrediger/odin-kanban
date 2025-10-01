const boards = [];
let activeBoard;

function addBoard(board) {
    boards.push(board);
}

function removeBoard(targetBoard) {
    boards.splice(boards.indexOf(targetBoard), 1);
}

const workspace = {
    boards,
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
        activeBoard = board;
    }
};

export default workspace;
