

function init() {

scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setClearColor(0xffffff);
renderer.setSize(500, 500);
$(".threecontainer").html("");
$(".threecontainer").append(renderer.domElement);
camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.5, 1000 );
camera.position.set(-20,0,0);
scene.add(camera);
controls = new THREE.OrbitControls(camera);

lights = new THREE.AmbientLight( 0xFFFFFF, 1);
lights.position.set(0,20,30);
scene.add(lights);

//cube logik
cubeMats = [];
for (var i = 0; i < 6; i++) {
var loader = new THREE.TextureLoader();
loader.crossOrigin = true;
var texture = loader.load("https://crossorigin.me/" + photoURLs[i], function(texture){
var material = new THREE.MeshPhongMaterial( {map:texture});
cubeMats.push(material);
}, function(xhr){console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );},
function ( xhr ) {
    console.log( 'An error happened' );
  });
}
// console.log(material);
// shapeMaterial = new THREE.MeshLambertMaterial( 0xFF00FF);
var meshFaceMaterial = new THREE.MeshFaceMaterial( cubeMats );
shape = new THREE.Mesh(new THREE.BoxGeometry(10,10,10), meshFaceMaterial);
scene.add(shape);
render();

}

function render() {
requestAnimationFrame(render);
renderer.render(scene, camera);
shape.rotation.y+=0.001;
shape.rotation.x+=0.003;
shape.rotation.z+=0.006;
controls.update();

}


