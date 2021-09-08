import { Request, Response } from 'express';
import * as ax from 'axios';

export default class RequestManagementPolicy {

    /**
    * Alive node url
    * @var {EventEmitter}  
    */
    private nodeUrls : Array<string>;

    /**
     * Current node index
    * @var {number}  
    */
    private current: number = 0;

    /**
    * Axios Api
    * @var {}  
    */
    private axios: any;

    constructor() {
        this.nodeUrls = [];
        this.current = 0;
        this.axios = ax.default;
    }

    /**
    * Update alive node after ping
    * @param    {Array<string>} nodeUrls
    * @return   {void}   
    */
    updateNodeList(nodeUrls: Array<string>): void{
        this.nodeUrls = nodeUrls
    }

    /**
    * Handle an incoming request and foward it to the
    * current node
    * @param    {Request} req
    * @param    {Response} res
    * @return   {Promise<void>}   
    */
    async requestHandler(req: Request, res: Response): Promise<void>{
      
        const { method, url, headers, body } = req;
        const server = this.nodeUrls[this.current];

        console.log(this.nodeUrls[this.current]);

        this.roundRobin();

        try{
            const response = await this.axios({
                url: `${server}${url}`,
                method: method,
                headers: headers,
                data: body
            });
            res.send(response.data)
        }
        catch(err){
            res.status(500).send("Server error!")
        }
    }
    
     /**
    * Determine next node by round robin algoritm
    * @return   {number}   
    */
    private roundRobin():number{
        return this.current === (this.nodeUrls.length-1)? this.current = 0 : this.current++
    }
    /**
    * Determine next node by random algoritm
    * @return   {number}   
    */
    private random():number{
        return this.current = Math.floor(Math.random() * this.nodeUrls.length);
    }

    /**
    * Create RequestManagementPolicy instance
    * @return   {RequestManagementPolicy}   
    */
    static factory():RequestManagementPolicy{
        return new RequestManagementPolicy();
    }
}