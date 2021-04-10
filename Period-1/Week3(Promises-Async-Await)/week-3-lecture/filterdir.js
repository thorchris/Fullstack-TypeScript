const fs = require("fs")
const util = require("util")

const readdir = util.promisify(fs.readdir)

function filterDir(path, ext, cb) {
    fs.readdir(path, (err, b) => {
      if (err) {
        cb(err)
      }
      const filtered = b.filter(f => f.endsWith(ext))
      cb(null, filtered);
    })
  }

  function filterDirMyPromise(path, ext) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, b) => {
        if (err) {
          reject(err);
        }
        const filtered = b.filter((f) => f.endsWith(ext));
        resolve(filtered);
      });
    });
  }
  

function filterDirMyPromise2(path, ext) {
  return new Promise((resolve, reject) => {
    filterDir(path, ext, (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
}


  function filterDirP(path, ext) {
    return readdir(path)
    .then(files => {
        const filtered = files.filter(f => f.endsWith(ext))
        return filtered;
    })
  }

  module.exports.filterDir = filterDir;
  module.exports.filterDirP = filterDirP;
  module.exports.filterDirMyPromise = filterDirMyPromise;
  module.exports.filterDirMyPromise2 = filterDirMyPromise2;
  