//Module exports
console.log(__filename)
console.log(__dirname)

const EventEmitter = require('events')

var url = "http://mylogger.io/log";

class Logger extends EventEmitter{
    log(msg){
        //Send HTTP request
        console.log(msg)
    
        //Raise an event
        this.emit('messageLogged', {id: 1, url: "http://"});
    }
}

module.exports = Logger;

