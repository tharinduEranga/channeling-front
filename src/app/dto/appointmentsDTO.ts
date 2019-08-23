class AppointmentsDTO {
    constructor(private _appointmentId: number, private _date: string, private _token_no: number,
                private _issue: string, private _patient: PatientDTO, private _doctor: DoctorDTO) {}

    get appointmentId(): number {
        return this._appointmentId;
    }

    set appointmentId(value: number) {
        this._appointmentId = value;
    }

    get date(): string {
        return this._date;
    }

    set date(value: string) {
        this._date = value;
    }

    get token_no(): number {
        return this._token_no;
    }

    set token_no(value: number) {
        this._token_no = value;
    }

    get issue(): string {
        return this._issue;
    }

    set issue(value: string) {
        this._issue = value;
    }

    get patient(): PatientDTO {
        return this._patient;
    }

    set patient(value: PatientDTO) {
        this._patient = value;
    }

    get doctor(): DoctorDTO {
        return this._doctor;
    }

    set doctor(value: DoctorDTO) {
        this._doctor = value;
    }
}
