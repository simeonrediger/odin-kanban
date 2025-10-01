export default class Board {

    constructor(name, lists) {
        this.name = name.trim();
        this.lists = lists;
    }

    addList(list) {
        this.lists.push(list);
    }

    removeList(targetList) {
        this.lists.splice(this.lists.indexOf(targetList), 1);
    }

    setName(name) {
        this.name = name;
    }
}
