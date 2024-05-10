// VERTEX EXTRACT
export function extractVertices(gltf) {
    let vertices = [];

    // VERTEX DATA
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            const geometry = child.geometry;
            const positions = geometry.attributes.position.array;

            // COOR
            for (let i = 0; i < positions.length; i += 3) {
                vertices.push(positions[i], positions[i + 1], positions[i + 2]);
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

            // IND
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