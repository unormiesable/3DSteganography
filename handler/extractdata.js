// VERTEX EXTRACT
export function extractVertices(gltf) {
    let vertices = [];

    // VERTEX DATA
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            const geometry = child.geometry;
            const positions = geometry.attributes.position.array;

            // VERTEX
            for (let i = 0; i < positions.length; i += 3) {
                const x = parseFloat(positions[i]).toFixed(3);
                const y = parseFloat(positions[i + 1]).toFixed(3);
                const z = parseFloat(positions[i + 2]).toFixed(3);
                vertices.push(parseFloat(x), parseFloat(y), parseFloat(z));
            }
        }
    });
    return vertices;
}

// INDEC EXTRACT
export function extractIndices(gltf) {
    let indices = [];

    // VERTEX INDEX DATA
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            const geometry = child.geometry;
            const idx = geometry.index.array;

            // INDEX
            for (let i = 0; i < idx.length; i += 3) {
                const index1 = idx[i];
                const index2 = idx[i + 1];
                const index3 = idx[i + 2];
                indices.push(index1, index2, index3);
            }
        }
    });
    return indices;
}