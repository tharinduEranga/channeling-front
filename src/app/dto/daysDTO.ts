class DaysDTO {
    constructor (private _dayId: number, private _day: string, private _from: string, private _to: string) {
    }

    get dayId(): number {
        return this._dayId;
    }

    set dayId(value: number) {
        this._dayId = value;
    }

    get day(): string {
        return this._day;
    }

    set day(value: string) {
        this._day = value;
    }

    get from(): string {
        return this._from;
    }

    set from(value: string) {
        this._from = value;
    }

    get to(): string {
        return this._to;
    }

    set to(value: string) {
        this._to = value;
    }
}