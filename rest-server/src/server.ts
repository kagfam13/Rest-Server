import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as morgan from 'morgan';
import { DbMongoUser } from './db-mongo-user';

export class Server {
    private static _instance: Server;

    public static get Instance (): Server {
        if (Server._instance === undefined) {
            Server._instance = new Server;
        }
        return Server._instance;
    }

    // ***************************

    private _express: express.Express;

    private constructor () {}

    public start (port: number) {
        this._express = express();
        // this._express.use(morgan('combined'));
        // this._express.all('/**', (req, res, next) => this.handleAll(req, res, next));

        this._express.get('/user', (req, res, next) => this.handleGet(req, res, next));

        const server = http.createServer(this._express).listen(port, () => {
            console.log('Server gestartet');
        });
        server.on('connection', socket => {
            console.log('connection established: ' + socket.remoteAddress + ':' + socket.remotePort);
            // socket.destroy();
        })

        server.on('close', () => {
            console.log('Server gestoppt');
        })

        server.on('error', err => {
            console.log(err);
        })
    }

    private handleAll(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.send('Ok');
    }

    private handleGet(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (!req.query || !req.query.htlid) {
            res.status(404).end();
            return;
        }
        const user = DbMongoUser.Instance.getUser(req.query.htlid);
        if (user) {
            res.json(user.toObject());
        } else {
            res.status(404).send('Error');
        }
    }
}
