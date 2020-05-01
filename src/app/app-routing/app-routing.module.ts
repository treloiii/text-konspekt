import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from '../main/main.component';
import {LoginComponent} from '../login/login.component';
import {SignupComponent} from '../signup/signup.component';
import {GenerateComponent} from '../generate/generate.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:SignupComponent
  },
  {
    path:'generate',
    component:GenerateComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
