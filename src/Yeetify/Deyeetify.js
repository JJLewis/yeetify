import { tokenise } from './Tokeniser/Tokeniser';
import TokenList from './Tokeniser/TokenList';
import { TokenTypes } from './Tokeniser/Token';
import { isTokenYeetable } from './Helpers';

export function deyeetify(text) {
    let tokenlist = tokenise(text);
    let extracted = extractYeetDefines(tokenlist);
    let cleanedTokenList = extracted[0];
    let yeetMappings = extracted[1];
    mapBackToOriginal(cleanedTokenList, yeetMappings);
    return cleanedTokenList.valueString;
}

function extractYeetDefines(tokenlist) {
    let yeetMappings = {};
    let cleanedTokens = [];
    for (let i = 0; i < tokenlist.length; i++) {
        let token = tokenlist.getAt(i);
        if (token.type === TokenTypes.preprocessor) {
            let extractRe = /^\s*#\s*define\s+([yY][eE]{2,}[tT])\s+(.+)$/;
            let found = extractRe.exec(token.value);
            if (found) {
                yeetMappings[found[1]] = found[2];
                if (i+1 < tokenlist.length && tokenlist.getAt(i+1).type === TokenTypes.newline) i++; // skip over next if newline after #define yeet
            } else cleanedTokens.push(token);
        } else cleanedTokens.push(token);
    }
    return [new TokenList(cleanedTokens), yeetMappings];
}

function mapBackToOriginal(tokenlist, yeetMappings) {
    for (let i = 0; i < tokenlist.length; i++) {
        let token = tokenlist.getAt(i);
        if (isTokenYeetable(token)) {
            token.value = yeetMappings[token.value];
        }
    }
}