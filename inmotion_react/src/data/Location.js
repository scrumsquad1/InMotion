export default class Location {

    id;
    lat;
    lng;

    constructor({id, lat, lng}) {
        this.id = id;
        this.lat = lat;
        this.lng = lng;
    }

    toServerJSON() {
        return JSON.stringify({
            id: this.id,
            lat: this.lat,
            lng: this.lng
        });
    }

}