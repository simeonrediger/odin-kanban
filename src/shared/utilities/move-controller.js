import '../styles/move-controller.css';

let list;
let itemSelector;
let item;
let indexBeforeMove;
let itemClone;

let handlers = {
    onSubmit: undefined,
};

function start({
    listElement,
    itemSelectorString,
    itemToMove,
    onSubmit,
}) {

    if (item) {
        cancelItemMove();
    }

    list = listElement;
    itemSelector = itemSelectorString;
    item = itemToMove;
    handlers.onSubmit = onSubmit;
    indexBeforeMove = getItems().indexOf(item);

    list.classList.add('move-controller-list');
    cloneItem();
    document.addEventListener('keydown', handleMoveKeyDown);
}

function validateMove(movedItemId, newItemIndex) {
    const itemId = item.dataset.id;
    const itemIndex = getItems().indexOf(item);

    if (movedItemId !== itemId) {
        cancelItemMove();
        throw new Error(`Unexpected 'movedItemId': ${movedItemId}`);
    }

    if (newItemIndex !== itemIndex) {
        cancelItemMove();
        throw new Error(`Unexpected 'newItemIndex': ${newItemIndex}`);
    }

    stopItemMove();
}

function getItems() {
    return Array.from(list.querySelectorAll(itemSelector));
}

function cloneItem() {
    itemClone = item.cloneNode(true);
    delete itemClone.dataset.role;
    delete itemClone.dataset.id;

    item.classList.add('move-controller-item');
    itemClone.classList.add('move-controller-item-clone');

    moveClone();

    list.append(itemClone);
}

function handleMoveKeyDown(event) {

    switch (event.key) {

        case 'Enter':
            submitItemMove();
            break;

        case 'Escape':
            cancelItemMove();
            break;

        case 'ArrowUp':
            moveItemBackward();
            break;

        case 'ArrowDown':
            moveItemForward();
            break;
    }
}

function moveClone() {
    const listRect = list.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const positionRelativeToList = {
        top: itemRect.top - listRect.top,
        left: itemRect.left - listRect.left,
    };

    itemClone.style.top = positionRelativeToList.top + 'px';
    itemClone.style.left = positionRelativeToList.left + 'px';
    itemClone.style.width = itemRect.width + 'px';
}

function submitItemMove() {
    const targetIndex = getItems().indexOf(item);

    if (targetIndex === indexBeforeMove) {
        stopItemMove();
        return;
    }

    handlers.onSubmit(item, targetIndex);
}

function cancelItemMove() {
    moveItemToIndex(indexBeforeMove);
    stopItemMove();
}

function stopItemMove() {
    list?.classList.remove('move-controller-list');
    list = null;

    itemSelector = null;

    item?.classList.remove('move-controller-item');
    item = null;

    indexBeforeMove = null;

    itemClone?.remove();
    itemClone = null;

    handlers = {};

    document.removeEventListener('keydown', handleMoveKeyDown);
}

function moveItemForward() {
    const items = getItems();
    const currentIndex = items.indexOf(item);
    const targetIndex = currentIndex + 1;
    const maxIndex = items.length - 1;

    if (targetIndex > maxIndex) {
        return;
    }

    moveItemToIndex(targetIndex);
}

function moveItemBackward() {
    const currentIndex = getItems().indexOf(item);
    const targetIndex = currentIndex - 1;
    const minIndex = 0;

    if (targetIndex < minIndex) {
        return;
    }

    moveItemToIndex(targetIndex);
}

function moveItemToIndex(targetIndex) {
    const items = getItems();
    const maxIndex = items.length - 1;

    if (targetIndex === 0) {
        list.prepend(item);

    } else if (targetIndex === maxIndex) {
        list.append(item);

    } else {
        let targetNextItem = items[targetIndex + 1];

        if (targetNextItem === item) {
            targetNextItem = items[targetIndex];
        }

        list.insertBefore(item, targetNextItem);
    }

    moveClone();
}

const moveController = {
    start,
    submit: submitItemMove,
    validateMove,

    get isActive() {
        return Boolean(item);
    },

    itemContains(element) {
        return item?.contains(element);
    },
};

export default moveController;
