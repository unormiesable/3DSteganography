export function AddArray(oldVertices, textValue) {
    const result = [];
    const maxLength = Math.max(oldVertices.length, textValue.length);
    
    for (let i = 0; i < maxLength; i++) {
        const oldValue = parseFloat(oldVertices[i]) || 0;
        const newValue = parseFloat(textValue[i]) || 0;
        const sum = (oldValue + newValue).toFixed(3);
        result.push(parseFloat(sum));
    }
    
    return result;
}