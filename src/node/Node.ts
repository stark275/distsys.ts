import Options from "./interfaces/NodeOtionInterface";

export default class Node {

    /**
    * Represent Node connection options
    * @var    {Options}  
    */
    public options : Options ;

    /**
    * Type of node: server or fileServer
    * @var    {string}  
    */
    public type : string;

    /**
    * Node State: alive or dowm
    * @var    {number}  
    */
    public state : string;

    constructor(options : Options, type : string, state : string) {
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
    static factory (options : Options, type : string, state : string): Node {
        return new Node(options,type,state);
    }

    /**
    * Retrives node options
    * @return   {string}   
    */
    getNodeOptions(): string{
        return JSON.parse(JSON.stringify(this.options));
    }

    /**
    * Retrives the complete node url
    * @return   {string}   
    */
    getNodeUrl(): string{
        return this.options.protocol+'//'+this.options.host+':'+this.options.port
    }

    
}