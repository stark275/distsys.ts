"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(options, type, state) {
        this.options = options;
        this.type = type;
        this.state = state;
    }
    static factory(options, type, state) {
        return new Node(options, type, state);
    }
    getNodeOptions() {
        return JSON.parse(JSON.stringify(this.options));
    }
    getNodeUrl() {
        return this.options.protocol + '//' + this.options.host + ':' + this.options.port;
    }
}
exports.default = Node;
