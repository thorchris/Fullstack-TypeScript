
//Require
//const logger = require("./logger")

//logger.log("message")


//Path object
const path = require('path')

var pathObject = path.parse(__filename);

console.log(pathObject)

//Total mem / free mem
const os = require('os')

var totalMem = os.totalmem();
var freeMem = os.freemem();


//Template String ES6
console.log(`Total Memory: ${totalMem}`)
console.log(`Free Memory: ${freeMem}`)

//Files in node
//Sync
const fs = require('fs')
const files = fs.readdirSync('./')

console.log(files)

//Files in node
//Async
fs.readdir('./', function(err, files){
    if (err) console.log('Error', err);
    else console.log('Result', files)
})

//Events
//Emit = making a noice, produce - signalinning
const EventEmitter = require('events')

const Logger = require("./logger");
const logger = new Logger();

//Register a listener - ON/AddEventListener = the same
logger.on('messageLogged', (e) =>{
    console.log("Listener called", e)
})

logger.log('message')


//HTTP
const http = require("http");

const server = http.createServer((req, res)=>{
    if(req.url === "/"){
        res.write("Hello World");
        res.end();
    }

    if(req.url === "/api/numbers"){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});

server.listen(3000);

console.log("Listening on port 3000...")

