export class User {

    public id: string;
    public name: string;
    public room: string;

    constructor(id: string) {
        this.id = id;
        this.name = 'No-Login-yet';
        this.room = 'No-Room-yet';
    }
} 