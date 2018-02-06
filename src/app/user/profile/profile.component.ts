import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { AdalService } from 'ng2-adal/dist/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userimg;
  messages;
  messagesLength =0;
  replies;
  rep;
  repliesLength = 0;
  sessionusername = this.adal.userInfo.userName;
  myprojects=[];
  photoname=(this.sessionusername.toLowerCase()).substring(0,8);
  name= this.adal.userInfo.profile.name;
  chats;

  ngOnDestroy(){
    
  }
  
  constructor(private router: ActivatedRoute, private service: DataService, private router2: Router ,private _http: Http, private adal: AdalService,private spinnerService: Ng4LoadingSpinnerService ) {
    this.sessionusername = this.adal.userInfo.userName;
    console.log("sessionusername", this.sessionusername);
    this._http.get("https://magicdecorapi.azurewebsites.net/api/getChats")
    .subscribe((res)=>{
        this.chats = res.json().data;
    })

}

    ngOnInit() {
    // this.service.getMessages()
    //   .subscribe((res)=>{
    //       this.messages = res.json().data;
    //       this.messages.forEach((elem)=>{
    //     console.log(elem.sender);
    //     if(elem.sender == localStorage.getItem("currentuser")){
    //       this.messagesLength++;
    //     }
    //   })
    //  })
    //  this.service.getReplies()
    // .subscribe((res)=>{     
    //     this.replies = res.json().data;
    //     this.replies.forEach((elem)=>{
    //       if(elem.to == localStorage.getItem("currentuser")){
    //         this.repliesLength++;
    //       }
    //     })
    // })
     this.pullProject(this.sessionusername);
     document.getElementById("following").click();
  }


  pullProject(currentuser) {  
    this.spinnerService.show();
    this._http.get(`https://magicdecorapi.azurewebsites.net/api/getUserProject/${currentuser}`)
   .subscribe((res)=>{
     this.myprojects = res.json().data.filter( function(project){ return project});
     console.log(this.myprojects);
     this.spinnerService.hide();
   })
  }
openProject(objid)
{
this.router2.navigate(['user/canvas',objid]);
}

  }
