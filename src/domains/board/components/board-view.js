import '../styles/board.css';

import assert from '@/shared/validation/assert.js';
import Board from '../model/board.js';

let board;
let container;

function render(boardEntity, containerElement) {
    board = boardEntity;
    container = containerElement;

    assert.instanceOf(Board, board, "'board'");
    assert.instanceOf(Element, container, "'container'");
}

const boardView = {
    render,
};

export default boardView;
