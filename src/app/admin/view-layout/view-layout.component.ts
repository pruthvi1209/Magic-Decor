import { Component, OnInit } from '@angular/core';
declare var THREE: any;
var camera, controls, scene, renderer, light,box,room;

@Component({
  selector: 'app-view-layout',
  templateUrl: './view-layout.component.html',
  styleUrls: ['./view-layout.component.css']
})
export class ViewLayoutComponent implements OnInit {

  constructor() {
    scene=new THREE.Scene();
    renderer=new THREE.WebGLRenderer();
    light= new THREE.AmbientLight(0xffffff);
    room=[
        new THREE.MeshBasicMaterial({ map : new THREE.TextureLoader().load('../assets/images/3dlayout/win15.jpg'), side : THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map : new THREE.TextureLoader().load('../assets/images/3dlayout/wall7.jpg'), side : THREE.BackSide}),
        new THREE.MeshBasicMaterial({ map : new THREE.TextureLoader().load('../assets/images/3dlayout/wall7-1.jpg'), side : THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map : new THREE.TextureLoader().load('../assets/images/3dlayout/floor2.jpg'), side : THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map : new THREE.TextureLoader().load('../assets/images/3dlayout/wall7-1.jpg'), side : THREE.BackSide}),
        new THREE.MeshBasicMaterial({ map : new THREE.TextureLoader().load('../assets/images/3dlayout/wall7.jpg'), side : THREE.BackSide })        
    ];
   }

  
  ngOnInit() {
    initScene();
    function initScene(){
        renderer.setSize(window.innerWidth,window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement);
        scene.add(light);
        camera=new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        camera.position.z=300;
        window.addEventListener('resize', function(){
            var width = window.innerWidth;
            var height = window.innerHeight;
            renderer.setSize(width,height);
            camera.aspect = width/height;
            camera.updateProjectionMatrix();
        });
        var controls = new THREE.OrbitControls(camera,renderer.domElement);
        scene.add(camera);
        box = new THREE.Mesh(
            new THREE.BoxGeometry(200,60,100),
            new THREE.MeshFaceMaterial(room)
        );
        box.name="box";
        scene.add(box);
        render();
    }
    function render(){
        renderer.render(scene,camera);
        requestAnimationFrame(render);
    }
    window.onload=initScene;

    return{
        scene : scene
    }


  }

}
