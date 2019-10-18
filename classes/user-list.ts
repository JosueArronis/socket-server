import { User } from './user';

export class UserList {

    private list: User[] = [];

    constructor() {}

    // ADD NEW USER
    public addUser (user:User) {

        this.list.push(user);
        console.log(this.list);
        return user;
    }

    // UPDATE USER NAME
    public updateName (id: string, name: string) {

        for (let user of this.list) {
            if(user.id === id) {
                user.name = name;
                break;
            }
        }
        console.log('==== UPDATE USER ====');
        console.log(this.list);
    }

    // GET USER LIST
    public getList() {
        return this.list;
    }

    // GET USER
    public getUser(id: string) {
        return this.list.find(user => {
            return user.id === id;
        });
    }

    // GET USER IN ROOM
    public getUserInRoom(room: string) {
        return this.list.filter(user => {
            return user.room === room;
        });
    }

    // DELETE USER
    public deleteUser(id: string) {
        const tempUser = this.getUser(id);
        this.list = this.list.filter(user => {
            return user.id !== id;
        });
        return tempUser;
    }
}