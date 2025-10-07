import '@/shared/styles/icon-button.css';
import '../styles/workspace.css';

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
}

const workspaceView = {
    render,
};

export default workspaceView;
