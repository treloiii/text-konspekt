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
  private tokenURL:string="http://localhost:8080/oauth/token";

  public getOAuth2Token(data){
    return this.http.post(this.tokenURL,data,this.tokenOptions).toPromise();
  }
}
