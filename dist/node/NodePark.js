"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("./Node"));
class NodePark {
    static getAllNodes() {
        return [...NodePark.nodes];
    }
}
exports.default = NodePark;
NodePark.nodes = [
    Node_1.default.factory({
        protocol: "http:",
        host: "127.0.0.1",
        port: 8003,
        path: "/ping",
        method: "GET"
    }, 'server', 'unknown'),
    Node_1.default.factory({
        protocol: "http:",
        host: "127.0.0.1",
        port: 8004,
        path: "/ping",
        method: "GET"
    }, 'server', 'unknown'),
    Node_1.default.factory({
        protocol: "http:",
        host: "127.0.0.1",
        port: 8005,
        path: "/ping",
        method: "GET"
    }, 'server', 'unknown'),
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
];
