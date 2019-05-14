export const TokenTypes = Object.freeze({
    'null':0,
    'word':1,
    'number':2,
    'string':3,
    'symbol':4,
    'space':5,
    'comment':6,
    'newline':7,
    'preprocessor':8,
    'eof':9
});

export class Token {
    constructor(type, value) {
        this.type = type
        this.value = value
    }

    get length() {
        return this.value.length;
    }

    static null() {
        return new Token(TokenTypes.null, '');
    }

    static eof() {
        return new Token(TokenTypes.eof, '');
    }
}
