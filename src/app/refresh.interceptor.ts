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
              console.log(e)
              if(e.error.error_description=="No value present"){
                return next.handle(req)
              }
              else{
                this.security.logout();
                return new Observable<HttpUserEvent<any>>()
              }
            }
            else {
              return next.handle(req);
            }
          }
        })
      )
    }
    return next.handle(req);
  }
}
