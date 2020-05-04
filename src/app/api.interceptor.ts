import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {from, Observable, throwError} from 'rxjs';
import {SecurityService} from './security.service';
import {Injectable} from '@angular/core';
import {filter, tap, catchError, flatMap, switchMap} from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor{

  constructor(private security:SecurityService) {
  }

  private setHeader(req:HttpRequest<any>){
    const authReq=req.clone({
      setHeaders:{
        "Authorization":"bearer "+this.security.getAccess()
      }
    });
    return authReq;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.includes("api")){

      return next.handle(this.setHeader(req)).pipe(
          catchError((err,caught)=>{
            if(err instanceof HttpErrorResponse){
              if(err.status==401) {
                let obs=this.security.refreshToken();
                return obs.pipe(switchMap((data:any)=>{
                    localStorage.setItem("access", data.access_token);
                    localStorage.setItem("refresh", data.refresh_token);
                    return next.handle(this.setHeader(req));
                  })
                );
              }else{
                return throwError(err);
              }
            }
            else{
              return next.handle(this.setHeader(req));
            }
          }
        )
      );
    }
    else{
      return next.handle(req);
    }
  }
}
