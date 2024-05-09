import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

// Canvas
const canvas = document.querySelector('#main-viewport');
const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = true;


// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xAAAAAA);

// Camera
const main_camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
main_camera.position.set(4, 2, 4);

// Controls (Orbit Controls)
const controls = new OrbitControls(main_camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
controls.screenSpacePanning = false;
controls.enablePan = false;
controls.enableZoom = true;
controls.maxDistance = 30;
controls.minDistance = 1;

// GRID
const grid = new THREE.GridHelper(100, 100, '#FFFFFF', '#BBBBBB');
grid.position.set(0, 0, 0);
scene.add(grid);

function WindowResize() {
    const ShoulbeWidth = window.innerWidth * 0.79;
    const ShouldbeHeight = window.innerHeight * 0.774;
    main_camera.aspect = ShoulbeWidth / ShouldbeHeight;
    main_camera.updateProjectionMatrix();
    renderer.setSize(ShoulbeWidth, ShouldbeHeight);
}
window.addEventListener('resize', WindowResize);
WindowResize();



// MAIN FUNC
function main() {
    requestAnimationFrame(main);
    renderer.render(scene, main_camera);
    controls.update();
}

main();
