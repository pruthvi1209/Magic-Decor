import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdalService } from 'ng2-adal/dist/core';
import { AuthGuard } from '../../auth.guard';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

 constructor(private router: Router, private adal: AdalService, private guard: AuthGuard) { 
    if(this.adal.userInfo.userName == "M1043212@mindtree.com" || this.adal.userInfo.userName == "M1043131@mindtree.com" || this.adal.userInfo.userName == "M1042932@mindtree.com" ||this.adal.userInfo.userName == "M1043150@mindtree.com" || this.adal.userInfo.userName == "M1043148@mindtree.com"){
     // this.guard.isAuthorized = true;
     router.navigate(['aou'])
    }
    else{
     // this.guard.isAuthorized = true;
      this.guard.userType = "user";
      this.router.navigate(['user']);
    }

 }
  ngOnInit() {
  }

}
