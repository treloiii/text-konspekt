import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {NgForm} from '@angular/forms';
import {SecurityService} from '../security.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status=""
  constructor(private security:SecurityService,private router:Router) {
    if(this.security.checkAccess(false))
      router.navigate(['/generate']);
  }

  ngOnInit(): void {
  }
  async login(form:NgForm){
    let email=form.form.value.email;
    let password=form.form.value.password;
    let data:FormData=new FormData();
    data.append("username",email);
    data.append("password",password);
    data.append("grant_type","password");
    this.security.saveAccessToken(data).then(
      resolve=>{this.status=""},
      reject=>{
        if(reject==400){
          this.status="Неверный логин или пароль"
        }
        else{
          this.status="Неизвестная ошибка:("
          console.log("unknown")
        }
      }
    )
  }

}
