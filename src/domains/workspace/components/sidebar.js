import '../styles/sidebar.css';

import assert from '@/shared/validation/assert.js';
import boardList from './board-list.js';

let container;
let boardListContainer;

function init(containerElement) {
    container = containerElement;
    cacheElements();
    boardList.init(boardListContainer);
}

function cacheElements() {
    boardListContainer = container.querySelector(
        "[data-role='board-list-container']"
    );
    assert.notNull(boardListContainer, "'boardListContainer'");
}

const sidebar = {
    init,
};

export default sidebar;
