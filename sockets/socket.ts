import { Socket } from 'socket.io';


export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Client Disconnected');
    })
}

// Listen messages
export const menssage = (client: Socket) => {
    client.on('message', (payload: { from: string, body:string }) => {
        console.log('Message reviced: ', payload);
    })
}