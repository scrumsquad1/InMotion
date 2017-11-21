export default class Task {

    constructor({id, subject, priority, list}) {
        this.id = id;
        this.subject = subject;
        this.priority = priority;
        this.list = list;
    }

    toServerJSON() {
        return JSON.stringify({
            id: this.id,
            subject: this.subject,
            priority: this.priority,
            list_id: this.list.id
        });
    }

}