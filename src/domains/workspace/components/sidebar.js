import '../styles/sidebar.css';

import assert from '@/shared/validation/assert.js';
import boardList from './board-list.js';

let container;
let boardListContainer;

function init(containerElement) {
    container = containerElement;
    setUpElementReferences();
    boardList.init(boardListContainer);
}

function setUpElementReferences() {
    boardListContainer = container.querySelector(
        "[data-role='board-list-container']"
    );
    assert.notNull(boardListContainer, "'boardListContainer'");
}

const sidebar = {
    init,
};

export default sidebar;
