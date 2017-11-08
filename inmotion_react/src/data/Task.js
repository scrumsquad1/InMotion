export default class Task {

    id;
    list;
    subject;
    priority;

    constructor(id, list, subject, priority) {
        this.id = id;
        this.list = list;
        this.subject = subject;
        this.priority = priority;
    }

}