class AdminDTO {
    constructor(private _adminId: number, private _userName: string, private _password: string, private _roles: string) {}

    get adminId(): number {
        return this._adminId;
    }

    set adminId(value: number) {
        this._adminId = value;
    }

    get userName(): string {
        return this._userName;
    }

    set userName(value: string) {
        this._userName = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get roles(): string {
        return this._roles;
    }

    set roles(value: string) {
        this._roles = value;
    }
}
