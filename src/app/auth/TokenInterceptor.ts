import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/retry'
import {retry} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${'this.auth.getToken()'}`
            }
        });
        return next.handle(request).map(response => {
            // clone the request as if you can modify it, otherwise can send same request
            return response;
        }).catch(err => {
            console.log(err);
            if (err instanceof HttpErrorResponse && err.status === 401) {
                const newReq = request.clone();
                return next.handle(newReq).pipe(retry(3));
            }
        });
    }
}
