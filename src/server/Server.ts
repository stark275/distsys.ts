import express, { Request, Response } from 'express';
import NodeManager from "../node/NodeManager";
import EventManager from '../event/eventManager';
import EventEmitter from 'events';

export default class Server {

    private readonly port: number;
    private currentServer: number;
    private eventEmitter: EventEmitter;

    constructor(port: number) {
        this.port = port;
        this.currentServer = 0;
        this.eventEmitter = EventManager.factory().eventEmitter;
    }

    static getInstance(port: number): Server{
        return new Server(port);
    }

    start (): void{
       const app = express();
   
       NodeManager.factory(this.eventEmitter).pingLoop(3000);

       this.eventEmitter.on('Alive-nodes-Updated', (aliveNodes)=>{
           console.log(aliveNodes);
       });

        app.get('/', function (req:Request, res: Response) {
            res.send('Im the Best');
        });

        app.listen(this.port, function () {
            console.log('Server Started');
        });
    }

    async requestHandler(req:Request, res: Response){
        const { method, url, headers, body } = req;

    }


}