"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NodeManager_1 = __importDefault(require("../node/NodeManager"));
const eventManager_1 = __importDefault(require("../event/eventManager"));
class Server {
    constructor(port) {
        this.port = port;
        this.currentServer = 0;
        this.eventEmitter = eventManager_1.default.factory().eventEmitter;
    }
    static getInstance(port) {
        return new Server(port);
    }
    start() {
        const app = (0, express_1.default)();
        NodeManager_1.default.factory(this.eventEmitter).pingLoop(3000);
        this.eventEmitter.on('Alive-nodes-Updated', (aliveNodes) => {
            // console.log(aliveNodes);
        });
        app.get('/', function (req, res) {
            res.send('Im the Best');
        });
        app.listen(this.port, function () {
            console.log('Server Started');
        });
    }
    requestHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { method, url, headers, body } = req;
        });
    }
}
exports.default = Server;
