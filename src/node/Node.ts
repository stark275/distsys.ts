import Options from "./interfaces/NodeOtionInterface";

export default class Node {

    public options : Options ;
    public type : string;
    public state : string;

    constructor(options : Options, type : string, state : string) {
        this.options = options;
        this.type = type;
        this.state = state;
    }

    static factory (options : Options, type : string, state : string): Node {
        return new Node(options,type,state);
    }

    getNodeOptions(): string{
        return JSON.parse(JSON.stringify(this.options));
    }

    getNodeUrl(): string{
        return this.options.protocol+'//'+this.options.host+':'+this.options.port
    }

    
}