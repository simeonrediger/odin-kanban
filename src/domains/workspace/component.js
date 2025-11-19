import './style.css';

import assert from '@/shared/validation/assert.js';
import boardList from './components/board-list.js';
import boardPlaceholder from './components/board-placeholder.js'
import boardView from '@/domains/board/component.js';

let container;
let boardContainer;
let boardListContainer;
let boardPlaceholderContainer;

function init(containerElement, workspaceModel) {
    container = containerElement;
    cacheElements();

    boardList.init(boardListContainer);
    boardPlaceholder.init(boardPlaceholderContainer);
    boardView.init(boardContainer);
}

function render({ activeBoardExists, boardsAvailable }) {

    if (activeBoardExists) {
        boardPlaceholder.hide();
        boardView.show();
        return;
    }

    if (boardsAvailable) {
        boardPlaceholder.setBoardDeletedMessage();
    } else {
        boardPlaceholder.setNoBoardsMessage();
    }

    boardView.hide();
    boardPlaceholder.show();
}

function cacheElements() {
    boardListContainer = container.querySelector(
        "[data-role='board-list-container']"
    );
    boardContainer = container.querySelector("[data-role='board-container']");
    boardPlaceholderContainer = container.querySelector(
        "[data-role='board-placeholder']"
    );

    assert.notNull(boardListContainer, "'boardListContainer'");
    assert.notNull(boardContainer, "'boardContainer'");
    assert.notNull(boardPlaceholderContainer, "'boardPlaceholderContainer'");
}

const workspaceView = {
    init,
    render,
};

export default workspaceView;
