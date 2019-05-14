export default class TokenList {
    constructor(tokens) {
        this.tokens = tokens;
    }

    get tokenString() {
        return this.tokens.join('');
    }

    get length() {
        return this.tokens.length;
    }

    insertAt(index, value) {
        this.tokens.splice(index, 0, value);
    }
}