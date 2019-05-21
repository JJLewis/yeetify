import { Token, TokenTypes } from './Tokeniser/Token';
import { tokenise } from './Tokeniser/Tokeniser';
import TokenList from './Tokeniser/TokenList';
import { isTokenYeetable } from './Helpers';

export function yeetify(text) {
    let tokenlist = tokenise(text);
    let yeetableTokens = getYeetableTokens(tokenlist); // returns dictionary {token value : token value}
    let yeets = generateYeets(Object.keys(yeetableTokens).length);
    shuffle(yeets); // so different order everytime.
    let yeetMappings = mapYeetsToYeetableTokens(yeets, yeetableTokens);
    let hashDefineTokens = generateHashDefineTokens(yeetMappings);
    let padded = padSymbols(tokenlist);
    padded.prependTokens(hashDefineTokens);
    mapTokensToYeets(padded, yeetMappings);
    return padded.valueString;
}

function getYeetableTokens(tokenlist) {
    let yeetableTokens = {};
    for (let i = 0; i < tokenlist.length; i++) {
        let token = tokenlist.getAt(i);
        if (isTokenYeetable(token)) yeetableTokens[token.value] = token.value;
    }
    return yeetableTokens;
}

function generateYeets(nYeets) {
    let yeets = [];
    let currentPower = 4;
    let currentCount = 0;
    for (let i = 0; i < nYeets; i++) {
        let bin = parseInt(String(currentCount), 10).toString(2);
        bin = '0'.repeat(currentPower - bin.length) + bin;

        // Make yeet from bin
        let yeet = bin[0] === '0' ? 'y' : 'Y';
        for (let b = 1; b < bin.length-1; b++) {
            yeet += bin[b] === '0' ? 'e' : 'E';
        }
        yeet += bin[bin.length-1] === '0' ? 't' : 'T';
        yeets.push(yeet);

        currentCount++;
        // if the next one is greater than current max (i.e. all caps), reset
        if (currentCount === Math.pow(2, currentPower)) {
            currentPower++;
            currentCount = 0;
        }
    }
    return yeets;
}

// In place shuffle
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function mapYeetsToYeetableTokens(yeets, yeetableTokens) {
    let yeetMappings = {};
    for (let yeetableToken in yeetableTokens) yeetMappings[yeetableToken] = yeets.shift();
    return yeetMappings;
}

function generateHashDefineTokens(yeetMappings) {
    let defines = [];
    for (let value in yeetMappings) {
        defines.push(new Token(TokenTypes.preprocessor, `#define ${yeetMappings[value]} ${value}\n`));
    }
    return defines;
}

function padSymbols(tokenlist) {
    let padded = [];
    for (let i = 0; i < tokenlist.length; i++) {
        let token = tokenlist.getAt(i);
        if (token.type === TokenTypes.symbol) {
            if (i-1 >= 0 && tokenlist.getAt(i-1).type !== TokenTypes.space) padded.push(new Token(TokenTypes.space, ' '));
            padded.push(token);
            if (i+1 < tokenlist.length && tokenlist.getAt(i+1).type !== TokenTypes.space) padded.push(new Token(TokenTypes.space, ' '));
        } else padded.push(token);
    }
    return new TokenList(padded);
}

function mapTokensToYeets(tokenlist, yeetMappings) {
    for (let i = 0; i < tokenlist.length; i++) {
        let token = tokenlist.getAt(i);
        if (isTokenYeetable(token)) token.value = yeetMappings[token.value];
    }
}