import './style.css';

import assert from '@/shared/validation/assert.js';
import boardPlaceholder from './components/board-placeholder.js'
import boardView from '@/domains/board/component.js';
import sidebar from './components/sidebar.js';

let workspace;
let container;
let sidebarContainer;
let boardContainer;
let boardPlaceholderContainer;

function init(containerElement, workspaceModel) {
    workspace = workspaceModel;
    container = containerElement;
    setUpElementReferences();

    sidebar.init(sidebarContainer, workspace);
    boardPlaceholder.init(boardPlaceholderContainer);
    boardView.init(boardContainer);
}

function render({ activeBoardDeleted, activeBoardExists }) {

    if (activeBoardDeleted) {
        boardPlaceholder.setBoardDeletedMessage();
        boardView.hide();
        boardPlaceholder.show();
    } else if (activeBoardExists) {
        boardPlaceholder.hide();
        boardView.show();
    } else {
        boardPlaceholder.setNoBoardsMessage();
        boardView.hide();
        boardPlaceholder.show();
    }
}

function setUpElementReferences() {
    sidebarContainer = container.querySelector("[data-role='sidebar']");
    boardContainer = container.querySelector("[data-role='board-container']");
    boardPlaceholderContainer = container.querySelector(
        "[data-role='board-placeholder']"
    );

    assert.notNull(sidebarContainer, "'sidebarContainer'");
    assert.notNull(boardContainer, "'boardContainer'");
    assert.notNull(boardPlaceholderContainer, "'boardPlaceholderContainer'");
}

const workspaceView = {
    init,
    render,
};

export default workspaceView;
