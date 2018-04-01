// A Vigenère Cipher with pseudo-random generated key.
function cipher4fun(key, message){
    // setup variables
    let seed = "";
    key = key.toString();
    message = message.toString();
    for(let i = 0; i < key.length; i++){
        let chr = key.charCodeAt(i);
        if(chr >= 32 && chr <= 126)
            seed += key.charAt(i);
    }
    let buffer = "Cipher4Fun" + seed;
    let buff_max = buffer.length - seed.length;
    let index = buff_max;
    // define function
    let vig = function (n1, n2){
        return (95 + n2 - n1) % 95;
    };
    let get_chr = function(){
        if(index >= buff_max){
            let new_buff = "";
            let chars = buffer.split('').map(c=>94 - (c.charCodeAt(0) - 32));
            for(let i = 0; i < buff_max; i++){
                let chr = chars[i];
                for(let j = i; j < chars.length; j++){
                    chr = vig(chr, 94 - chars[j]);
                }
                new_buff += String.fromCharCode(chr + 32);
            }
            buffer = new_buff + key;
            index = 0;
        }
        let ret = buffer.charCodeAt(index);
        index += 1;
        return ret - 32;
    };
    // transform message
    let result = "";
    for(let i = 0; i < message.length; i++){
        let chr = message.charCodeAt(i);
        if(chr < 32 || chr > 126) {
            result += message[i];
            continue;
        }
        result += String.fromCharCode(vig(chr - 32, get_chr()) + 32);
    }
    return result;
}