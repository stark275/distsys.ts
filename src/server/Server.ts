import express, { Request, Response } from 'express';

export default class Server {
    private readonly port: number;
    constructor(port: number) {
        this.port = port;
    }

    static getInstance(port: number): Server{
        return new Server(port);
    }

    start (): void{
        const app = express();
        app.get('/', function (req:Request, res: Response) {
            res.send('Im the Best');
        });

        app.listen(this.port, function () {
            console.log('Server Started');
        })
    }
}