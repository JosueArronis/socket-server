import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UserList } from '../classes/user-list';
import { User } from '../classes/user';

export const usersConnected = new UserList();

export const connectClient = (client: Socket, io: SocketIO.Server) => {
    const user = new User(client.id);
    usersConnected.addUser(user);
}

export const disconnect = (client: Socket, io: SocketIO.Server) => {
    client.on('disconnect', () => {
        console.log('Client Disconnected');
        usersConnected.deleteUser(client.id);
        io.emit('active-users', usersConnected.getList());
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
        io.emit('active-users', usersConnected.getList());
        callback({
            ok: true,
            user: `User: ${payload.userName}, configurated`
        })
    });
}

// GET USERS
export const getUsers = (client: Socket, io: SocketIO.Server) => {
    client.on('get-activeUsers', () => {
        io.to(client.id).emit('active-users', usersConnected.getList());
    });
}


