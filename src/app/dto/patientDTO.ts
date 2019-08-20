class PatientDTO {
    constructor(private _patientId: number, private _name: string, private _age: number,
                private _tel: string, private _address: string) {}


    get patientId(): number {
        return this._patientId;
    }

    set patientId(value: number) {
        this._patientId = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        this._age = value;
    }

    get tel(): string {
        return this._tel;
    }

    set tel(value: string) {
        this._tel = value;
    }

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }
}
