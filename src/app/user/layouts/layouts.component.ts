import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {
  category;
  layouts;
  ob;
  count=0;
  constructor(private _dataservice: DataService, arouter: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService) {
    this.spinnerService.show();
    this.category = arouter.snapshot.paramMap.get('category');
    this._dataservice.getLayout()
      .subscribe((res) => {
        this.spinnerService.hide();
        this.layouts = res;
      })
  }

  
  walls(roomno){
    var right,top,left,floor,covering,opposite;
    this.layouts.forEach(element => {
      if(element.name==roomno)
      {
        this._dataservice.add(element);
      }
    });
}
  ngOnInit() {
  
  }
}
