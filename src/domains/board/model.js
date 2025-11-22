import assert from '@/shared/validation/assert.js';
import List from '@/domains/list/model.js';
import Task from '@/domains/task/model.js';

export default class Board {

    static fromJson(boardJson) {
        const board = new Board(boardJson.name, [], boardJson.id);

        for (const listJson of boardJson.lists) {
            const list = List.fromJson(listJson);
            board.addList(list);
        }

        return board;
    }

    #id;
    #name;
    #lists;

    constructor(name, lists, id) {
        this.#id = id ?? crypto.randomUUID();
        this.name = name;
        this.lists = lists;
        Object.freeze(this);
    }

    getList(listId) {
        assert.string(listId, "'listId'");
        return this.#lists.find(list => list.id === listId);
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

    addEmptyList(listName) {
        const list = new List(listName, []);
        this.addList(list);
        return list;
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

    moveTask(task, targetList, targetIndex) {
        assert.instanceOf(Task, task, "'task'");
        assert.instanceOf(List, targetList, "'targetList'");

        const list = this.findListWithTask(task);

        if (!list) {
            throw new Error("'task' not found on this board");
        }

        list.removeTask(task);
        targetList.addTask(task, targetIndex);
    }

    findListWithTask(task) {
        assert.instanceOf(Task, task, "'task'");
        return this.#lists.find(list => list.tasks.includes(task));
    }

    get id() {
        return this.#id;
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
            id: this.#id,
            name: this.#name,
            lists: Object.freeze(lists),
        });
    }

    toJson(replacer, space) {
        return JSON.stringify(this.toObject(), replacer, space);
    }
}
