class HospitalDTO {
    constructor (private _hospitalId: number, private _hospitalName: string) {}

    get hospitalId(): number {
        return this._hospitalId;
    }

    set hospitalId(value: number) {
        this._hospitalId = value;
    }

    get hospitalName(): string {
        return this._hospitalName;
    }

    set hospitalName(value: string) {
        this._hospitalName = value;
    }
}
