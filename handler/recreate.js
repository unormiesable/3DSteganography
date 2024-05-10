import * as THREE from 'three';

// RECREATE GLB
export function CreateModel(vert, ind, material, scene){
    var positions = new Float32Array(vert);
    var indicesArray = new Uint32Array(ind);
    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setIndex(new THREE.BufferAttribute(indicesArray, 1));
    geometry.computeVertexNormals();
    var object = new THREE.Mesh(geometry, material);
    scene.add(object);
}