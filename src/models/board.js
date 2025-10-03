import assert from '../utils/assert.js';
import List from './list.js';

export default class Board {
    #name;
    #lists;

    constructor(name, lists) {
        this.name = name;
        this.lists = lists;
        Object.freeze(this);
    }

    addList(list, targetIndex) {
        assert.instanceOf(List, list, "'list'");

        if (targetIndex === undefined) {
            this.#lists.push(list);
        } else {
            assert.nonNegativeInteger(targetIndex, "'targetIndex'");
            this.#lists.splice(targetIndex, 0, list);
        }
    }

    removeList(targetList) {
        assert.instanceOf(List, targetList, "'targetList'");

        if (!this.#lists.includes(targetList)) {
            throw new Error("'targetList' not found on this board");
        }

        this.#lists.splice(this.lists.indexOf(targetList), 1);
    }

    moveList(list, targetIndex) {
        assert.instanceOf(List, list, "'list'");
        assert.nonNegativeInteger(targetIndex, "'targetIndex'");

        this.removeList(list);
        this.addList(list, targetIndex);
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        assert.string(name);
        this.#name = name;
    }

    get lists() {
        return Object.freeze([...this.#lists]);
    }

    set lists(lists) {
        assert.array(lists, "'lists'");
        this.#lists = lists;
    }

    toObject() {
        const lists = [];

        for (const list of this.#lists) {
            lists.push(list.toObject());
        }

        return Object.freeze({
            name: this.#name,
            lists: Object.freeze(lists),
        });
    }

    toJson(replacer, space) {
        return JSON.stringify(this.toObject(), replacer, space);
    }
}
