import { Server } from './server';
import { sprintf } from 'sprintf-js';

class Main {
    constructor () {
        console.log('Start');
        Server.Instance.start(4711);
    }
}

const main = new Main();