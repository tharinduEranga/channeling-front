class MonthWiseApintmnts {
    public constructor(private _count: number, private _month: string) {
    }

    get count(): number {
        return this._count;
    }

    set count(value: number) {
        this._count = value;
    }

    get month(): string {
        return this._month;
    }

    set month(value: string) {
        this._month = value;
    }
}