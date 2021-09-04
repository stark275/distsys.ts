import Node from "./Node";
import * as http from "http"
import EventEmitter from 'events'
import { setInterval } from "timers";


export default class NodeManager {

    private static index: number = 0;
    
    private static eventEmitter: EventEmitter = new EventEmitter();

    private static nodes : Node[] = [
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
        )
    ];

    constructor(){
        NodeManager.eventEmitter.on('alive', () => {
           NodeManager.changeNodeState(NodeManager.index, 'alive')
        });

        NodeManager.eventEmitter.on('down', () => {
           NodeManager.changeNodeState(NodeManager.index, 'down')

        });
    }

    static factory (): NodeManager{
        return new NodeManager();
    }

    static changeNodeState(index: number, state: string): void{
        this.nodes[index].state = state;
    }

    static pingNode(index: number):void{             
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

    private static requestCallback(res: http.IncomingMessage){
        var str = ''
        res.on('data', function (chunk) {
            str += chunk
        });     
        res.on("end", () => {
            NodeManager.eventEmitter.emit("alive");
        })
    }

    static pingLoop(interval:number): void{
        this.factory()
        setInterval(() => {
            this.pingNode(this.index);
            console.log(this.getAliveNodesUrl()); 
            if (this.index == this.nodes.length-1) 
                this.index = 0;
            else
                this.index++;
        }, interval);
        console.log("Node ping Loop began...:");
        
    }

    static getAliveNodesUrl(): Array<string>{
        let aliveNodes : string[] = [];      
        for (let id = 0; id < this.nodes.length; id++) {
            if (this.nodes[id].state == "alive") {
                let noreUrl: string = this.nodes[id].getNodeUrl()
                aliveNodes.push(noreUrl)
            }
        }
        return aliveNodes
    }
}