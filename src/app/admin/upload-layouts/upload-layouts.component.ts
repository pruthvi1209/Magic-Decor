import { Component, OnInit } from '@angular/core';
let  defaultImg="../../../assets/logo/defaultimg.png",
     topimg= defaultImg, 
     bottom= defaultImg,
     left= defaultImg,
     right= defaultImg,
     front= defaultImg,
     back= defaultImg,
     show=false;
declare var THREE: any;
var camera, controls, box, room,
    light = new THREE.AmbientLight(0xffffff),
    scene = new THREE.Scene(),
    renderer = new THREE.WebGLRenderer();

@Component({
    selector: 'app-upload-layouts',
    templateUrl: './upload-layouts.component.html',
    styleUrls: ['./upload-layouts.component.css']
})
export class UploadLayoutsComponent implements OnInit {
    
    set(event:any, key) {
        if(event.target.files  &&  event.target.files[0]) {
        var  reader  =  new  FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload  =  (event:any)  =>  { // called once readAsDataURL is completed
            switch  (key) {
                case  'top':  topimg = event.target.result;
                    break;
                case  'bottom':  bottom = event.target.result;
                    break;
                case  'left':  left = event.target.result;
                    break;
                case  'right':  right = event.target.result;
                    break;
                case  'front':  front = event.target.result;
                    break;
                case  'back':  back = event.target.result;
                    break;
                }
            }
        }
        setTimeout(function() {
            UploadLayoutsComponent.preview();
          }, 2000);
            }

    static preview() {
        document.getElementById("webgl-container").innerHTML="";
        room = [
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(right), side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(left), side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(topimg), side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(bottom), side: THREE.DoubleSide }),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(front), side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(back), side: THREE.BackSide })
        ];
        renderer.setSize(document.getElementById("preview").clientWidth*0.9,500);
        document.getElementById("webgl-container").appendChild(renderer.domElement);
        scene.add(light);
        camera = new THREE.PerspectiveCamera(35,9/6,1,1000);
        camera.position.z = 10;
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enablePan = false;
        controls.maxPolarAngle = Math.PI/2;
        scene.add(camera);
        box = new THREE.Mesh( new THREE.BoxGeometry(7, 3, 5),room);
        scene.add(box);
        UploadLayoutsComponent.render();
    }

    static render() {
        renderer.render(scene, camera);
        requestAnimationFrame(UploadLayoutsComponent.render);
    }

    screenshot() {
		controls.reset();
        renderer.render(scene, camera);
        document.getElementById("thumbnail").setAttribute('value',renderer.domElement.toDataURL('image/png',0.000001));
    }


    constructor() {
    }
    ngOnInit() {
        UploadLayoutsComponent.preview();
    }
}