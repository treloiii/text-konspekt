import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private http:HttpClient;

  constructor(http:HttpClient) {
    this.http=http;
  }
  getAccesTokenByPasswordHeaders:HttpHeaders=new HttpHeaders({
    'Authorization':'Basic dGV4dC13cml0ZXI6a29uc3Bla3Qtc2VjcmV0'
  });
  tokenOptions={headers:this.getAccesTokenByPasswordHeaders};
  // private tokenURL:string="http://localhost:8080/oauth/token";
  // private registerURL:string="http://localhost:8080/register/";
  // private baseURL:string="http://localhost:8080/api";
  // private uploadURL:string="http://localhost:8080/attach";
  private tokenURL:string="http://trelloiii.site/oauth/token";
  private registerURL:string="http://trelloiii.site/register/";
  private baseURL:string="http://trelloiii.site/api";
  private uploadURL:string="http://trelloiii.site/attach";

  public getOAuth2Token(data){
    return this.http.post(this.tokenURL,data,this.tokenOptions);
  }
  public register(data){
    return this.http.post(this.registerURL,data,{responseType:"text"}).toPromise();
  }
  public test(){
    return this.http.get(this.baseURL+"/admin/user",{responseType:"text"}).toPromise();
  }
  public getUsername(data:string){
    return this.http.get(this.baseURL+`/username?mail=${data}`).toPromise();
  }
  public uploadFont(data){
    return this.http.post(this.uploadURL+`/file/font`,data,{responseType:"text"}).toPromise();
  }
  public uploadBackground(data){
    return this.http.post(this.uploadURL+`/file/background`,data,{responseType:"text"}).toPromise();
  }

  public uploadText(data) {
    return this.http.post(this.uploadURL+`/file/file`,data,{responseType:"text"}).toPromise();
  }
  public generate(data,id:number){
    return this.http.post(this.baseURL+`/create/${id}`,data).toPromise();
  }
}
