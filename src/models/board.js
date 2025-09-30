export default class Board {

    constructor(name, lists) {
        this.name = name.trim();
        this.lists = lists;
    }

    addList(list) {
        this.lists.push(list);
    }
}
