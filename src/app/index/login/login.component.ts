import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { AdalService } from 'ng2-adal/dist/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Http, Headers} from '@angular/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users;
  email;
  pass;
  flag=0;
  status="";
  userMid;
  reqBody;
  constructor(private http:Http, private _dataservice:DataService, private router:Router, private parser:ActivatedRoute, private adal: AdalService){

    //this.adal.handleWindowCallback();
    //this.adal.getUser();
   
}

 ngOnInit() {

    // Handle callback if this is a redirect from Azure
    
    // Check if the user is authenticated. If not, call the login() method
    if (!this.adal.userInfo.isAuthenticated) {
      this.adal.login();
    }
    if(this.adal.userInfo.isAuthenticated){
        this.router.navigate(['user']);
    }
  }

}



