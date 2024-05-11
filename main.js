import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import UploadModel from './handler/upload';
import DownloadModel from './handler/downloader';
import { convertToBinary } from './handler/text';

// CANVAS & RENDERER SETUP ===========================================================================================
const canvas = document.querySelector('#main-viewport');
const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = true;

// SCENE ===========================================================================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xAAAAAA);

// CAMERA ===========================================================================================
const main_camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
main_camera.position.set(4, 2, 4);

// CAMERA CONTROLS ===========================================================================================
const controls = new OrbitControls(main_camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
controls.screenSpacePanning = false;
controls.enablePan = false;
controls.enableZoom = true;
controls.maxDistance = 30;
controls.minDistance = 1;

// GRID ===========================================================================================
const grid = new THREE.GridHelper(100, 100, '#FFFFFF', '#BBBBBB');
grid.position.set(0, 0, 0);
scene.add(grid);

// LIGHTINGS ===========================================================================================
const direct_light1 = new THREE.DirectionalLight(0xffffff, 7);
direct_light1.position.set(5, 5, 5);
const direct_light2 = new THREE.DirectionalLight(0xccccff, 10)
direct_light2.position.set(-5, -5, -5)
scene.add(direct_light1, direct_light2);

// LOAD UPLOADED OBJECT ===========================================================================================
const main_material = new THREE.MeshStandardMaterial({ color:0xcccccc});

let oldvertices;
let oldindices;
function handleModelUpload(scene, main_material) {
    UploadModel(scene, main_material)
        .then(({ vertices, indices }) => {
            console.log("Vertices:", vertices);
            console.log("Indices:", indices);
            oldvertices = vertices;
            oldindices = indices;
        })
        .catch(error => {
            console.error('Unexpected Error while importing Model', error);
            alert("Unexpected error while importing model");
        });
}
handleModelUpload(scene, main_material);
document.getElementById('FileInput').addEventListener('change', function(event) {
    document.getElementById('FileInput').removeEventListener('change', this);
    handleModelUpload(scene, main_material);
});

// ENRYPT BUTTON HANDLE ===========================================================================================
document.getElementById("Encrypt-Button").addEventListener('click', function(){
    convertToBinary(scene);
    console.log(oldvertices);
});

// DOWNLOAD MODEL ===========================================================================================
document.getElementById('downloadButton').addEventListener('click', function() {
    DownloadModel(scene, oldvertices, oldindices);
});

// RESIZE WINDOW ===========================================================================================
function WindowResize() {
    const ShoulbeWidth = window.innerWidth * 0.79;
    const ShouldbeHeight = window.innerHeight * 0.774;
    main_camera.aspect = ShoulbeWidth / ShouldbeHeight;
    main_camera.updateProjectionMatrix();
    renderer.setSize(ShoulbeWidth, ShouldbeHeight);
}
window.addEventListener('resize', WindowResize);
WindowResize();

// MAIN FUNC ===========================================================================================
function main() {
    requestAnimationFrame(main);
    renderer.render(scene, main_camera);
    controls.update();
}

main();
