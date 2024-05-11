export function convertFromBinary(decimalArray) {
    const multiplied = decimalArray.map(num => Math.round(num * 70));

    const binaryArray = multiplied.map(num => {
        let binary = num.toString(2);
        while (binary.length < 3) {
            binary = '0' + binary;
        }
        return binary;
    });

    let concatenatedBinary = '';
    for (let i = 0; i < binaryArray.length; i += 3) {
        concatenatedBinary += binaryArray.slice(i, i + 3).join('');
    }
    concatenatedBinary = concatenatedBinary.padEnd(9, '0');
    const resultArray = concatenatedBinary.split('').map((bit, index) => {
        if ((index + 1) % 9 !== 7) {
            return bit;
        }
    }).filter(Boolean).join('');

    const text = resultArray
    .match(/.{1,8}/g)
    .map(binary => String.fromCharCode(parseInt(binary, 2)))
    .join('')
    .replace(/[^a-zA-Z0-9!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~\s]/g, '');

    return text;
}



