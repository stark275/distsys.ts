import Node from "./Node";
import * as http from "http";
import EventEmitter from 'events';
import { setInterval } from "timers";
import { IncomingMessage } from "http";
import NodePark from "./NodePark";

export default class NodeManager {

    /**
    * Index of current node
    * @var    {number}  
    */
    private  index: number = 0;
    
    /**
    * Static Event emitter object to resolve 'this' Scope
    * @var    {EventEmitter}  
    */
    private static eventEmitter: EventEmitter;

    /**
    * Event emitter object 
    * @var    {EventEmitter}  
    */
    private  _eventEmitter: EventEmitter;

    /**
    * List all pingable Nodes
    * 
    */

     private nodesPark = new NodePark
     private nodes = this.nodesPark.getAllNodes();
    // private  nodes : Node[] = [
    //     Node.factory(
    //         {
    //             protocol :"http:",
    //             host: "localhost",
    //             port: 4000,
    //             path: "/ping",
    //             method: "GET"
    //         },
    //         'server',
    //         'unknown'
    //     ),
    //    Node.factory(
    //         {
    //             protocol :"http:",
    //             host: "localhost",
    //             port: 4001,
    //             path: "/",
    //             method: "GET"
    //         },
    //         'server',
    //         'unknown'
    //     ),
    //     Node.factory(
    //         {
    //             protocol :"http:",
    //             host: "localhost",
    //             port: 4002,
    //             path: "/",
    //             method: "GET"
    //         },
    //         'server',
    //         'unknown'
    //     ),
        // Node.factory(
        //     {
        //         protocol :"http:",
        //         host: "192.168.43.237",
        //         port: 8003,
        //         path: "/ping",
        //         method: "GET"
        //     },
        //     'server',
        //     'unknown'
        // ),
        // Node.factory(
        //     {
        //         protocol :"http:",
        //         host: "192.168.43.237",
        //         port: 8004,
        //         path: "/ping",
        //         method: "GET"
        //     },
        //     'server',
        //     'unknown'
        // ),
        // Node.factory(
        //     {
        //         protocol :"http:",
        //         host: "192.168.43.237",
        //         port: 8005,
        //         path: "/ping",
        //         method: "GET"
        //     },
        //     'server',
        //     'unknown'
        // )
    //];
    
    
    constructor(eventEmitter: EventEmitter){

        this._eventEmitter = eventEmitter;
        NodeManager.eventEmitter = this._eventEmitter;

        NodeManager.eventEmitter.on('alive', () => {
            let index: number = this.getRealId(this.index);
            this.changeNodeState(index, 'alive')       
        });

        NodeManager.eventEmitter.on('down', () => {
            let index: number = this.getRealId(this.index);
            this.changeNodeState(index, 'down');
        });
    }

    /**
    * Create NodeManager Instance
    * (Next update: create a singleton)
    * @param    {EventEmitter} eventEmitter
    * @return   {NodeManager}   
    */
    static factory (eventEmitter: EventEmitter): NodeManager{
        return new NodeManager(eventEmitter);
    }

    /**
    * Construct Server Object
    * @param    {number} index
    * @param    {string} state
    * @return   {void}   
    */
    private changeNodeState(index: number, state: string): void{
        this.nodes[index].state = state;
    }

    /**
    * Ping a single node 
    * @param    {number} port
    * @return   {void}   
    */
    private pingNode(index: number): void{  
        let req = http.request(
            this.nodes[index].getNodeOptions(),
            this.requestCallback            
        );
        req.on("error", () => {
            NodeManager.eventEmitter.emit('down');            
        });

        this.getAliveNodesUrl(); 
        
        console.log();    
        console.log("---------------------endPing-------------------");
        console.log();  
        
        

        req.end();
    }

    /**
    * Request Callback 
    * @param    {IncomingMessage} res
    * @return   {void}   
    */
    private  requestCallback(res: IncomingMessage){
        var str = ''
        res.on('data', function (chunk) {
            str += chunk
        });     
        res.on("end", () => {
            NodeManager.eventEmitter.emit("alive");
        })

    }

    /**
    * infinite ping loop 
    * @param    {number} interval
    * @return   {void}   
    */
    pingLoop(interval:number): void{
        setInterval(() => {
            this.pingNode(this.index);
            if (this.index == this.nodes.length-1) 
                this.index = 0;
            else
                this.index++;

        }, interval); 
        console.log("Node ping Loop began...:");      
    }

    /**
    * Get url array of alive Nodes 
    * @return   {Array<string>}   
    */
    private getAliveNodesUrl(): Array<string>{
        let aliveNodes : string[] = [];  

        for (let id = 0; id < this.nodes.length; id++) {
            if (this.nodes[id].state == "alive") {
               // id = this.getRealId(id);
                let noreUrl: string = this.nodes[id].getNodeUrl()
                aliveNodes.push(noreUrl);
            }
        }
        console.log(aliveNodes);
        NodeManager.eventEmitter.emit("Alive-nodes-Updated",aliveNodes);

        return aliveNodes
    }

    private getRealId(id: number): number{
        id -= 1;
        if (id == -1) 
            id = this.nodes.length - 1
      
        return id;
    }
}