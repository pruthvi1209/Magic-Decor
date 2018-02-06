import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdalService } from 'ng2-adal/dist/core'

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  repo;
  username;
  constructor(private _dataservice:DataService, private arouter:ActivatedRoute, private router:Router, private adal: AdalService) { 
  this._dataservice.getLayout()
  .subscribe(res => this.repo = res);
 this.username = this.arouter.snapshot.paramMap.get('id');
 
    
 }

  ngOnInit() {
  }
  
}
