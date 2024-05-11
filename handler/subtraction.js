export function SubtractArray(newvertices, oldvertices) {
    const result = [];
    const maxLength = Math.max(newvertices.length, oldvertices.length);
    
    for (let i = 0; i < maxLength; i++) {
        const oldValue = parseFloat(newvertices[i]) || 0;
        const subtractedValue = parseFloat(oldvertices[i]) || 0;
        const difference = (oldValue - subtractedValue).toFixed(3);
        result.push(parseFloat(difference));
    }
    
    return result;
}