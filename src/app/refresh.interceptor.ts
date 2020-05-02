import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpUserEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, filter, flatMap, tap} from 'rxjs/operators';
import {HttpService} from './http.service';
import {SecurityService} from './security.service';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor{

  constructor(private security:SecurityService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.includes("oauth")){
      return next.handle(req).pipe(
        catchError((e,c)=>{
          if(e instanceof HttpErrorResponse){
            if(e.status==401) {
              this.security.logout();
              return new Observable<HttpUserEvent<any>>()
            }
            else {
              return c;
            }
          }
        })
      )
    }
    return next.handle(req);
  }
}
