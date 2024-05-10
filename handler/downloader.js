import { GLTFExporter } from 'three/examples/jsm/Addons.js';

function DownloadModel(scene) {
    var object = scene.getObjectByName('Loaded Model');
    if (object) {
        var exporter = new GLTFExporter();
        exporter.parse(object, function (gltf) {
            gltf.userData = {
                description: "Hello World :)",
            };
            var gltfString = JSON.stringify(gltf);
            var blob = new Blob([gltfString], {type: 'application/octet-stream'});
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = '3D_Object.glb';
            link.click();
        });
    } else {
        console.log("Object not Found.");
        alert("Can't Find Object");
    }
}

export default DownloadModel;
