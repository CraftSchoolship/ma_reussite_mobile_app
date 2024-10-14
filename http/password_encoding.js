import config from "./config"

const caesarCipherEncode = (value, shift) => value.split('').map(char => {
    let charCode = char.charCodeAt(0);

    // Check for uppercase letters
    if (charCode >= 65 && charCode <= 90) {
        return String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
    }
    // Check for lowercase letters
    else if (charCode >= 97 && charCode <= 122) {
        return String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
    }
    // If it's not a letter, return the character as is
    return char;
}).join('');

export const encode = (value) => {
    let key = config.passwordEncodingKey;
    value = caesarCipherEncode(value, key.length % 26);

    let chars = value.split('')

    while(key.length < chars.length)
        key = key + config.passwordEncodingKey;

    key = key.substring(0, chars.length)
    let keyChars = key.split('')

    let result = '';
    for (let i=0; i<chars.length; i++)
        result += chars[i] + keyChars[i];

    return result
}

export const decode = (value) => {
    let key = config.passwordEncodingKey;

    let result = '';
    for (let i=0; i<value.length; i+=2)
        result += value[i];

    return caesarCipherEncode(result, 26 - (key.length % 26));
}
