export function convertToBinary(scene) {
    var object = scene.getObjectByName('Loaded Model');
    if (object) {
        var textareaElement = document.getElementById("plaintextinput");
        var text = textareaElement.value;
        var binaryArray = [];

        for (var i = 0; i < text.length; i++) {
            var asciiValue = text.charCodeAt(i);
            var binary = asciiValue.toString(2);

            binary = binary.padStart(8, '0');
            binaryArray.push(binary);
        }

        var segmentedBinaryArray = [];
        for (var i = 0; i < binaryArray.length; i++) {
            var binary = binaryArray[i];
            var segments = binary.match(/.{1,3}/g);
            var paddedSegments = segments.map(segment => segment.padStart(3, '0')); 
            segmentedBinaryArray.push(...paddedSegments); 
        }
        var decimalArray = segmentedBinaryArray.map(segment => parseInt(segment, 2));
        var dividedBySevenArray = decimalArray.map(value => (value / 7).toFixed(3));

        console.log(dividedBySevenArray);
    }
    else {
        console.log("Object not Found.");
        alert("Can't Find Object");
    }
}
