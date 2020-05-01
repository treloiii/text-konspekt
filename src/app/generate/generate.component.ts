import { Component, OnInit } from '@angular/core';
import {SecurityService} from '../security.service';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {

  constructor(private security:SecurityService) {
    this.security.checkAccess(true);
  }

  ngOnInit(): void {
  }

}
