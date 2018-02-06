import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service'
import { Http } from '@angular/http'
import { AdalService } from 'ng2-adal/dist/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages;
  reply='';
  status;
  constructor(private service:DataService, private http:Http, private adal: AdalService) { }

  Reply(to_name, to_id){
      const reply = {
        to_name:to_name,
        to_id:to_id,
        from:"MagicDecor",
        from_id: this.adal.userInfo.userName,
        reply:this.reply,
        replyDate: new Date().toUTCString()
      }
      this.http.post("https://magicdecorapi.azurewebsites.net/api/reply", reply)
      .subscribe((res)=>{
        this.status = "Reply sent successfully...";
      })
  }
  ngOnInit() {
      this.service.getMessages()
      .subscribe((res)=>{
          this.messages = res.json().data;
      })
  }

}
