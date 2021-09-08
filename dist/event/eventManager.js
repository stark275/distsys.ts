"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
class EventManager {
    constructor() {
        this._eventEmitter = new events_1.default();
    }
    /**
    * @return   {EventManage}
    */
    static factory() {
        return new EventManager();
    }
    /**
    * @return   {EventManage}
    */
    get eventEmitter() {
        return this._eventEmitter;
    }
}
exports.default = EventManager;
