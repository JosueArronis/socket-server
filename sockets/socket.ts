import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Client Disconnected');
    })
}

// Listen messages
export const menssage = (client: Socket, io: SocketIO.Server) => {
    client.on('message', (payload: { from: string, body:string }) => {
        console.log('Message reviced: ', payload);
        io.emit('new-message', payload);
    })
}

