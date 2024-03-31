

// Initialize variables
let scene, camera, renderer, controls;

// Initialize function
function init() {
    // Create scene
    scene = new THREE.Scene();



    // Create camera
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 30000 );
    camera.position.set(5, 5, 5);

    // Create renderer
    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create plane
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // Rotate the plane to make it horizontal
    plane.receiveShadow = true;
    scene.add(plane);

    // Create box
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.castShadow = true;
    box.position.set(0, 0.5, 0); // Place the box on top of the plane
    scene.add(box);


    // Create Sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 50, 50);
    const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x000FF, wireframe: false});
    const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
    sphere.castShadow = true;
    scene.add(sphere);
    sphere.position.set(2, 1, -1)

    // GridHelper
    const gridHelper = new THREE.GridHelper();
    scene.add(gridHelper);

    // Create orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0X333333);
    scene.add(ambientLight);

    // Directional Light
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.9);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    directionalLight.position.set(-30, 50, 0);
    directionalLight.shadow.camera.bottom = -12;

    //Directional Light Helper
    const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
    scene.add(dLightHelper);
    const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    scene.add(dLightShadowHelper);

    //Skybox

    let materialArray = [];
    let texture_ft = new THREE.TextureLoader().load( 'img/arid2_ft.jpg');
    let texture_bk = new THREE.TextureLoader().load( 'img/arid2_bk.jpg');
    let texture_up = new THREE.TextureLoader().load( 'img/arid2_up.jpg');
    let texture_dn = new THREE.TextureLoader().load( 'img/arid2_dn.jpg');
    let texture_rt = new THREE.TextureLoader().load( 'img/arid2_rt.jpg');
    let texture_lf = new THREE.TextureLoader().load( 'img/arid2_lf.jpg');

    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

    for (let i = 0; i < 6; i++){
        materialArray[i].side = THREE.BackSide;
        //materialArray[i].fog = false;
    }

    let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
    let skybox = new THREE.Mesh( skyboxGeo, materialArray );
    scene.add( skybox );



    // Render the scene
    animate();
}

// Animate function
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update(); // Update orbit controls

}

// Call the init function
init();
