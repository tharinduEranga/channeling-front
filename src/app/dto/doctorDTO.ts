class DoctorDTO {
    constructor (private _doctorId: number, private _name: string, private _address: string, private _tel: string,
                 private _speciality: SpecialityDTO, private _hospital: HospitalDTO) {
    }

    get doctorId(): number {
        return this._doctorId;
    }

    set doctorId(value: number) {
        this._doctorId = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }

    get tel(): string {
        return this._tel;
    }

    set tel(value: string) {
        this._tel = value;
    }

    get speciality(): SpecialityDTO {
        return this._speciality;
    }

    set speciality(value: SpecialityDTO) {
        this._speciality = value;
    }

    get hospital(): HospitalDTO {
        return this._hospital;
    }

    set hospital(value: HospitalDTO) {
        this._hospital = value;
    }
}
