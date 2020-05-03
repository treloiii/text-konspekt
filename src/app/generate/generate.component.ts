import { Component, OnInit } from '@angular/core';
import {SecurityService} from '../security.service';
import {HttpService} from '../http.service';
import {NgForm} from '@angular/forms';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {
  user;
  labels=[
    {
      label:"Угол наклона текста",
      value:0,
      name:"angle",
      type:"number",
      tip:"Угол наклона текст, для выравнивания по клеткам."
    },
    {
      label:"Цвет текста",
      value:"#111c38",
      name:"color",
      type:"color",
      tip:"Цвет текста который будет на листе."
    },
    {
      label:"Смещение по оси Х",
      value:0,
      name:"deltaX",
      type:"number",
      tip:"Значение для смещения вправо от правого края листа."
    },
    {
      label:"Смещение по оси Y",
      value:80,
      name:"deltaY",
      type:"number",
      tip:"Отступ от верхнего края листа"
    },
    {
      label:"Размер шрифта",
      value:32,
      name:"fontSize",
      type:"number",
      tip:"Размер шрифта. Для каждого шрифта разный."
    },
    {
      label:"Междустрочный интервал",
      value:20,
      name:"interval",
      type:"number",
      tip:"Интервал между строками, чем больше значение тем интервал меньше"
    },
    {
      label:"Количество дополнительных строк",
      value:0,
      name:"additionLines",
      type:"number",
      tip:"Количество строк которые будут добавлены дополнительно к тексту на каждом листе"
    }
  ]
  result:any=[];
  loading: boolean=false;
  constructor(private security:SecurityService,private http:HttpService,private _snackBar: MatSnackBar) {
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
  private myAlert(text:string){
    let config=new MatSnackBarConfig();
    config.duration=2000;
    config.verticalPosition="top";
    config.panelClass="snack-back";
    this._snackBar.open(text,"",config);
  }

  async fontLoad(files:FileList) {
    let file=files.item(0);
    console.log(file)
    if(!file.name.endsWith(".ttf"))
      this.myAlert("Поддерживаемый формат ttf")
    else{
      //...upload to server
      let data:FormData=new FormData();
      data.append("file",file);
      data.append("id",this.user.id);
      let res=await this.http.uploadFont(data);
      if(res==="success")
        this.myAlert("Шрифт успешно загружен")
      else
        this.myAlert("Произошла ошибка")
    }
  }

  async backLoad(files: FileList) {
    let file=files.item(0);
    console.log(file)
    if(!file.name.endsWith(".jpg")&&!file.name.endsWith(".jpeg"))
      this.myAlert("Поддерживаемый формат jpg/jpeg")
    else{
      //...upload to server
      let data:FormData=new FormData();
      data.append("file",file);
      data.append("id",this.user.id);
      let res=await this.http.uploadBackground(data);
      if(res==="success")
        this.myAlert("Задний фон успешно загружен")
      else
        this.myAlert("Произошла ошибка")
    }
  }

  async textLoad(files: FileList) {
    let file=files.item(0);
    console.log(file)
    if(!file.name.endsWith(".txt"))
      this.myAlert("Поддерживаемый формат txt")
    else{
      //...upload to server
      let data:FormData=new FormData();
      data.append("file",file);
      data.append("id",this.user.id);
      let res=await this.http.uploadText(data);
      if(res==="success")
        this.myAlert("Текст успешно загружен")
      else
        this.myAlert("Произошла ошибка")
    }
  }

  async generate(genForm: NgForm) {
    this.result=[];
    this.loading=true;
    console.log(genForm.form);
    let data:FormData=new FormData();
    this.labels.forEach((label)=>{
      data.append(label.name,genForm.value[label.name]);
    });
    let res:any=await this.http.generate(data,this.user.id);

    // this.result=res;
    this.result=res?.map(url=>{
      return "http://"+url;
    });
    this.loading=false
    console.log(this.result);
  }

  checkval($event: Event) {
    console.log($event);
  }
}
