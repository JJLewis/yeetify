import { Token, TokenTypes } from '.Tokeniser/Token';
import { tokenise } from '.Tokeniser/Tokenise';

const yeetableTypes = [TokenTypes.word, TokenTypes.number, TokenTypes.string, TokenTypes.symbol];

export function yeetify(text) {
    let tokenlist = tokenise(text);
    let yeetableTokens = getYeetableTokens(tokenlist);
    let yeets = generateYeets(yeetableTokens.length);
    shuffle(yeets); // so different order everytime.
    padSymbols(tokenlist);
    // match up yeets to tokens (shouldn't match with space, comment, or preprocessor token types)
    // generate #defines
    // update all the values of the tokens accorning to mapping
}

function getYeetableTokens(tokenlist) {
    let yeetableTokens = {};
    for (let i = 0; i < tokenlist.length; i++) {
        let token = tokenlist.getAt(i);
        for (let yeetableType in yeetableTokens) {
            if (token.type === yeetableType) {
                yeetableTokens[token.value] = token.value;
                break;
            }
        }
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

function padSymbols(tokenlist) {
    for (let i = 0; i < tokenlist.length; i++) {
        if (tokenlist.getAt(i).type === TokenTypes.space) {
            tokenlist.insertAt(i-1, new Token(TokenTypes.space, ' '));
            tokenlist.insertAt(i+1, new Token(TokenTypes.space, ' '));
            i += 2; // TODO: check if this is right
        }
    }
}