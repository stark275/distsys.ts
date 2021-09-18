"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("./Node"));
const http = __importStar(require("http"));
const timers_1 = require("timers");
class NodeManager {
    constructor(eventEmitter) {
        /**
        * Index of current node
        * @var    {number}
        */
        this.index = 0;
        /**
        * List all pingable Nodes
        * @var    {Node[]}
        */
        this.nodes = [
            Node_1.default.factory({
                protocol: "http:",
                host: "localhost",
                port: 4000,
                path: "/ping",
                method: "GET"
            }, 'server', 'unknown'),
            Node_1.default.factory({
                protocol: "http:",
                host: "localhost",
                port: 4001,
                path: "/",
                method: "GET"
            }, 'server', 'unknown'),
            Node_1.default.factory({
                protocol: "http:",
                host: "localhost",
                port: 4002,
                path: "/",
                method: "GET"
            }, 'server', 'unknown'),
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
        ];
        this._eventEmitter = eventEmitter;
        NodeManager.eventEmitter = this._eventEmitter;
        NodeManager.eventEmitter.on('alive', () => {
            let index = this.getRealId(this.index);
            this.changeNodeState(index, 'alive');
        });
        NodeManager.eventEmitter.on('down', () => {
            let index = this.getRealId(this.index);
            this.changeNodeState(index, 'down');
        });
    }
    /**
    * Create NodeManager Instance
    * (Next update: create a singleton)
    * @param    {EventEmitter} eventEmitter
    * @return   {NodeManager}
    */
    static factory(eventEmitter) {
        return new NodeManager(eventEmitter);
    }
    /**
    * Construct Server Object
    * @param    {number} index
    * @param    {string} state
    * @return   {void}
    */
    changeNodeState(index, state) {
        this.nodes[index].state = state;
    }
    /**
    * Ping a single node
    * @param    {number} port
    * @return   {void}
    */
    pingNode(index) {
        let req = http.request(this.nodes[index].getNodeOptions(), this.requestCallback);
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
    requestCallback(res) {
        var str = '';
        res.on('data', function (chunk) {
            str += chunk;
        });
        res.on("end", () => {
            NodeManager.eventEmitter.emit("alive");
        });
    }
    /**
    * infinite ping loop
    * @param    {number} interval
    * @return   {void}
    */
    pingLoop(interval) {
        (0, timers_1.setInterval)(() => {
            this.pingNode(this.index);
            if (this.index == this.nodes.length - 1)
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
    getAliveNodesUrl() {
        let aliveNodes = [];
        for (let id = 0; id < this.nodes.length; id++) {
            if (this.nodes[id].state == "alive") {
                // id = this.getRealId(id);
                let noreUrl = this.nodes[id].getNodeUrl();
                aliveNodes.push(noreUrl);
            }
        }
        console.log(aliveNodes);
        NodeManager.eventEmitter.emit("Alive-nodes-Updated", aliveNodes);
        return aliveNodes;
    }
    getRealId(id) {
        id -= 1;
        if (id == -1)
            id = this.nodes.length - 1;
        return id;
    }
}
exports.default = NodeManager;
