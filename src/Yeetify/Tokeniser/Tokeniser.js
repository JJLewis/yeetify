import { Token } from './Token';
import TokenList from './TokenList';
import { Scanners } from './Scanners';

export function tokenise(text) {
    return new TokenList(tokenise_as_array(text));
}

function tokenise_as_array(text) {
    let arr = [];
    while (text && text !== '') {
        let token = scan_one_token(text);
        arr.push(token);
        text = text.slice(token.length);
    }
    arr.push(Token.eof());
    return arr;
}

function scan_one_token(text) {
    for (let scanner of Scanners) {
        let token = scanner.get_first_token(text);
        if (token !== null) {
            return token;
        }
    }
    throw new Error(`The scanners could't match the given input: ${text}`);
}
