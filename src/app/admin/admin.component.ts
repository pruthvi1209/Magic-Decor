import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AdalService } from 'ng2-adal/dist/core';
import { AuthGuard } from '../auth.guard';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  adminName;
  dp;
  name;
  constructor(private router: Router, private adal: AdalService, private guard: AuthGuard) { 
    if(!this.adal.userInfo.isAuthenticated){
      this.router.navigate(['']);
    }
    else{
      this.adminName = this.adal.userInfo.userName;
      this.dp = this.adminName.toLowerCase().substring(0,8);
      this.name = this.adal.userInfo.profile.name;
    }
   }

  logout(){
    this.adal.logOut();
  }

  ngOnInit() {
  }
  
}
