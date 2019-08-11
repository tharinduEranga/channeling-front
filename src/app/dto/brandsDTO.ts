class BrandsDTO {
    constructor (private _brandId: number, private _brandName: string) {}

    get brandId(): number {
        return this._brandId;
    }

    set brandId(value: number) {
        this._brandId = value;
    }

    get brandName(): string {
        return this._brandName;
    }

    set brandName(value: string) {
        this._brandName = value;
    }
}
