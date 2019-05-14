import { Token } from '.Token';
import TokenList from '.TokenList';
import { Scanners } from '.Scanners';

export function tokenise(text) {
    return TokenList(tokenise_as_array(text));
}

function tokenise_as_array(text) {
    let arr = [];
    while (text && text !== '') {
        let token = scan_one_token(text);
        arr.push(token);
        text = text.slice(0, token.length);
    }
    arr.push(Token.eof());
    return arr;
}

function scan_one_token(text) {
    for (let scanner in Scanners) {
        let token = scanner.get_first_token(text);
        if (token !== null) {
            return token;
        }
    }
    throw `The scanners could't match the given input: ${text}`;
}
