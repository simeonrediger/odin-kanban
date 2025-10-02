import assert from '../utils/assert.js';

export default class Board {
    name;
    lists;

    constructor(name, lists) {
        assert.string(name, `${this.constructor.name} 'name'`);
        assert.array(lists, `${this.constructor.name} 'lists'`);

        this.name = name;
        this.lists = lists;
    }

    addList(list) {
        this.lists.push(list);
    }

    removeList(targetList) {
        this.lists.splice(this.lists.indexOf(targetList), 1);
    }
}
