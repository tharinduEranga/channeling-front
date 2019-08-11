class SpecialityDTO {
    constructor (public _specialityId: number, public _specialityName: string) {}

    get specialityId(): number {
        return this._specialityId;
    }

    set specialityId(value: number) {
        this._specialityId = value;
    }

    get specialityName(): string {
        return this._specialityName;
    }

    set specialityName(value: string) {
        this._specialityName = value;
    }
}
