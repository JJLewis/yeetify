export const TokenTypes = Object.freeze({
    'null':0,
    'word':1,
    'number':2,
    'string':3,
    'symbol':4,
    'space':5,
    'comment':6,
    'newline':7,
    'preprocessor':8
});

export class Token {
    constructor(type, value) {
        this.type = type
        this.value = value
        this._length = this.value.length
    }

    get length() {
        return this.value.length;
    }

    static null() {
        return new Token(TokenTypes.null, '');
    }
}
