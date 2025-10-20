import '../styles/sidebar.css';

import assert from '@/shared/validation/assert.js';
import boardList from './board-list.js';

let workspace;
let container;
let boardListContainer;

function init(containerElement, workspaceModel, { onBoardSelect } = {}) {
    workspace = workspaceModel;
    container = containerElement;
    setUpElementReferences();
    boardList.init(boardListContainer, workspace, { onBoardSelect });
}

function render() {
    boardList.render();
}

function setUpElementReferences() {
    boardListContainer = container.querySelector(
        "[data-role='board-list-container']"
    );
    assert.notNull(boardListContainer, "'boardListContainer'");
}

const sidebar = {
    init,
    render,
};

export default sidebar;
