

function transformToRobberLang (message) {
    var robberMessage = "";
    for (i=0; i < message.length; i++){
        // check if character is a konsonant
        if( 
            (
                message[i] === "b" || message[i] === "c" || message[i] === "d" || message[i] === "f" || message[i] === "g" || message[i] === "h" || message[i] === "j" || 
                message[i] === "k" || message[i] === "l" || message[i] === "m" || message[i] === "n" || message[i] === "p" || message[i] === "q" || message[i] === "r" || 
                message[i] === "s" || message[i] === "t" || message[i] === "v" || message[i] === "w" || message[i] === "x" || message[i] === "z"
                ))
            {
            robberMessage += message[i] + "o" + message[i];
        }
        else {
            robberMessage += message[i];
        }
    }
    return robberMessage;
}

export default transformToRobberLang;