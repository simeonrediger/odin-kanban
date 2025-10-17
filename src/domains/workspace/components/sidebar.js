import '../styles/sidebar.css';

import assert from '@/shared/validation/assert.js';
import boardList from './board-list.js';

let workspace;
let container;
let boardListContainer;

function render(workspaceEntity, containerElement, boardSelectHandler) {
    workspace = workspaceEntity;
    container = containerElement;

    setUpElementReferences();
    boardList.init(workspace, boardListContainer, boardSelectHandler);
    boardList.render();
}

function setUpElementReferences() {
    boardListContainer = container.querySelector(
        "[data-role='board-list-container']"
    );
    assert.notNull(boardListContainer, "'boardListContainer'");
}

const sidebar = {
    render,
};

export default sidebar;
