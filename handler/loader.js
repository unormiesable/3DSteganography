// Funngsi untuk load model
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export function LoadModel(url, scene) {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
        const previousModel = scene.getObjectByName('Loaded Model');
        if (previousModel) {
            scene.remove(previousModel);
        }
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.name = 'Loaded Model';
        scene.add(gltf.scene);

        const json = gltf.parser.json;
        console.log(json);
    });
}