import '../styles/workspace.css';

import assert from '@/shared/validation/assert.js';
import boardView from '@/domains/board/components/board-view.js';
import sidebar from './sidebar.js';

let workspace;
let container;
let sidebarContainer;
let boardContainer;
let boardPlaceholder;

function render(workspaceEntity, containerElement) {
    workspace = workspaceEntity;
    container = containerElement;

    setUpElementReferences();
    sidebar.render(workspace, sidebarContainer);

    if (workspace.activeBoard) {
        boardPlaceholder.classList.add('hidden');
        boardView.render(workspace.activeBoard, boardContainer);
        boardContainer.classList.remove('hidden');
    } else {
        renderBoardPlaceholder();
    }
}

function setUpElementReferences() {
    sidebarContainer = container.querySelector('.sidebar');
    boardContainer = container.querySelector('.board-container');
    boardPlaceholder = container.querySelector('.board-placeholder');

    assert.notNull(sidebarContainer, "'sidebarContainer'");
    assert.notNull(boardContainer, "'boardContainer'");
    assert.notNull(boardPlaceholder, "'boardPlaceholder'");
}

function renderBoardPlaceholder() {
    boardContainer.classList.add('hidden');
    boardPlaceholder.classList.remove('hidden');
}

const workspaceView = {
    render,
};

export default workspaceView;
