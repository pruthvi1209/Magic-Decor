import { Component, OnInit } from '@angular/core';
import { last } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-upload-items',
  templateUrl: './upload-items.component.html',
  styleUrls: ['./upload-items.component.css']
})
export class UploadItemsComponent implements OnInit {
  categories=[];
  constructor() { }

  ngOnInit() {
  }

  exefunction(){
    var lfckv = <any>document.getElementsByClassName("form-check-input");
    for (let index = 0; index < lfckv.length; index++)
      if(lfckv[index].checked)
        this.categories.push(lfckv[index].value);
    let inp=<any>document.getElementById("category");
    inp.value=this.categories;
  }

}
