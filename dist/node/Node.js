"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(options, type, state) {
        this.options = options;
        this.type = type;
        this.state = state;
    }
    /**
    * Create an instance of Server class
    * @param    {Options} options
    * @param    {string} type
    * @param    {string} state
    * @return   {Node}
    */
    static factory(options, type, state) {
        return new Node(options, type, state);
    }
    /**
    * Retrives node options
    * @return   {string}
    */
    getNodeOptions() {
        return JSON.parse(JSON.stringify(this.options));
    }
    /**
    * Retrives the complete node url
    * @return   {string}
    */
    getNodeUrl() {
        return this.options.protocol + '//' + this.options.host + ':' + this.options.port;
    }
}
exports.default = Node;
