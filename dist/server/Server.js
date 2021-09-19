"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const NodeManager_1 = __importDefault(require("../node/NodeManager"));
const eventManager_1 = __importDefault(require("../event/eventManager"));
const RequestManagementPolicy_1 = __importDefault(require("../node/nodePolicy/RequestManagementPolicy"));
class Server {
    /**
    * Construct Server Object
    * @param    {number} port
    * @return   {void}
    */
    constructor(port) {
        this.aliveNodes = [];
        this.port = port;
        this.bodyparser = body_parser_1.default;
        this.eventEmitter = eventManager_1.default.factory().eventEmitter;
        this.requestManager = RequestManagementPolicy_1.default.factory();
    }
    /**
    * Create an instance of Server class
    * @param    {number} port
    * @return   {Server}
    */
    static getInstance(port) {
        return new Server(port);
    }
    /**
    * Start the server
    * @return   {void}
    *
    */
    start() {
        const app = (0, express_1.default)();
        app.disable('etag');
        //  app.use(express.static('http://localhost:4000'));
        NodeManager_1.default.factory(this.eventEmitter).pingLoop(2000);
        this.eventEmitter.on('Alive-nodes-Updated', (aliveNodes) => {
            this.aliveNodes = aliveNodes;
            this.requestManager.updateNodeList(this.aliveNodes);
        });
        this.requestManager.updateNodeList(this.aliveNodes);
        app.use(this.bodyparser.urlencoded({ extended: false }));
        app.use(this.bodyparser.json());
        app.use((req, res) => {
            this.requestManager.requestHandler(req, res);
        });
        app.listen(this.port, function () {
            console.log('Server Started');
        });
    }
}
exports.default = Server;
