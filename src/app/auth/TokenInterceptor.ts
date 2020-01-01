import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/retry'
import {retry} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router, private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return next.handle(request).map(response => {
            // clone the request as if you can modify it, otherwise can send same request
            return response;
        }).catch(err => {
            console.log(err);
            // if (err instanceof HttpErrorResponse && err.status === 401) {
            //     // this.tokenService.getAccessToken().subscribe(value => {localStorage.setItem('token',value.token});
            //     const newReq = request.clone();
            //     return next.handle(newReq).pipe(retry(3));
            // }
            if (err.status === 401) {
                this.router.navigateByUrl('/login');
                const newReq = request.clone();
                return next.handle(newReq).pipe(retry(3));
            }
        });
    }
}
