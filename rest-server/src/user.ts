
export interface IUser {
    htlid: string;
    surname: string;
    firstname: string;
    class?: string;
    birthday?: Date | number;
}

export class User implements IUser {
    private _htlid: string;
    private _surname: string;
    private _firstname: string;
    private _class?: string;
    private _birthday?: Date;

    constructor (data: IUser) {
        try {
            if (!data.htlid || typeof data.htlid !== 'string') {
                throw new Error('invalid/missing htlid');
            }
            this._htlid = data.htlid

            if (!data.surname || typeof data.surname !== 'string') {
                throw new Error('invalid/missing surname');
            }
            this._surname = data.surname;

            if (!data.firstname || typeof data.firstname !== 'string') {
                throw new Error('invalid/missing firstname');
            }
            this._firstname = data.firstname;

            if (data.class !== undefined ) {
                if (!data.class || typeof data.class !== 'string') {
                    throw new Error('invalid class');
                }
                this._class = data.class;
            }
            if (!data.htlid || typeof data.htlid !== 'string') {
                throw new Error('invalid/missing surname');
            }

            if (data.birthday !== undefined) {
                43                 const millis = data.birthday instanceof Date ?
                44                                data.birthday.getTime() :
                45                                data.birthday;
                46                 if (isNaN(millis)) { 
                47                     throw new Error('illegal birthdate');
                48                 }
                49                 this._birthdate = new Date(millis);
                50             }
                51             if (Object.keys(this).length !== Object.keys(data).length) {
                52                 throw new Error('invalid attributes');
                53             }


            
        } catch (err) {
            console.log(err);
            console.log('invalid IUser');
        }
    }

    public get htlid (): string {
        return this._htlid;
    }

    public get surname (): string {
        return this._surname;
    }
    public get firstname (): string {
        return this._firstname;
    }
    public get class (): string {
        return this._class;
    }
    public get birthday (): Date {
        return this._birthday;
    }

}