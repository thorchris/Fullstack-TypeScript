//const fetch = require("node-fetch")
import fetch from "node-fetch"

function messageDelay(msg, delay) {
    return new Promise((res, reject) => {
        setTimeout(() => {
            if(msg.length === 0 ){
                reject("No message")
            }
            const upperCased = msg.toUpperCase();
            res(upperCased)
        }, delay)
    })
}

//Classic promise
/* messageDelay("Hi class", 1000)
.then(uMsg => console.log(uMsg))
.catch(err => console.log("No message")) */


//Promise.any 
const promises = [
    messageDelay("Message 1.5 SEK Delay", 1500),
    messageDelay("Message 1 SEK Delay", 1000),
    messageDelay("Message 2 SEK Delay", 2000),
]

Promise.any(promises).then((upperCased) => console.log(upperCased));






