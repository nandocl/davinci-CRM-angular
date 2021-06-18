import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(
    private toast: ToastService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(error => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          this.toast.showMsgError('Error en front');
        } else {
          // Error de backend
          this.toast.showMsgError('Error conectando con backend');
        }        
        return throwError(errorMessage);
      })
    );
  }

}
