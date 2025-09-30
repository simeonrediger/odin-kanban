import List from './list.js';

export default class Project {

    constructor(name, lists) {

        if (!Array.isArray(lists)) {
            throw new TypeError("Expected 'lists' to be an array");
        }

        this.name = name.trim();
        this.lists = lists;
    }

    addList(list) {
        const isNotList = !(list instanceof List);
        const listNameAlreadyExists = this.lists.some(
            existingList => list.name === existingList.name
        );

        if (isNotList || listNameAlreadyExists) {

            if (isNotList) {
                throw new TypeError(`Not an instance of ${List.name}`);
            }

            if (listNameAlreadyExists) {
                throw new DuplicateNameError(list.name);
            }
        }

        this.lists.push(list);
    }
}
