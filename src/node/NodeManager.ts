import Node from "./Node";
import * as http from "http";
import EventEmitter from 'events';
import { setInterval } from "timers";
import { IncomingMessage } from "http";

export default class NodeManager {

    private  index: number = 0;
    
    private static eventEmitter: EventEmitter;

    private  _eventEmitter: EventEmitter;

    private  nodes : Node[] = [
        Node.factory(
            {
                protocol :"http:",
                host: "localhost",
                port: 5000,
                path: "/",
                method: "GET"
            },
            'server',
            'unknown'
        ),
        Node.factory(
            {
                protocol :"http:",
                host: "localhost",
                port: 5000,
                path: "/n2",
                method: "GET"
            },
            'server',
            'unknown'
        ),
        Node.factory(
            {
                protocol :"http:",
                host: "localhost",
                port: 5005,
                path: "/n3",
                method: "GET"
            },
            'server',
            'unknown'
        )
    ];

   // private static aliveNodes: string[] = []

    constructor(eventEmitter: EventEmitter){

        this._eventEmitter = eventEmitter;
        NodeManager.eventEmitter = this._eventEmitter;

        NodeManager.eventEmitter.on('alive', () => {
           this.changeNodeState(this.index, 'alive')
        });

        NodeManager.eventEmitter.on('down', () => {
           this.changeNodeState(this.index, 'down')

        });
    }

    static factory (eventEmitter: EventEmitter): NodeManager{
        return new NodeManager(eventEmitter);
    }

    private changeNodeState(index: number, state: string): void{
        this.nodes[index].state = state;
    }

    private pingNode(index: number):void{             
        let req = http.request(
            this.nodes[index].getNodeOptions(),
            this.requestCallback            
        );
        req.on("error", () => {
            NodeManager.eventEmitter.emit('down');            
        });
        
        console.log();    
        console.log("---------------------endPing-------------------");
        console.log();   

        req.end();
    }

    private  requestCallback(res: IncomingMessage){
        var str = ''
        res.on('data', function (chunk) {
            str += chunk
        });     
        res.on("end", () => {
            NodeManager.eventEmitter.emit("alive");
        })
    }

    pingLoop(interval:number): void{
        setInterval(() => {
            this.pingNode(this.index);
            if (this.index == this.nodes.length-1) 
                this.index = 0;
            else
                this.index++;

            this.getAliveNodesUrl(); 
        }, interval); 
        console.log("Node ping Loop began...:");      
    }

    private getAliveNodesUrl(): Array<string>{
        let aliveNodes : string[] = [];      
        for (let id = 0; id < this.nodes.length; id++) {
            if (this.nodes[id].state == "alive") {
                let noreUrl: string = this.nodes[id].getNodeUrl()
                aliveNodes.push(noreUrl)
            }
        }

        NodeManager.eventEmitter.emit("Alive-nodes-Updated",aliveNodes);

        return aliveNodes
    }
}