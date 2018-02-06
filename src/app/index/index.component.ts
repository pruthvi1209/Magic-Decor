import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
scrollTop;
  constructor(private router: Router) {
    window.addEventListener("scroll",()=>{
      let body = document.body;
      let docElem = document.documentElement;
      this.scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop; 
      if(document.getElementById("main_menu")!=null)
      if (this.scrollTop > 100) 
        document.getElementById("main_menu").classList.add("menu-scroll");
      else 
        document.getElementById("main_menu").classList.remove("menu-scroll");
    })

   }


  close(){
    if(document.getElementById("bs-example-navbar-collapse-1").className=="navbar-collapse collapse in")
    document.getElementById("menu").click();
  }

  gotologin(){
    this.router.navigate(['loginhome']);
  }
  ngOnInit() {
  }

}
