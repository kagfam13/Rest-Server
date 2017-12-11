import {User, IUser} from './user';
import * as mongodb from 'mongodb';

export class DbMongoUser {

    public static async start() {

        const url = 'mongodb://localhost:27017/m13la1';

        // mongodb.MongoClient.connect('mongodb://localhost:27017/m13la1', (err, db) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log('Database connected');
        //     }
        // });


        // mongodb.MongoClient.connect(url).then( db => {
        //     console.log('Database connected');
        // }).catch (err => {
        //     console.log(err);
        // })

        try {
            const dbServer = await mongodb.MongoClient.connect(url);
            const initUsers: IUser [] = [
                { htlid: 'sx', surname: 'Steiner', firstname: 'Manfred'},
                { htlid: 'kagfam13', surname: 'Kager', firstname: 'Fabian'},
                { htlid: 'finmam13', surname: 'Fink', firstname: 'Matthias'},
                { htlid: 'frelum13', surname: 'Freyler', firstname: 'Lukas'},
                { htlid: 'kormam13', surname: 'Korosecr', firstname: 'Marian'},
                { htlid: 'harflm13', surname: 'Harrer', firstname: 'Florian'},
                { htlid: 'greflm13', surname: 'Greistorfer', firstname: 'Florian'}
            ];
            const dbUsers = dbServer.db('m13la1');
            const collUsers = await dbUsers.createCollection('users');
            for (const u of initUsers) {
                const dbUser = await collUsers.insert(u);
            }
        } catch (err) {
            console.log(err);
        }
    }

    private static _instance: DbMongoUser;

    public static get Instance(): DbMongoUser {
        if (!DbMongoUser._instance) {
            DbMongoUser._instance = new DbMongoUser;
        }
        return DbMongoUser._instance;
    }


    // *****************************************************

    private constructor () {
    }
    public getUserIds(): string[] {
        return undefined;
    }

    public getUser (id: string): User {
        return undefined;
    }
}
