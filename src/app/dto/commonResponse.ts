class CommonResponse <T> {
    constructor (public success: boolean, public body: T, public message: string) {
    }
}
