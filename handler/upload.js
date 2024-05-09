// Fungsi untuk upload
import { LoadModel } from "./loader";

function UploadModel(scene) {
    const fileInput = document.getElementById('FileInput');

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const dataURL = event.target.result;
            LoadModel(dataURL, scene);
        };

        reader.readAsDataURL(file);
    });
}

export default UploadModel;
