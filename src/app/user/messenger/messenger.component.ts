import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import { DataService } from '../../data.service'
import { AdalService } from 'ng2-adal/dist/core';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {

  msgSubject;
  msgBody;
  status = null;
  msgSent;

  constructor(private http:Http, private service:DataService, private adal: AdalService) { }

  sendMsg(){
    this.status=null;
    this.msgSent = true;
    const body = {
      msgSubject:this.msgSubject,
      msgBody:this.msgBody,
      from_id: this.adal.userInfo.userName,
      from: this.adal.userInfo.profile.name,
      to: "admin",
      msgDate:new Date()
    }
  
    this.http.post('https://magicdecorapi.azurewebsites.net/api/sendmsg', body)
    .subscribe((res)=>{
      this.msgSent = true;
        this.status = "Message sent...";
    })
  }


  ngOnInit() {
  }

}
