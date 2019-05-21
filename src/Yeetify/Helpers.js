import { TokenTypes } from './Tokeniser/Token';

const yeetableTypes = [TokenTypes.word, TokenTypes.number, TokenTypes.string, TokenTypes.symbol];

export function isTokenYeetable(token) {
    for (let yeetableType of yeetableTypes) if (token.type === yeetableType) return true;
    return false;
}