let container;

function init(containerElement) {
    container = containerElement;
}

function show() {
    container.classList.remove('hidden');
}

function hide() {
    container.classList.add('hidden');
}

const boardPlaceholder = {
    init,
    show,
    hide,
};

export default boardPlaceholder;
