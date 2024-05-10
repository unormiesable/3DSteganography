// Funngsi untuk load model
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { extractVertices } from './extractdata';
import { extractIndices } from './extractdata';
import { CreateModel } from './recreate';

export function LoadModel(url, scene, material, offset=null) {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
        const previousModel = scene.getObjectByName('Loaded Model');
        if (previousModel) {
            scene.remove(previousModel);
        }
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.name = 'Loaded Model';

        const vertices = extractVertices(gltf);
        const indices = extractIndices(gltf);

        console.log(vertices);
        console.log(indices);

        CreateModel(vertices, indices, material, scene)

        const json = gltf.parser.json;
        console.log(json);
    });
}