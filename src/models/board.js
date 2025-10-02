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

    addList(list) {
        assert.instanceOf(List, list, "'list'");
        this.#lists.push(list);
    }

    removeList(targetList) {
        assert.instanceOf(List, targetList, "'targetList'");
        this.#lists.splice(this.lists.indexOf(targetList), 1);
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
