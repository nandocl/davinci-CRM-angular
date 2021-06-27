import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
      catchError(errorInfo => {
        if(errorInfo.status == 500){
            this.toast.showMsgError('Error con backend');
        }else if(errorInfo.status == 404){
          this.toast.showMsgError(errorInfo.error['msg']);
        }      
        return throwError('Error');
      })
    );
  }

}
