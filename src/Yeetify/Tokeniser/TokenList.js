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

    getAt(index) {
        return this.tokens[index];
    }

    insertAt(index, token) {
        this.tokens.splice(index, 0, token);
    }
}