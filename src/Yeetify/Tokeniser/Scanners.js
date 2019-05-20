import {Token, TokenTypes} from './Token';
import {Symbols} from './Symbols';

class Scanner {
    constructor() {
        if (this.constructor === Scanner) {
            throw new TypeError('Abstract class "Widget" cannot be instantiated directly.');
        }

        if (this.get_first_token('test') === undefined) {
            throw new TypeError('Classes extending the Scanner abstract class');
        }
    }
}

class WordScanner extends Scanner {
    static get_first_token(text) {
        let word_re = /^[a-zA-Z]+\w*/;
        let found = word_re.exec(text);
        if (found) return new Token(TokenTypes.word, found[0]);
        return null;
    }
}

class NumberScanner extends Scanner  {
    static get_first_token(text) {
        let hex_re = /^-?0x[0-9a-fA-F]+/;
        let exp_re = /^-?\d*\.?\d+e[+-]?\d+/;
        let num_re = /^-?\d*\.?\d+/;
        let found = hex_re.exec(text);
        if (found) return new Token(TokenTypes.number, found[0]);
        found = exp_re.exec(text);
        if(found) return new Token(TokenTypes.number, found[0]);
        found = num_re.exec(text);
        if (found) return new Token(TokenTypes.number, found[0]);
        return null;
    }
}

class StringScanner extends Scanner  {
    static get_first_token(text) {
        let str_re = /^(['"]).*?(?<!\\)\1/;
        let found = str_re.exec(text);
        if (found) return new Token(TokenTypes.string, found[0]);
        return null;
    }
}

class SpaceScanner extends Scanner  {
    static get_first_token(text) {
        let space_re = /^\s+/;
        let found = space_re.exec(text);
        if (found) return new Token(TokenTypes.space, found[0]);
        return null;
    }
}

class SymbolScanner extends Scanner  {
    static get_first_token(text) {
        for (let i = Symbols.length-1; i >= 0; i--) {
            let text_section = text.slice(0, i+1);
            for (let symbol of Symbols[i]) {
                if (text_section === symbol) return new Token(TokenTypes.symbol, text_section);
            }
        }
        return null;
    }
}

class NewLineScanner extends Scanner {
    static get_first_token(text) {
        if (text[0] === '\n') return new Token(TokenTypes.newline, text[0]);
        return null;
    }
}

class CommentScanner extends Scanner  {
    static get_first_token(text) {
        let comment1_re = /^\/{2}.*/;
        let comment2_re = /^\/\*.*?\*\//;
        let found = comment1_re.exec(text);
        if (found) return new Token(TokenTypes.comment, found[0]);
        found = comment2_re.exec(text);
        if (found) return new Token(TokenTypes.comment, found[0]);
        return null;
    }
}

class PreProcessorScanner extends Scanner {
    static get_first_token(text) {
        let hash_re = /^#.*/; // just a hash seems to be valid
        let found = hash_re.exec(text);
        if (found) return new Token(TokenTypes.preprocessor, found[0]);
        return null;
    }
}

export const Scanners = [
    WordScanner,
    NumberScanner,
    StringScanner,
    SpaceScanner,
    SymbolScanner,
    NewLineScanner,
    CommentScanner,
    PreProcessorScanner,
];