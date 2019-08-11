class CommonResponse <T> {
    constructor (private _success: boolean, private _body: T, private _message: string) {
    }

    get success(): boolean {
        return this._success;
    }

    set success(value: boolean) {
        this._success = value;
    }

    get body(): T {
        return this._body;
    }

    set body(value: T) {
        this._body = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }
}
