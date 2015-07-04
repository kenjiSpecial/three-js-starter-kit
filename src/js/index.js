const THREE = require('three');
var Stats = require('fps-component');
var dat = require('dat-gui');
var stats, gui;

var camera, scene, renderer;
var geometry, material, mesh;
var directionalLight;
var pointLight, light;

function init () {
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 500;
  camera.position.y = 400;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry( 200, 200, 200 );
  //material = new THREE.MeshBasicMaterial( { color: 0x333333 } );
  material = new THREE.MeshLambertMaterial({color: 0x999999 });


  mesh = new THREE.Mesh( geometry, material );
  mesh.castShadow = true;

  scene.add( mesh );

  directionalLight = new THREE.DirectionalLight( 0xffffff);
  directionalLight.position.set( 0, 300, 300 );
  directionalLight.lookAt(new THREE.Vector3(0, 0, 0));
  directionalLight.castShadow = true;
  directionalLight.shadowDarkness = 0.5;
  directionalLight.shadowCameraVisible = true;
  scene.add( directionalLight );

  var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10);
  scene.add(directionalLightHelper);

  pointLight = new THREE.PointLight( 0xffffff, 1, 1000 );
  scene.add( pointLight );

  var sphereSize = 1;
  var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
  scene.add( pointLightHelper );

  renderer = new THREE.WebGLRenderer();

  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0x000000 );

  var size = 1000;
  var step = 100;

  var gridHelper = new THREE.GridHelper( size, step );
  scene.add( gridHelper );

  document.body.appendChild( renderer.domElement );

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);

  gui = new dat.GUI();
}

function loop () {
  requestAnimationFrame( loop );
  stats.begin()

  var time = +new Date() * 0.001;

  //mesh.rotation.x += 0.01;
  //mesh.rotation.y += 0.02;

  pointLight.position.x = Math.sin( time * 1.7 ) * 240;
  pointLight.position.y = Math.cos( time * 1.5 ) * 240;
  pointLight.position.z = Math.cos( time * 1.3 ) * 240;

  renderer.render( scene, camera );

  stats.end();
}

require('domready')(() => {
  init();
  loop();
});
