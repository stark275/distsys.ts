import { Request, Response } from 'express';
import * as ax from 'axios';

export default class RequestManagementPolicy {

    private nodeUrls : Array<string>;
    private current: number = 0;
    private axios: any;

    constructor() {
        this.nodeUrls = [];
        this.current = 0;
        this.axios = ax.default;
    }

    updateNodeList(nodeUrls: Array<string>): void{
        this.nodeUrls = nodeUrls
    }

    async requestHandler(req: Request, res: Response){

        
        const { method, url, headers, body } = req;
        const server = this.nodeUrls[this.current];

        console.log(server);

        this.roundRobin();


        try{
		// Requesting to underlying application server
            const response = await this.axios({
                url: `${server}${url}`,
                method: method,
                headers: headers,
                data: body
            });
            // Send back the response data
            // from application server to client
            res.send(response.data)
        }
        catch(err){
            // Send back the error message
            res.status(500).send("Server error!")
        }
    }

    private roundRobin():number{
        return this.current === (this.nodeUrls.length-1)? this.current = 0 : this.current++
    }

    static factory():RequestManagementPolicy{
        return new RequestManagementPolicy();
    }
}