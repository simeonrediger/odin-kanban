import '../styles/board.css';

let board;
let container;

function render(boardEntity, containerElement) {
    board = boardEntity;
    container = containerElement;
}

const boardView = {
    render,
};

export default boardView;
