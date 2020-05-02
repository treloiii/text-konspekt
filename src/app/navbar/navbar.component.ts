import { Component, OnInit } from '@angular/core';
import {SecurityService} from '../security.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  login:boolean=false;
  constructor(private security:SecurityService) {

  }

  ngOnInit(): void {
    this.login=this.security.getAccess()!=null;
  }

  logout() {
    this.security.logout();
  }
}
