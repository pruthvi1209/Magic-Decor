import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Routes,RouterModule, Router, ActivatedRoute,CanDeactivate,ActivatedRouteSnapshot, RouterStateSnapshot
} from "@angular/router";
import { CanvasComponent } from './canvas/canvas.component';
import { AdalService } from 'ng2-adal/dist/core'
import { AuthGuard } from '../auth.guard';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,CanDeactivate<CanvasComponent> {
  loggedinuser;
  canDeactivate(component: CanvasComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return component.canDeactivate() ||window.confirm("Unsaved changes maybe discarded");
  } 
 
  constructor(private router: Router, private adal: AdalService, private guard: AuthGuard){
    if(!this.adal.userInfo.isAuthenticated || this.guard.userType=="admin"){
      this.router.navigate(['']);
    }
    else{
    this.loggedinuser = this.adal.userInfo.userName;
    }
  }
ngOnInit(){
  
}
 logout(){
    this.adal.logOut();
  }

}
