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
const events_1 = __importDefault(require("events"));
const timers_1 = require("timers");
class NodeManager {
    constructor() {
        NodeManager.eventEmitter.on('alive', () => {
            NodeManager.changeNodeState(NodeManager.index, 'alive');
        });
        NodeManager.eventEmitter.on('down', () => {
            NodeManager.changeNodeState(NodeManager.index, 'down');
        });
    }
    static factory() {
        return new NodeManager();
    }
    static changeNodeState(index, state) {
        this.nodes[index].state = state;
    }
    static pingNode(index) {
        let req = http.request(this.nodes[index].getNodeOptions(), this.requestCallback);
        req.on("error", () => {
            NodeManager.eventEmitter.emit('down');
        });
        console.log();
        console.log("---------------------endPing-------------------");
        console.log();
        req.end();
    }
    static requestCallback(res) {
        var str = '';
        res.on('data', function (chunk) {
            str += chunk;
        });
        res.on("end", () => {
            NodeManager.eventEmitter.emit("alive");
        });
    }
    static pingLoop(interval) {
        this.factory();
        (0, timers_1.setInterval)(() => {
            this.pingNode(this.index);
            console.log(this.getAliveNodesUrl());
            if (this.index == this.nodes.length - 1)
                this.index = 0;
            else
                this.index++;
        }, interval);
        console.log("Node ping Loop began...:");
    }
    static getAliveNodesUrl() {
        let aliveNodes = [];
        for (let id = 0; id < this.nodes.length; id++) {
            if (this.nodes[id].state == "alive") {
                let noreUrl = this.nodes[id].getNodeUrl();
                aliveNodes.push(noreUrl);
            }
        }
        return aliveNodes;
    }
}
exports.default = NodeManager;
NodeManager.index = 0;
NodeManager.eventEmitter = new events_1.default();
NodeManager.nodes = [
    Node_1.default.factory({
        protocol: "http:",
        host: "localhost",
        port: 5000,
        path: "/",
        method: "GET"
    }, 'server', 'unknown'),
    Node_1.default.factory({
        protocol: "http:",
        host: "localhost",
        port: 5000,
        path: "/n2",
        method: "GET"
    }, 'server', 'unknown')
];
