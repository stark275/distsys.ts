"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeManager_1 = __importDefault(require("./node/NodeManager"));
NodeManager_1.default.pingLoop(3000);
