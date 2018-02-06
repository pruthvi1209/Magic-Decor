import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  datalen;
  data;
  counter=0;
  count=0;
  constructor(private user:DataService) { }
  ngOnInit() {
    this.user.getUsers()
    .subscribe(res=>{
          this.datalen=res.length;
          this.data=res;
    })
  }
}
