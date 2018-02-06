import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';
import { Assets } from './assets.model';
import MTLLoader from 'three-mtl-loader';
import { Input } from '@angular/core/src/metadata/directives';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnDestroy, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { CanActivate } from '@angular/router';
import { CanActivateChild } from '@angular/router/src/interfaces';
import { AdalService } from 'ng2-adal/dist/core';
import { Http } from '@angular/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var THREE: any;
declare var THREEx: any;
var container: any;
var stop = false;
var maintainScreen;
var camera, controls, scene, renderer, loader;
var objects = [];
var clock = new THREE.Clock();
var keyboard = new THREEx.KeyboardState();
var loader = new THREE.JSONLoader();
var objloader = new THREE.ObjectLoader();
var onUpPosition = new THREE.Vector2();
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var selectedObject;
var i = 0, keyFlag = true;
var dragControls;
var cube;



@Component({
	selector: 'app-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.css']
})





export class CanvasComponent implements OnInit {

	getActive(name){
		if(name==this.roomName)
			return "active";
		return "block";
	}

	swapLayout(name){
		this.spinnerService.show();
		scene.remove(cube);
		this._http.get(`https://magicdecorapi.azurewebsites.net/api/layouts/${name}`)
					.map(room => room.json().data)
					.subscribe((res) => {
						this.build(res);
					});
		this.roomName=name;
		this.spinnerService.hide();
	}

	@ViewChild('layoutsection') dataContainer: ElementRef;
	layout;
	layouts;
	category;
	status=0;
	roomName;
	repo;
	setObj = false;
	objURL;
	a_objects;
	currentObject = null;
	assets: Assets[] = []
	saveForm: FormGroup;
	projectName: FormControl;
	projectDescription: FormControl;
	favorite: boolean = false;
	user = this.adal.userInfo.profile.name;
	uid = this.adal.userInfo.userName;
	createdDate;
	imageURL;
	saved = false;
	objid;
	currentObjects;
	currentRoom;
	saveToggle = false;

	pname;
	pdesc;
	project;
	fav = false;

	nextpage="../profile";
	constructor(arouter: ActivatedRoute, private service: DataService, private adal: AdalService, private _http: Http, private spinnerService: Ng4LoadingSpinnerService) {
		this.spinnerService.show();
		//Reactive Form for saving data
		this.service.getObjects()
			.subscribe(res => {
				this.a_objects = res.json().data;
				
			
			})
		if (this.objid = arouter.snapshot.paramMap.get('objid')) {
			this.projectById(this.objid);
			this._http.get("https://magicdecorapi.azurewebsites.net/api/getProject")
				.subscribe((res)=>{
					this.project = res.json().data;
					this.pname = this.project.filter((elem)=>{
					console.log("elem: ", elem);
					console.log(arouter.snapshot.paramMap.get('objid'));
					return elem._id == arouter.snapshot.paramMap.get('objid');
				})
				this.projectDescription.setValue(this.pname[0].desc);
				this.fav = this.pname[0].fav;
				this.projectName.setValue(this.pname[0].name);
				
				
				})
		}
		if (this.objid = arouter.snapshot.paramMap.get('objid')) 
			{
				this.projectById(this.objid);
				this.nextpage="../../profile";
			}
		else
			this.category = this.service.layoutCategory;

		this.service.getLayout()
		.subscribe((res) => {
			this.spinnerService.hide();
			this.layouts = res;
		})
	
	}

	///Build Room////
	projectById(objid) {
			this._http.get(`https://magicdecorapi.azurewebsites.net/api/getProject/${objid}`)
			.map(e => e.json().data)
			.subscribe((res) => {
				this.Objects(res.object);
				this._http.get(`https://magicdecorapi.azurewebsites.net/api/layouts/${res.roomName}`)
					.map(room => room.json().data)
					.subscribe((res) => {
						this.build(res);
					});
			})

	}
	build(room) {
		var walls = [
			new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(room.sides[0]), side: THREE.BackSide }),
			new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(room.sides[1]), side: THREE.BackSide }),
			new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(room.sides[2]), side: THREE.BackSide }),
			new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(room.sides[3]), side: THREE.DoubleSide }),
			new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(room.sides[4]), side: THREE.BackSide }),
			new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(room.sides[5]), side: THREE.BackSide })
		]
		cube = new THREE.Mesh(new THREE.BoxGeometry(200, 80, 150), walls);
		cube.scale.set(8, 8, 8);
		scene.add(cube);
		this.roomName= room.name;
		this.category = room.layoutCategory;
		dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
		dragControls.addEventListener('dragstart', function (event) { controls.enabled = false; });
		dragControls.addEventListener('dragend', function (event) { controls.enabled = true; });
	}
	Objects(objects) {
		for (let object of objects) {
			this.reloadObject(object.name, object.position, object.angle, object.scale);
		}
	}
	setObject(objURL) {
		this.objURL = objURL;
		this.setObj = true;
	}
	today()												//Get Current Date
	{
		var d = new Date();
		this.createdDate = d.toDateString();
	}
	canDeactivate() {
		return this.saved;
	}

	addFavorite() {
		this.favorite = !this.favorite;
	}

	loadObject(name) {								//Accept Name and add the objet to scene

		loader.load('assets/models/' + name + '/' + name + '.js', function (geometry, materials) {
			let mesh = new THREE.Mesh(geometry, materials);
			mesh.position.set(200, 0, 0);
			mesh.scale.set(3, 3, 3);
			mesh.name = name;
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			//selectedObject=mesh;
			scene.add(mesh);
			objects.push(mesh);
			this.saved = false;
		})
	}
	reloadObject(name, position, rotation, scale)				//Accept the object from Db and Load back to scene
	{
		objects = [];
		loader.load('assets/models/' + name + '/' + name + '.js', function (geometry, materials) {
			let mesh = new THREE.Mesh(geometry, materials);
			mesh.position.set(position[0], position[1], position[2]);
			mesh.scale.set(scale[0], scale[1], scale[2]);
			mesh.name = name;
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
			scene.add(mesh);
			objects.push(mesh);

		});

	}
	saveAsNew(){
		this.saveToggle = !this.saveToggle;
	}
	saveProject() {									//Accept the inputs from modal form and save the Scene to Mongodb
		this.assets = [];
		for (let object of objects) {
			this.assets.unshift(new Assets(object.name, [object.position.x, object.position.y, object.position.z], [object.rotation.x, object.rotation.y, object.rotation.z], [object.scale.x, object.scale.y, object.scale.z]));
		}
		if (this.saveForm.valid) {
			this.spinnerService.show();
			let name = this.projectName.value;
			let desc = this.projectDescription.value;

			if(this.objid!=undefined){
				if(this.saveToggle){
					this.service.saveProject(this.assets, name, desc, this.favorite, this.createdDate, this.imageURL, this.uid, this.roomName).subscribe((res) => {
				this.saved = res.ok;
				this.status=1
				//document.getElementById("close").click();
				this.spinnerService.hide();
			  })
			
				}
				else{
			this.service.updateProject(this.assets, name, desc, this.favorite, this.createdDate, this.imageURL, this.uid, this.roomName, this.objid).subscribe((res) => {
				this.saved = res.ok;
				this.status=1
				//document.getElementById("close").click();
				this.spinnerService.hide();
			  })
				}
			}
			else{
			this.service.saveProject(this.assets, name, desc, this.favorite, this.createdDate, this.imageURL, this.uid, this.roomName).subscribe((res) => {
				this.saved = res.ok;
				this.status=1
				//document.getElementById("close").click();
				this.spinnerService.hide();
			  })
			}
			
		}
		else {
			alert("all Fields are mandatory")
		}
	}
	editproject()
	{

	}

	static deleteSelected() {							//Remove Element from the scene
		scene.remove(selectedObject);
	}
	add() {													//Render the scene with walls images

		if (!this.service.walls) {
			return;
		}
		cube = new THREE.Mesh(new THREE.BoxGeometry(200, 80, 150), this.service.walls);
		cube.scale.set(8, 8, 8);
		scene.add(cube);

	}
	screenshot() {											//take a screenshot to load in modal preview and Mongodb
		controls.reset();
		renderer.render(scene, camera);
		this.imageURL = renderer.domElement.toDataURL('image/png',0.000001);
		let img = new Image();
		img.src = this.imageURL;
		document.getElementById("preview").setAttribute('src', this.imageURL);
	}
	resetView() {											//Reset the camera to intial angle
		controls.reset();
	}
	desc()														//Functions to be called when modal pops up
	{
		this.today();
		this.screenshot();
		keyFlag = false;
	}
	enableKey() {
		keyFlag = true;
	}
	createFormControls() {
		this.projectName = new FormControl('', Validators.required);
		this.projectDescription = new FormControl('', Validators.required);
	}
	createForm() {
		this.saveForm = new FormGroup({
			projectName: this.projectName,
			projectDescription: this.projectDescription
		});
	}

	ngOnInit() {
		document.getElementById("info").click();
		this.layout = this.service.layoutCategory;					//Displaying Room names on canvas component
		this.roomName = this.service.roomName;
		init();
		this.add();
		this.createFormControls();
		this.createForm();
		function init() {
			container = document.getElementById("myCanvas");			//adding canavs to html 
			camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
			camera.position.set(0, 150, 1000);
			controls = new THREE.OrbitControls(camera, container);
			controls.rotateSpeed = 0.5;
			controls.zoomSpeed = 1;
			controls.enablePan = false;
			controls.dampingFactor = 0.3;
			controls.maxPolarAngle = Math.PI / 2;
			scene = new THREE.Scene();
			scene.background = new THREE.Color(0xffffff);
			scene.add(new THREE.AmbientLight(0x505050));
			var light = new THREE.SpotLight(0xffffff, 1.5);
			light.position.set(0, 500, 2000);
			light.castShadow = true;
			light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 200, 10000));
			light.shadow.bias = - 0.00022;
			light.shadow.mapSize.width = 2048;
			light.shadow.mapSize.height = 2048;
			scene.add(light);
			selectedObject = objects[0];									//by default making first object as selected
			renderer = new THREE.WebGLRenderer({ antialias: true });

			renderer.setSize(window.innerWidth  -  (0.38  *  window.innerWidth),  window.innerHeight  -  200);
			renderer.setPixelRatio(window.devicePixelRatio);

			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFShadowMap;
			container.appendChild(renderer.domElement);
			dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
			dragControls.addEventListener('dragstart', function (event) { controls.enabled = false; });
			dragControls.addEventListener('dragend', function (event) { controls.enabled = true; });
			window.addEventListener('resize', onWindowResize, true);
			window.addEventListener('mouseup', onMouseUp, false);
			document.getElementById("shot").addEventListener('click', takeScreenshot);
		}
		var mycanvas = document.getElementById("playArea")

		var elem = document.getElementById("fullscreen")
		elem.addEventListener('click', fullScreen);
		function fullScreen()							//Fullscreen Editing
		{
			if (mycanvas.requestFullscreen) {
				mycanvas.setAttribute("style","width:100%");
				mycanvas.requestFullscreen();
			}
			else if (mycanvas.webkitRequestFullscreen) {
				//mycanvas.setAttribute("style","width:100%");
				mycanvas.webkitRequestFullscreen();

			}

		}
		
		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth  -  (0.38  *  window.innerWidth),  window.innerHeight  -  200);
		}
		function takeScreenshot() {								//Take ScreenShot and Download to loacal system
			// open in new window like this
			var w = window.open('', '');
			w.document.title = "Screenshot";
			//w.document.body.style.backgroundColor = "red";
			var img = new Image();
			// Without 'preserveDrawingBuffer' set to true, we must render now
			renderer.render(scene, camera);
			img.src = renderer.domElement.toDataURL();
			w.document.body.appendChild(img);
			// download file like this.
			var a = document.createElement('a');
			// Without 'preserveDrawingBuffer' set to true, we must render now
			renderer.render(scene, camera);
			a.href = renderer.domElement.toDataURL().replace("image/png", "image/octet-stream");
			a.download = 'canvas.png'
			a.click();
		}


		/*Functions to select objects on mouse click*/
		function getMousePosition(dom, x, y) {
			var rect = dom.getBoundingClientRect();
			return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
		}
		function onMouseUp(event) {
			var array = getMousePosition(renderer.domElement, event.clientX, event.clientY);
			onUpPosition.fromArray(array);
			handleClick();
		}
		function getIntersects(point, objects) {
			mouse.set((point.x * 2) - 1, - (point.y * 2) + 1);
			raycaster.setFromCamera(mouse, camera);
			return raycaster.intersectObjects(objects);

		}
		function handleClick() {
			var intersects = getIntersects(onUpPosition, objects);
			if (intersects.length > 0) {
				selectedObject = intersects[0].object;
			}

		}

		function update() {
			if (keyFlag) {
				var delta = clock.getDelta(); // seconds.
				var moveDistance = 200 * delta; // 200 pixels per second
				var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
				if (keyboard.pressed("H") && selectedObject) {
					selectedObject.rotation.y += rotateAngle;

				}
				if (keyboard.pressed("K") && selectedObject)
					selectedObject.rotation.y -= rotateAngle;

				if (keyboard.pressed("A") || keyboard.pressed("left") && selectedObject)
				{	selectedObject.position.x -= moveDistance;
					if(selectedObject.position.x < -683 )
					selectedObject.position.x +=moveDistance;
				}
				
				if (keyboard.pressed("D") || keyboard.pressed("right") && selectedObject)
				{	selectedObject.position.x += moveDistance;
					if(selectedObject.position.x > 678 )
					selectedObject.position.x -=moveDistance;
				}
				if (keyboard.pressed("W") || keyboard.pressed("up")&& selectedObject)
				{	selectedObject.position.z -= moveDistance;
					if(selectedObject.position.z < -480 )
					selectedObject.position.z +=moveDistance;
				}
				if (keyboard.pressed("S") || keyboard.pressed("down") && selectedObject)
				{
					selectedObject.position.z += moveDistance;
					if(selectedObject.position.z > 500 )
					selectedObject.position.z -=moveDistance;
				}
				if (keyboard.pressed("R") || keyboard.pressed("del") && selectedObject)
					CanvasComponent.deleteSelected();
				if (keyboard.pressed("inc") && selectedObject) {
					selectedObject.scale.x += 0.01;
					selectedObject.scale.y += 0.01;
					selectedObject.scale.z += 0.01;
				}
				if (keyboard.pressed("dec") && selectedObject) {
					if (selectedObject.scale.y < 0)
						return;
					selectedObject.scale.x -= 0.01;
					selectedObject.scale.y -= 0.01;
					selectedObject.scale.z -= 0.01;
				}
				if(keyboard.pressed("U") && selectedObject)
				{
					selectedObject.position.y += moveDistance;
					if(selectedObject.position.y > 90)
					selectedObject.position.y -= moveDistance;
				}
				if(keyboard.pressed("J") && selectedObject)
				{
					selectedObject.position.y -= moveDistance;
					if(selectedObject.position.y < -308)
					selectedObject.position.y += moveDistance;
				}

				//collision detection
				/*
				var originPoint = objects[0].position.clone();
					for (var vertexIndex = 0; vertexIndex < objects[0].geometry.vertices.length; vertexIndex++)
					{		
						var localVertex = objects[0].geometry.vertices[vertexIndex].clone();
						var globalVertex = localVertex.applyMatrix4( objects[0].matrix );
						var directionVector = globalVertex.sub( objects[0].position );
						
						var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
						var collisionResults = ray.intersectObjects( objects );
						if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
							console.log(" Hit ");
					}*/
			}
		}
		

		animate();
		function animate() {
			requestAnimationFrame(animate);
			render();
			update();
		}
		function render() {
			controls.update();
			renderer.render(scene, camera);
		}

	}
}
