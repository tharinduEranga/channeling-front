export class MedicineDTO {
    constructor(private _medicineId: number, private _medicineName: string, private _price: number, private _qty: number,
                private _brand: BrandsDTO) {}


    get medicineId(): number {
        return this._medicineId;
    }

    set medicineId(value: number) {
        this._medicineId = value;
    }

    get medicineName(): string {
        return this._medicineName;
    }

    set medicineName(value: string) {
        this._medicineName = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get qty(): number {
        return this._qty;
    }

    set qty(value: number) {
        this._qty = value;
    }

    get brand(): BrandsDTO {
        return this._brand;
    }

    set brand(value: BrandsDTO) {
        this._brand = value;
    }
}