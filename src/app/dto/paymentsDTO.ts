class PaymentsDTO {
    public constructor(private _paymentId: number, private _date: string, private _amount: number,
                       private _patient: PatientDTO, private _payMedDTOs: PayMedDTO[]) {}

    get paymentId(): number {
        return this._paymentId;
    }

    set paymentId(value: number) {
        this._paymentId = value;
    }

    get date(): string {
        return this._date;
    }

    set date(value: string) {
        this._date = value;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(value: number) {
        this._amount = value;
    }

    get patient(): PatientDTO {
        return this._patient;
    }

    set patient(value: PatientDTO) {
        this._patient = value;
    }

    get payMedDTOs(): PayMedDTO[] {
        return this._payMedDTOs;
    }

    set payMedDTOs(value: PayMedDTO[]) {
        this._payMedDTOs = value;
    }
}
