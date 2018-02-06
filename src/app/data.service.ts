import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Location } from '@angular/common';
import { Router } from '@angular/router'; 
import { AdalService } from 'ng2-adal/dist/core';

declare var THREE: any;
let headers = new Headers();
headers.append('content-type','application/json');
headers.append('authorization',localStorage.getItem('token'));
@Injectable()
export class DataService {
  isloading:boolean=true;
  result;
  repo;
  projects;
  yourProjects:any[]=[];
  username;
  walls;
  layout;
  roomName;
  objects;
  layoutCategory;
  layoutName;
  userMid;
  reqBody;
  constructor(private _http: Http,private router : Router,private adal: AdalService) { 
    this.layoutCategory="Dining Room";
 }

add(roomName)
{
    var right,top,left,floor,covering,opposite;
        right=roomName.sides[0];
        top=roomName.sides[1];
        left=roomName.sides[2];
        floor=roomName.sides[3];
        covering=roomName.sides[4];
        opposite=roomName.sides[5];
        this.roomName=roomName.name;
        this.layoutCategory = roomName.layoutCategory;
     var room=[
        new THREE.MeshBasicMaterial({ map : new THREE.TextureLoader().load(right), side : THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map : new THREE.TextureLoader().load(top), side : THREE.BackSide}),
        new THREE.MeshBasicMaterial({ map : new THREE.TextureLoader().load(left), side : THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map : new THREE.TextureLoader().load(floor), side : THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map : new THREE.TextureLoader().load(covering), side : THREE.BackSide}),
        new THREE.MeshBasicMaterial({ map : new THREE.TextureLoader().load(opposite), side : THREE.BackSide })        
    ];
     this.walls=room;
     this.isloading=false;
}

getUsers() {
    return this._http.get("https://magicdecorapi.azurewebsites.net/api/users")
      .map(result => this.result = result.json().data);
  }


getLayout() {
   console.log(headers);
    return this._http.get("https://magicdecorapi.azurewebsites.net/api/layouts")
      .map(result => this.layout = result.json().data)
} 

getProjects() {
    return this._http.get("https://magicdecorapi.azurewebsites.net/api/getProject")
      .map(result => this.layout = result.json().data)
}

saveProject(assets,project,desc,fav,time,preview,user,room) {
 
    const body = {
      name:project,
      desc:desc,
      fav:fav,
      ctime:time,
      preview:preview,
      creator:user,
      roomName:room,
      object:assets,
    }
  return this._http.post("https://magicdecorapi.azurewebsites.net/api/insertProject", body)
     

  }
updateProject(assets,project,desc,fav,time,preview,user,room, objid) {
 
    const body = {
      name:project,
      desc:desc,
      fav:fav,
      ctime:time,
      preview:preview,
      creator:user,
      roomName:room,
      object:assets,
      objid
    }
  return this._http.put("https://magicdecorapi.azurewebsites.net/api/updateProject", body)
     

  }
  findRoom(roomName)
  {   
    this.getLayout().subscribe(res=>{
      res.forEach(element => {
          if(element.name==roomName)
          {
            this.add(element);
            return;
          }      
    });
  })
  
  }
  
  getObjects()
  {
    return this._http.get("https://magicdecorapi.azurewebsites.net/api/getObjects")
    
  }

  getMessages(){
    return this._http.get("https://magicdecorapi.azurewebsites.net/api/getmsg")
  }

  getReplies(){
    return this._http.get("https://magicdecorapi.azurewebsites.net/api/getreply")
  }

  loggedIn(){
            var re = new RegExp("^/user(.)*$");
            var adminre = new RegExp("^/admin(.)*$");
            var home = new RegExp("^/$");
            if(re.test(this.router.url)&& this.adal.userInfo.isAuthenticated)
              return 'user';
            else if(adminre.test(this.router.url) && this.adal.userInfo.isAuthenticated)
               return 'admin';
          return false;
  }

}
