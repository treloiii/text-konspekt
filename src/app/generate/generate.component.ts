import { Component, OnInit } from '@angular/core';
import {SecurityService} from '../security.service';
import {HttpService} from '../http.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {
  private user;
  private labels=[
    {
      label:"Угол наклона текста",
      value:0,
      name:"angle",
      type:"number"
    },
    {
      label:"Цвет текста",
      value:"000255",
      name:"color",
      type:"text"
    },
    {
      label:"Смещение по оси Х",
      value:0,
      name:"deltaX",
      type:"number"
    },
    {
      label:"Смещение по оси Y",
      value:80,
      name:"deltaY",
      type:"number"
    },
    {
      label:"Размер шрифта",
      value:32,
      name:"fontSize",
      type:"number"
    },
    {
      label:"Междустрочный интервал",
      value:20,
      name:"interval",
      type:"number"
    },
    {
      label:"Количество дополнительных строк",
      value:0,
      name:"additionLines",
      type:"number"
    }
  ]
  private result:any=[];
  constructor(private security:SecurityService,private http:HttpService) {
    this.security.checkAccess(true);
  }

  ngOnInit(): void {
    this.getUser();
  }

  async check() {
    let res=await this.http.test();
    console.log(res);
  }
  async getUser(){
    this.user= await this.http.getUsername(localStorage.getItem("email"));
    console.log(this.user)
  }

  async fontLoad(files:FileList) {
    let file=files.item(0);
    console.log(file)
    if(!file.name.endsWith(".ttf"))
      alert("Поддерживаемый формат ttf")
    else{
      //...upload to server
      let data:FormData=new FormData();
      data.append("file",file);
      data.append("id",this.user.id);
      let res=await this.http.uploadFont(data);
      if(res==="success")
        alert("Шрифт успешно загружен")
      else
        alert("Произошла ошибка")
    }
  }

  async backLoad(files: FileList) {
    let file=files.item(0);
    console.log(file)
    if(!file.name.endsWith(".jpg")&&!file.name.endsWith(".jpeg"))
      alert("Поддерживаемый формат jpg/jpeg")
    else{
      //...upload to server
      let data:FormData=new FormData();
      data.append("file",file);
      data.append("id",this.user.id);
      let res=await this.http.uploadBackground(data);
      if(res==="success")
        alert("Задний фон успешно загружен")
      else
        alert("Произошла ошибка")
    }
  }

  async textLoad(files: FileList) {
    let file=files.item(0);
    console.log(file)
    if(!file.name.endsWith(".txt"))
      alert("Поддерживаемый формат txt")
    else{
      //...upload to server
      let data:FormData=new FormData();
      data.append("file",file);
      data.append("id",this.user.id);
      let res=await this.http.uploadText(data);
      if(res==="success")
        alert("Текст успешно загружен")
      else
        alert("Произошла ошибка")
    }
  }

  async generate(genForm: NgForm) {
    console.log(genForm.form);
    let data:FormData=new FormData();
    this.labels.forEach((label)=>{
      data.append(label.name,genForm.value[label.name]);
    });
    let res=await this.http.generate(data,this.user.id);

    // this.result=res;
    this.result=res?.map(url=>{
      return "http://"+url;
    })
    console.log(this.result);
  }
}
