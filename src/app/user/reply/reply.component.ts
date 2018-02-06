import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { AdalService } from 'ng2-adal/dist/core';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  replies;
  currentuser;
  constructor(private service: DataService, private adal: AdalService) {
    this.currentuser = this.adal.userInfo.userName;
    this.service.getReplies()
    .subscribe((res)=>{
        this.replies = res.json().data;
    })
   }

  ngOnInit() {
  }

}
