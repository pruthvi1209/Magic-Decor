import { Component } from '@angular/core';
import { AdalService } from 'ng2-adal/dist/core';

const config = {                                        // <-- ADD
    tenant: '85c997b9-f494-46b3-a11d-772983cf6f11',     // <-- ADD
    clientId: '3affe17f-8a71-4a14-9f55-058b5e794207',
  // redirectUri: window.location.origin + '/user',
      postLogoutRedirectUri: window.location.origin + ''
}   


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private adal: AdalService){
    this.adal.init(config);
    window.onload=this.startAnimation;
  }
  ngOnInit(){
    this.adal.handleWindowCallback();
    this.adal.getUser();
  }

  startAnimation(){
    document.getElementsByClassName("page-wrapper")[0].setAttribute("class","page-wrapper animated fadeInDown");
    window.setTimeout( function(){
      document.getElementsByClassName("page-wrapper")[0].setAttribute("class","page-wrapper animated ");
  }, 1000);
  }

  
}
