import {ErrorHandler} from '@angular/core';
import Swal from 'sweetalert2';

export class ErrorHandleChennel  implements ErrorHandler {
    handleError(error: any): void {
        Swal.fire('Oops', 'Something went wrong!', 'error').catch();
    }
}
