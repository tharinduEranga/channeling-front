class AppointmentsDTO {
    constructor(private appointmentId: number, private date: string, private token_no: number,
                private issue: string, private patient: PatientDTO, private doctor: DoctorDTO) {}
}
