export function DeleteModel(scene){
    const previousModel = scene.getObjectByName('Loaded Model');
    if (previousModel) {
        scene.remove(previousModel);
    } else {
        alert("No 3D model loaded");
    }
}