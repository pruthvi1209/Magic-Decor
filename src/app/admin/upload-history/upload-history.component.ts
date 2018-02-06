import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-upload-history',
  templateUrl: './upload-history.component.html',
  styleUrls: ['./upload-history.component.css']
})
export class UploadHistoryComponent implements OnInit {
a_objects;
lay;
lr = 0;
searchtxt;
displayLayouts = '';
displayObjects;
filter: boolean = false;
  constructor(private obj:DataService,private _dataservice: DataService) { 

    this.obj.getObjects()
			.subscribe(res => {
				this.a_objects = res.json().data;
			})
  }
  search(category, type){
    console.log("category: ", category);
    console.log("type: ", type);
    if(this.searchtxt==""){
      this.filter = false;
    }
    else{
    this.filter = true;
    if(type == 'layout'){
      this.displayLayouts = this.lay.filter((elem)=>{
        console.log("filter: ", elem.name);
        console.log("filter: ", this.searchtxt);
        return elem.name.toUpperCase().match(this.searchtxt.toUpperCase());
      })
      console.log("filter: ", this.displayLayouts);
    }
    if(type == 'object'){
      this.displayObjects = this.a_objects.filter((elem)=>{
        return elem.name.toUpperCase().match(this.searchtxt.toUpperCase());
      })
    }
    }
  }
  ngOnInit() {

  this._dataservice.getLayout()
      .subscribe((res) => {
        this.lay = res;
      })
}
}