import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isFormSend=false;
  error="";
  success="";
  constructor(private http:HttpService) { }

  ngOnInit(): void {
  }

  async register(form: NgForm) {
    let email=form.form.value.email;
    let password=form.form.value.password;
    let name=form.form.value.nickname;
    let data:FormData=new FormData();
    data.append("username",name);
    data.append("password",password);
    data.append("email",email);
    let res=await this.http.register(data);
    if(res!=="exists"){
      this.error="";
      this.isFormSend=true;
      this.success=res;
    }
    else{
      this.error="Пользователь с таким email уже существует."
    }
    console.log(res);
  }
}
