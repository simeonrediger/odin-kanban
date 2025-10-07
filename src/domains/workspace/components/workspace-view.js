import '@/shared/styles/icon-button.css';
import '../styles/workspace.css';

import assert from '@/shared/validation/assert.js';

let workspace;
let workspaceContainer;
let addBoardButton;
let boardList;
let boardContainer;

function render(
    workspaceEntity,
    workspaceContainerSelector,
    addBoardButtonSelector,
    boardListSelector,
    boardContainerSelector,
) {
    workspace = workspaceEntity;
    workspaceContainer = document.querySelector(workspaceContainerSelector);
    addBoardButton = document.querySelector(addBoardButtonSelector);
    boardList = document.querySelector(boardListSelector);
    boardContainer = document.querySelector(boardContainerSelector);

    assert.true(workspace.isWorkspace, "'workspace.isWorkspace'");
    assert.instanceOf(Element, workspaceContainer, "'workspaceContainer'");
    assert.instanceOf(Element, addBoardButton, "'addBoardButton'");
    assert.instanceOf(Element, boardList, "'boardList'");
    assert.instanceOf(Element, boardContainer, "'boardContainer'");
}

const workspaceView = {
    render,
};

export default workspaceView;
