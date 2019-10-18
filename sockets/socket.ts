import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UserList } from '../classes/user-list';
import { User } from '../classes/user';

export const usersConnected = new UserList();

export const connectClient =  (client: Socket) => {
    const user = new User(client.id);
    usersConnected.addUser(user);
}

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Client Disconnected');
        usersConnected.deleteUser(client.id);
    })
}

// Listen messages
export const menssage = (client: Socket, io: SocketIO.Server) => {
    client.on('message', (payload: { from: string, body:string }) => {
        console.log('Message reviced: ', payload);
        io.emit('new-message', payload);
    })
}

//listen Config User
export const userConfigure = (client: Socket, io: SocketIO.Server) => {
    client.on('user-configure', (payload: { userName: string}, callback: Function) => {
        usersConnected.updateName(client.id, payload.userName);
        callback({
            ok: true,
            user: `User: ${payload.userName}, configurated`
        })
    });
}

