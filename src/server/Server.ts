import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import NodeManager from "../node/NodeManager";
import EventManager from '../event/eventManager';
import EventEmitter from 'events';
import RequestManagementPolicy from '../node/nodePolicy/RequestManagementPolicy';

export default class Server {

    private readonly port: number;
    private bodyparser: any;
    private eventEmitter: EventEmitter;
    private aliveNodes: Array<string> = [];
    private requestManager: RequestManagementPolicy;

    /**
    * Construct Server Object
    * @param    {number} port
    * @return   {void}   
    */
    constructor(port: number) {
        this.port = port;
        this.bodyparser = bodyParser;
        this.eventEmitter = EventManager.factory().eventEmitter;
        this.requestManager = RequestManagementPolicy.factory();
    }

    /**
    * Create an instance of Server class
    * @param    {number} port
    * @return   {Server}   
    */
    static getInstance(port: number): Server{
        return new Server(port);
    }

    /**
    * Start the server 
    * @return   {void}   
    * 
    */
    start (): void{
       const app = express();
    
       app.disable('etag');
     //  app.use(express.static('http://localhost:4000'));
       NodeManager.factory(this.eventEmitter).pingLoop(2000);

       this.eventEmitter.on('Alive-nodes-Updated', (aliveNodes)=>{
          this.aliveNodes = aliveNodes
          this.requestManager.updateNodeList(this.aliveNodes);
       });

        this.requestManager.updateNodeList(this.aliveNodes);

        app.use(this.bodyparser.urlencoded({extended:false}))
        app.use(this.bodyparser.json())

        app.use((req,res)=>{
            this.requestManager.requestHandler(req,res)
        });

        app.listen(this.port, function () {
            console.log('Server Started');
        });
    }

}