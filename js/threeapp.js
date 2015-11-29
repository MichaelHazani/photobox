function init() {

    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    // renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    $(".threecontainer").html("");
    $(".threecontainer").append(renderer.domElement);
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 1000);
    camera.position.set(0, 0, -60);
    scene.add(camera);
    controls = new THREE.OrbitControls(camera);

    lights = new THREE.AmbientLight(0xFFFFFF, 1);
    lights.position.set(0, 20, 30);
    scene.add(lights);

    pivot = new THREE.Object3D();
    scene.add(pivot);
    render();
}

function makeCube() {
    //cube logik
    cubeMats = [];
    for (var i = 0; i < 6; i++) {
        var loader = new THREE.TextureLoader();
        loader.crossOrigin = true;
        var texture = loader.load("https://crossorigin.me/" + photoURLs[i], function(texture) {
                var material = new THREE.MeshPhongMaterial({
                    map: texture
                });
                cubeMats.push(material);
            }, function(xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function(xhr) {
                console.log('An error happened');
            });
    }
    // console.log(material);
    // shapeMaterial = new THREE.MeshLambertMaterial( 0xFF00FF);
    var meshFaceMaterial = new THREE.MeshFaceMaterial(cubeMats);
    shape = new THREE.Mesh(new THREE.BoxGeometry(6, 6, 6), meshFaceMaterial);
    shape.direction = setMotion(0.01);
    shape.position.set(setMotion(25), setMotion(25), setMotion(5));
    pivot.add(shape);
}

function makeSphere(e) {
          console.log("spheretime");
    //sphere logik
    var loader = new THREE.TextureLoader();
    loader.crossOrigin = true;
    var texture = loader.load("https://crossorigin.me/" + photoURLs[0], function(texture) {
            var material = new THREE.MeshPhongMaterial({
                map: texture
            });
            shape = new THREE.Mesh(new THREE.SphereGeometry(6, 54, 23), material);
            shape.direction = setMotion(0.01);
            shape.position.set(setMotion(25), setMotion(25), setMotion(5));
            pivot.add(shape);

            // sphereMats.push(material);
        }, function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function(xhr) {
            console.log('An error happened');
        });
}



function setMotion(mult) {
    var direction = (Math.random() * 2 - 1) * mult;
    return direction;
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    if (pivot.children.length > 0) {
        pivot.children.forEach(function(shape) {
            // console.log(shape);
            shape.rotation.y += shape.direction;
            shape.position.x += shape.position.x / -1000;
            // shape.rotation.x += shape.direction;
            // shape.rotation.z += shape.direction;

        });
    }

    controls.update();

}


init();
