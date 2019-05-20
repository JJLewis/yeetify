export default class TokenList {
    constructor(tokens) {
        this.tokens = tokens;
    }

    get tokenString() {
        return this.tokens.map(token => token.type).join('');
    }

    get valueString() {
        return this.tokens.map(token => token.value).join('');
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

    prependTokens(tokens) {
        this.tokens = tokens + this.tokens;
    }
}