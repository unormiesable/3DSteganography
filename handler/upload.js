import { LoadModel } from "./loader";

function UploadModel(scene, material) {
    const fileInput = document.getElementById('FileInput');

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        
        const fileName = file.name;
        const fileExtension = fileName.split('.').pop().toLowerCase();
        if (fileExtension !== 'glb' && fileExtension !== 'gltf') {
            console.log('Format incorrect');
            alert("Format's Not Supported");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const dataURL = event.target.result;
            LoadModel(dataURL, scene, material);
        };

        reader.readAsDataURL(file);
    });
}

export default UploadModel;

