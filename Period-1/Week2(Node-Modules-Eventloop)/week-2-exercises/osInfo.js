const os = require("os");

    var totalMem = os.totalmem();
    var freeMem = os.freemem();
    var platform = os.platform();
    var osType = os.type();
    var EOL = os.EOL;

    var osInfo = {
        platform: platform,
        type: osType,
        freeMemory: freeMem,
        totalMemory: totalMem,
        EOL: EOL,
      };

    console.log(osInfo)

  
module.exports = osInfo;