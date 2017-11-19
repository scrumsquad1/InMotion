export default class List {

    constructor({id, name, lat, lng}) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.tasks = [];
    }

}