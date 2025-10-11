import '../styles/sidebar.css';

import assert from '@/shared/validation/assert.js';
import boardList from './board-list.js';

let workspace;
let container;
let boardListContainer;

function render(workspaceEntity, containerElement) {
    workspace = workspaceEntity;
    container = containerElement;

    setUpElementReferences();
    boardList.render(workspace, boardListContainer);
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
