import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AdalService } from "ng2-adal/dist/core";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLoggedIn(){
    return this.loginService.loggedIn();
  }

  logout(){
    localStorage.removeItem("token");
    this.adal.logOut();
  }
  constructor(private loginService:DataService, private adal: AdalService) { }

  ngOnInit() {
  }

  startAnimation(){
    document.getElementsByClassName("content-wrapper")[0].setAttribute("class","content-wrapper animated slideInLeft");
    window.setTimeout( function(){
      document.getElementsByClassName("content-wrapper")[0].setAttribute("class","content-wrapper animated ");
  }, 1000);
  }

  closeNav(){ 
    if(document.getElementById("bs-example-navbar-collapse-1").className=="navbar-collapse collapse in")
    document.getElementById("ham").click();
   };

   closeSideNav(){
     let x=document.getElementById("container");
     if(x.className=="sidebar-closed")
     x.setAttribute("class","");
    else
     x.setAttribute("class","sidebar-closed");
   }
  
}
