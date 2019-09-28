import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';
export default class server {
    private static _instance: server;
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.listenSockets();
    }
    public static get instance() {
        return this._instance || (this._instance = new this());
    }
    private listenSockets() {
        console.log('Listen Connections --Sockets');
        this.io.on('connection', client => {
            console.log('New client connected');
            // Messages
            socket.menssage(client, this.io);

            // Disconnect Client Socket
            socket.disconnect(client);
        });
    }
    start (callback: Function ) {
        this.httpServer.listen(this.port, callback());
    }
}