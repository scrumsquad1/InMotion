export default class List {

    id;
    name;
    location;

    constructor({id, name, location}) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.tasks = [];
    }

    toServerJSON() {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            location_id: this.location.id
        });
    }

}