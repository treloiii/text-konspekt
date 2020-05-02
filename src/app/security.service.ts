import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  public login:boolean=false;
  constructor(private http:HttpService,private router:Router) {
  }
  // access_token: "958949c8-d674-48db-8eb0-1ce5adcd2c5c"
  // token_type: "bearer"
  // refresh_token: "bbce5c55-f100-4831-a4a0-bc8265d80e6c"
  // expires_in: 14
  // scope: "read write trust"

  public async saveAccessToken(data:FormData){
    return new Promise((resolved,rejected)=> {
      this.http.getOAuth2Token(data).toPromise().then(
        (resolve: any) => {
          localStorage.setItem("access", resolve.access_token);
          localStorage.setItem("refresh", resolve.refresh_token);
          this.login=true;
          console.log(this.login)
          this.router.navigate(['/generate'])
          resolved(200)
        },
        (reject: any) => {
          if (reject.status == 400) {
            rejected(400)
          }
          rejected(-1)
        });
    });
  }
  public refreshToken(){
      let refresh=this.getRefresh();
      let grant="refresh_token"
      let data:FormData=new FormData();
      data.append("grant_type",grant);
      data.append("refresh_token",refresh);
      return this.http.getOAuth2Token(data);
  }

  public getAccess(){
    return localStorage.getItem("access");
  }
  public getRefresh(){
    return localStorage.getItem("refresh")
  }

  public checkAccess(navigate:boolean){
    if(localStorage.getItem("access")==null){
      if(navigate)
        this.router.navigate(['/login'])
      return false;
    }
    else{
      return true;
    }
  }
  public logout(){
    localStorage.clear();
    this.login=false;
    this.router.navigate(['/login']);
  }
}
