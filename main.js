import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import UploadModel from './handler/upload';
import DownloadModel from './handler/downloader';
import { convertToBinary } from './handler/text';
import { DeleteModel } from './handler/deletemodel';
import { AddArray } from './handler/addition';
import { CreateModel } from './handler/recreate';
import { Decrypt } from './handler/decrypt';
import { SubtractArray } from './handler/subtraction';
import { convertFromBinary } from './handler/toText';

// CANVAS & RENDERER SETUP ===========================================================================================
const canvas = document.querySelector('#main-viewport');
const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = true;

// SCENE ===========================================================================================
const scene = new THREE.Scene();
const bg = 0x333344;
scene.background = new THREE.Color(bg);

scene.fog = new THREE.Fog(bg, 15, 30);


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
const grid = new THREE.GridHelper(100, 100, '#AAAAAA', '#555555');
grid.position.set(0, 0, 0);
scene.add(grid);

// LIGHTINGS ===========================================================================================
const direct_light1 = new THREE.DirectionalLight(0xffffff, 7);
direct_light1.position.set(5, 5, 5);
const direct_light2 = new THREE.DirectionalLight(0xccccff, 10)
direct_light2.position.set(-5, -5, -5)
scene.add(direct_light1, direct_light2);

// LOAD UPLOADED OBJECT ===========================================================================================
const main_material = new THREE.MeshStandardMaterial({ color: 0xcccccc, side: THREE.DoubleSide });

let oldvertices;
let oldindices;
let datavertexfromloader;

function handleModelUpload(scene, main_material) {
    UploadModel(scene, main_material)
        .then(({ vertices, indices, datavertex }) => {
            oldvertices = vertices;
            oldindices = indices;
            datavertexfromloader = datavertex;
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

// ENCRYPTION HANDLER ===========================================================================================

let newvertices;
let textvalue;

document.getElementById("Encrypt-Button").addEventListener('click', function(){
    textvalue = convertToBinary(scene);
    if (textvalue){
        DeleteModel(scene);
        newvertices = AddArray(oldvertices, textvalue);
        CreateModel(newvertices, oldindices, main_material, scene)
    } else {
        return;
    }
});

// DECRYPTION HANDLER ===========================================================================================
document.getElementById("Decrypt-Button").addEventListener('click', function(){
    var outputField = document.querySelector('.outputplaintext');
    if (Decrypt(newvertices)){
        var vertices = SubtractArray(newvertices, textvalue);
        DeleteModel(scene);
        CreateModel(vertices, oldindices, main_material, scene);
        var text = convertFromBinary(textvalue);
        outputField.value = String(text).trim();
    } else {
        var vertices = SubtractArray(oldvertices, datavertexfromloader);
        DeleteModel(scene);
        CreateModel(datavertexfromloader, oldindices, main_material, scene);
        var text = convertFromBinary(vertices);
        outputField.value = String(text).trim();
    }
});

// DOWNLOAD MODEL ===========================================================================================
document.getElementById('downloadButton').addEventListener('click', function() {
    DownloadModel(scene, oldvertices, oldindices);
});

// RESIZE =============================================================================================
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
        main_camera.aspect = width / height;
        main_camera.updateProjectionMatrix();
    }
}

// RESIZE =============================================================================================
function windowResize() {
    const article = document.querySelector('.container-fluid');
    const aspectRatio = 16 / 9;
    const width = article.clientWidth * 0.95;
    const height = width / aspectRatio;
    renderer.setSize(width, height);
    main_camera.aspect = aspectRatio;
    main_camera.updateProjectionMatrix();
}

window.addEventListener('resize', windowResize);
// MAIN FUNC ===========================================================================================
function main() {
    requestAnimationFrame(main);
    renderer.render(scene, main_camera);
    controls.update();
}

main();
