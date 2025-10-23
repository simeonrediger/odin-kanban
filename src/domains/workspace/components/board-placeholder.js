import '../styles/board-placeholder.css';

import assert from '@/shared/validation/assert.js';

let container;
let message;

function init(containerElement) {
    container = containerElement;
    cacheElements();
}

function cacheElements() {
    message = container.querySelector("[data-role='message']");
    assert.notNull(message, "'message'");
}

function show() {
    container.classList.remove('hidden');
}

function hide() {
    container.classList.add('hidden');
}

function setMessage(text) {
    message.textContent = text;
}

function setNoBoardsMessage() {
    setMessage("You don't have any boards");
}

function setBoardDeletedMessage() {
    setMessage('This board has been deleted');
}

const boardPlaceholder = {
    init,
    show,
    hide,
    setNoBoardsMessage,
    setBoardDeletedMessage,
};

export default boardPlaceholder;
