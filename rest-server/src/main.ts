import { Server } from './server';
import { sprintf } from 'sprintf-js';
import { DbMongoUser } from './db-mongo-user';

class Main {
    constructor () {
        console.log('Start');
        DbMongoUser.start();
        Server.Instance.start(4711);
    }
}

const main = new Main();
