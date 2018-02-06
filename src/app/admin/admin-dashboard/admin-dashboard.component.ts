import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import 'rxjs/add/operator/map';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  creators=[];
  ob;
  len;
  chart=[];
  chart2=[];
  numuser;
   No_msg;
   No_rep;
   notification:Number = 0;
   layout=[];
  live=0;
  dine=0;
  theater=0;
  study=0;
  bed=0;
  bath=0;
  No_repo;
  numlayout;
  numOb;
  constructor(private repository:DataService, private user:DataService, private msg:DataService, private replies:DataService,private rep:DataService,private objects:DataService) { }

  ngOnInit() {
    this.user.getUsers()
    .subscribe(res=>{
      this.numuser=res.length;
    })

    this.objects.getObjects()
    .subscribe(res=>{
      this.numOb=res.json().data.length;
    })

      this.repository.getProjects()
      .subscribe(res=>{
      this.No_repo=res.length;
      this.creators=res.map(a=>a.creator);
      var counts = {};
      var numU=[];
      var name=[];
      this.creators.forEach(function(x) {
        name.push(x);
      counts[x] = (counts[x] || 0) + 1;
      numU.push(counts[x]);
});

    this.chart=new Chart('user-graph',{
      type:'line',
      data:{
        labels:name,
        datasets:[
          {
                data: (numU),
                label : "First Data Set",
                backgroundColor:"rgba(38,185,154,0.31)",
                borderColor: '#3cba9f',
                pointBorderColor: "rgba(38,185,154,0.7)",
                pointBackgroundColor: "rgba(38,185,154,0.7)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointBorderWidth : 1
          },
          ]
        },
          options: {
            // maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                ticks: {
                  beginAtZero : true,
                  callback: function(value) {if (value % 1 === 0) {return value;}}
                },
                display: true
              }]
            }
          }
        })
    })
      
    this.msg.getMessages()
      .subscribe((res)=>{
        this.No_msg=res.json().data.length;
      })
      this.replies.getReplies()
      .subscribe((res)=>{
        this.No_rep=res.json().data.length;
        this.notification=Math.abs(this.No_msg-this.No_rep);
        console.log(this.notification);
      })
    

  var myColor = ["#39ca74","#e54d42","#f0c330","#3999d8","#35485d","#11485d"];
  this.rep.getLayout()
      .subscribe((res) => {
        res.forEach((b)=>{
              this.layout.push(b.layoutCategory);
              this.numlayout=res.length;
          })
          let i;
          for(i=0; i<this.layout.length;i++)
          {
            if(this.layout[i] == "Living Room")
              this.live++;
              else if(this.layout[i] == "Bathroom")
              this.bath++;
              else if(this.layout[i] == "Bedroom")
              this.bed++;
              else if(this.layout[i] == "Home Theatre")
              this.theater++;
               else if(this.layout[i] == "Dining Room")
              this.dine++;
              else if(this.layout[i] == "Study Room")
              this.study++;
          }
              myData = [this.live,this.dine,this.theater,this.bath,this.bed,this.study];
              plotData();
        
      })

var myData = [2,3,2,3,2,4];


var myLabel = ["Living room","Dinning room","Home theater","Bathroom","Bedroom","Study Room"];

function getTotal(){
  var myTotal = 0;
  for (var j = 0; j < myData.length; j++) {
    myTotal += (typeof myData[j] == 'number') ? myData[j] : 0;
  }
  return myTotal;
}
function plotData() {
  var canvas;
  var ctx;
  var lastend = 0;
  var myTotal = getTotal();
  var doc;
  canvas = document.getElementById("canvas");
  var x = (canvas.width)/2;
  var y = (canvas.height)/2;
  var r = 150;
  
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < myData.length; i++) {
    ctx.fillStyle = myColor[i];
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.arc(x,y,r,lastend,lastend+(Math.PI*2*(myData[i]/myTotal)),false);
    ctx.lineTo(x,y);
    ctx.fill();
    
    // Now the pointers
    ctx.beginPath();
    var start = [];
    var end = [];
    var last = 0;
    var flip = 0;
    var textOffset = 0;
    var precentage = (myData[i]/myTotal)*100;
    start = getPoint(x,y,r-20,(lastend+(Math.PI*2*(myData[i]/myTotal))/2));
    end = getPoint(x,y,r+20,(lastend+(Math.PI*2*(myData[i]/myTotal))/2));
    if(start[0] <= x)
    {
      flip = -1;
      textOffset = -110;
    }
    else
    {
      flip = 1;
      textOffset = 10;
    }
    ctx.moveTo(start[0],start[1]);
    ctx.lineTo(end[0],end[1]);
    ctx.lineTo(end[0]+120*flip,end[1]);
    ctx.strokeStyle = "#bdc3c7";
    ctx.lineWidth   = 2;
    ctx.stroke();
    // The labels
    ctx.font="17px Arial";
    ctx.fillText(myLabel[i]+" "+precentage.toFixed(2)+"%",end[0]+textOffset,end[1]-4); 
    // Increment Loop
    lastend += Math.PI*2*(myData[i]/myTotal);
    
  }
}
function plotObject() {
  var canvas;
  var ctx;
  var lastend = 0;
  var myTotal = getTotal();
  var doc;
  canvas = document.getElementById("canvasObj");
  var x = (canvas.width)/2;
  var y = (canvas.height)/2;
  var r = 150;
  
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < myData.length; i++) {
    ctx.fillStyle = myColor[i];
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.arc(x,y,r,lastend,lastend+(Math.PI*2*(myData[i]/myTotal)),false);
    ctx.lineTo(x,y);
    ctx.fill();
    
    // Now the pointers
    ctx.beginPath();
    var start = [];
    var end = [];
    var last = 0;
    var flip = 0;
    var textOffset = 0;
    var precentage = (myData[i]/myTotal)*100;
    start = getPoint(x,y,r-20,(lastend+(Math.PI*2*(myData[i]/myTotal))/2));
    end = getPoint(x,y,r+20,(lastend+(Math.PI*2*(myData[i]/myTotal))/2));
    if(start[0] <= x)
    {
      flip = -1;
      textOffset = -110;
    }
    else
    {
      flip = 1;
      textOffset = 10;
    }
    ctx.moveTo(start[0],start[1]);
    ctx.lineTo(end[0],end[1]);
    ctx.lineTo(end[0]+120*flip,end[1]);
    ctx.strokeStyle = "#bdc3c7";
    ctx.lineWidth   = 2;
    ctx.stroke();
    // The labels
    ctx.font="17px Arial";
    ctx.fillText(myLabel[i]+" "+precentage.toFixed(2)+"%",end[0]+textOffset,end[1]-4); 
    // Increment Loop
    lastend += Math.PI*2*(myData[i]/myTotal);
    
  }
}
// Find that magical point
function getPoint(c1,c2,radius,angle) {
  return [c1+Math.cos(angle)*radius,c2+Math.sin(angle)*radius];
}
// The drawing
plotData();
plotObject();
      }
  
}



