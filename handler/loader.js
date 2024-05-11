// Funngsi untuk load model
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { extractVertices } from './extractdata';
import { extractIndices } from './extractdata';
import { CreateModel } from './recreate';

export function LoadModel(url, scene, material) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load(url, (gltf) => {
            const previousModel = scene.getObjectByName('Loaded Model');
            if (previousModel) {
                scene.remove(previousModel);
            }
            gltf.scene.position.set(0, 0, 0);
            gltf.scene.name = 'Loaded Model';

            const userData = gltf.parser.json.userData;
            let datavertex = null;

            if (userData && userData.vertex) {
                console.log("Vertex found");
                datavertex = userData.vertex;
            } else {
                console.log("Vertex not found");
            }

            const vertices = extractVertices(gltf);
            const indices = extractIndices(gltf);            

            CreateModel(vertices, indices, material, scene);

            resolve({ vertices, indices, datavertex });
        }, undefined, reject);
    });
}
