import { Token, TokenTypes } from '.Tokeniser/Token';
import { tokenise } from '.Tokeniser/Tokenise';

const yeetableTypes = [TokenTypes.word, TokenTypes.number, TokenTypes.string, TokenTypes.symbol];

export function yeetify(text) {
    let tokenlist = tokenise(text);
    let yeetableTokens = getYeetableTokens(tokenlist); // returns dictionary {token value : token value}
    let yeets = generateYeets(yeetableTokens.length);
    shuffle(yeets); // so different order everytime.
    let yeetMappings = mapYeetsToYeetableTokens(yeets, yeetableTokens);
    let hashDefineTokens = generateHashDefineTokens(yeetMappings);
    padSymbols(tokenlist);
    tokenlist.prependTokens(hashDefineTokens);
    mapTokensToYeets(tokenlist, yeetMappings);
    return tokenlist.valueString;
}

function isTokenYeetable(token) {
    for (let yeetableType in yeetableTypes) if (token.type === yeetableType) return true;
    return false;
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
        let binArr = bin.split('');

        // Make yeet from bin
        let yeet = binArr.shift() === '0' ? 'y' : 'Y';
        for (let b = 0; b < binArr.length; b++) {
            yeet += binArr.shift() === '0' ? 'e' : 'E';
        }
        yeet += binArr.shift() === '0' ? 't' : 'T';
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
    for (let yeetableToken in yeetableTokens) {
        yeetMappings[yeetableToken] = yeets.shift();
    }
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
    let i = 0;
    while (i < tokenlist.length) {
        if (tokenlist.getAt(i).type === TokenTypes.symbol) {
            tokenlist.insertAt(i-1, new Token(TokenTypes.space, ' '));
            tokenlist.insertAt(i+1, new Token(TokenTypes.space, ' '));
            i += 2; // TODO: check if this is right
            continue;
        }
        i++;
    }
}

function mapTokensToYeets(tokenlist, yeetMappings) {
    for (let i = 0; i < tokenlist.length; i++) {
        let token = tokenlist.getAt(i);
        if (isTokenYeetable(token)) token.value = yeetMappings[token.value];
    }
}