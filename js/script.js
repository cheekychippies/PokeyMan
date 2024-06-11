// Import necessary components
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';



// Initialize variables
let scene, camera, renderer, controls, mouse, raycaster;

// Initialize function
function init() {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 30000);
    camera.position.set(5, 5, 5);

    // Create renderer
    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

    // Create plane
    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const planeMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load('img/street.jpg'), side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // Rotate the plane to make it horizontal
    plane.receiveShadow = true;
    plane.name = "plane"; // Name the plane
    scene.add(plane);

    // Create box
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshStandardMaterial({
        color: 0xff000, side: THREE.DoubleSide
    });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.castShadow = true;
    box.position.set(0, 0.5, 0); // Place the box on top of the plane
    box.name = "box"; // Name the box
    scene.add(box);

    // Create loader
 /*   const loader = new GLTFLoader();

    // Load Room
    loader.load('assets/Car/scene.gltf', function (gltf) {
        scene.add(gltf.scene);
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
    }, undefined, function (error) {
        console.error(error);
    });*/

    // Create sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 50, 50);
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0x0000FF, wireframe: false
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.name ="sphere";
    scene.add(sphere);
    sphere.position.set(2, 1, -1);

    // GridHelper
    const gridHelper = new THREE.GridHelper(100, 100);
    // scene.add(gridHelper);

    // Create orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    // Directional Light
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.9);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    directionalLight.position.set(-30, 50, 0);
    directionalLight.shadow.camera.bottom = -12;

    // Directional Light Helper
    const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
    scene.add(dLightHelper);
    const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    scene.add(dLightShadowHelper);

    // Skybox
    let materialArray = [];
    let texture_ft = new THREE.TextureLoader().load('img/arid2_ft.jpg');
    let texture_bk = new THREE.TextureLoader().load('img/arid2_bk.jpg');
    let texture_up = new THREE.TextureLoader().load('img/arid2_up.jpg');
    let texture_dn = new THREE.TextureLoader().load('img/arid2_dn.jpg');
    let texture_rt = new THREE.TextureLoader().load('img/arid2_rt.jpg');
    let texture_lf = new THREE.TextureLoader().load('img/arid2_lf.jpg');

    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

    for (let i = 0; i < 6; i++) {
        materialArray[i].side = THREE.BackSide;
    }

    let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    let skybox = new THREE.Mesh(skyboxGeo, materialArray);
    scene.add(skybox);

    // Render the scene
    animate();
}

// Raycaster
mouse = new THREE.Vector2();
raycaster = new THREE.Raycaster();

function onMouseClick(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    pickPiece();
}

// Add event listener for click
window.addEventListener('click', onMouseClick, false);

function pickPiece() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        if (intersectedObject.name === "box" || intersectedObject.name === "sphere") { // Check if the intersected object is the box
            intersectedObject.material.color.set(0xff0000); // Change color of the box
        }
    }
}

// Animate function
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update(); // Update orbit controls
}

// Call the init function
init();
