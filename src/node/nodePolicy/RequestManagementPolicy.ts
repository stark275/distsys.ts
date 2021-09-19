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
        
        const server = this.nodeUrls[this.current]; // http://localhost:xxxx

        req.headers.host = server.substring(7); // localhost:xxxx

        const { method, url, headers, body } = req;
       
        this.random(); // 0 or 1 or 2 or N

        try{
           // console.log(`${server}${url}`, this.current); 
            
            const response = await this.axios({
                url: `${server}${url}`, //http://localhost:xxxx/login (for exemple)
                method: method,
                headers: headers,
                data: body
            });

            res.send(response.data)
        }
        catch(err){
            res.status(500).send("[500] Server error! " + err);
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