class PayMedDTO {
    public constructor(private _medicineId: number, private _qty: number, private _amount: number) {}

    get medicineId(): number {
        return this._medicineId;
    }

    set medicineId(value: number) {
        this._medicineId = value;
    }

    get qty(): number {
        return this._qty;
    }

    set qty(value: number) {
        this._qty = value;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(value: number) {
        this._amount = value;
    }
}
