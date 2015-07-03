const THREE = require('three');

var camera, scene, renderer;
var geometry, material, mesh;

function init () {
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry( 200, 200, 200 );
  material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );


  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  renderer = new THREE.WebGLRenderer();

  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0x000000 );

  document.body.appendChild( renderer.domElement );
}

function loop () {
  requestAnimationFrame( loop );

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render( scene, camera );
}

require('domready')(() => {
  init();
  loop();
});
