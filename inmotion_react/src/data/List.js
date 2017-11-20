export default class List {

    constructor({id, name, location}) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.tasks = [];
    }

}