
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

            if (data.birthday !== undefined) {
                const millis = data.birthday instanceof Date ?
                               data.birthday.getTime() :
                               data.birthday;
                if (isNaN(millis)) {
                    throw new Error('illegal birthday');
                }
                this._birthday = new Date(millis);
            }
            if (Object.keys(this).length !== Object.keys(data).length) {
                throw new Error('invalid attributes');
            }
        } catch (err) {
            console.log(err);
            console.log('invalid IUser');
        }
    }

    public toObject(): IUser {
        const rv: IUser = {
            htlid: this._htlid,
            surname: this._surname,
            firstname: this._firstname
        }
        if (this._birthday) { rv.birthday = this._birthday; }
        if (this._class) { rv.class = this._class; }
        return rv;
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
