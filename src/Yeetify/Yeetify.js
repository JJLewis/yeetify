import { Token, TokenTypes } from '.Tokeniser/Token';
import { tokenise } from '.Tokeniser/Tokenise';

export function yeetify(text) {
    let tokenlist = tokenise(text);
    padSymbols(tokenlist);
    // TODO: generate yeets
    // match up yeets to tokens (shouldn't match with space, comment, or preprocessor token types)
    // generate #defines
    // update all the values of the tokens accorning to mapping
}

function padSymbols(tokenlist) {
    for (let i = 0; i < tokenlist.length; i++) {
        if (tokenlist.getAt(i).type === TokenTypes.space) {
            tokenlist.insertAt(i-1, new Token(TokenTypes.space, ' '));
            tokenlist.insertAt(i+1, new Token(TokenTypes.space, ' '));
            i += 2; // TODO: check if this is right
        }
    }
}