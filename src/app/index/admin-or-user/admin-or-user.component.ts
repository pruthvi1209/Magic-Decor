import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../auth.guard';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AdalService } from 'ng2-adal/dist/services';

@Component({
  selector: 'app-admin-or-user',
  templateUrl: './admin-or-user.component.html',
  styleUrls: ['./admin-or-user.component.css']
})
export class AdminOrUserComponent implements OnInit {
  userMid;
  reqBody;
  constructor(private http:Http, private guard: AuthGuard, private router: Router,private adal: AdalService) {

   }
   redirectto(userType){
    this.guard.userType = userType;
    if(userType == 'user'){
      this.router.navigate(['user'])
    }
    else{
      this.router.navigate(['admin'])      
    }

   }

  ngOnInit() {

  }

}
