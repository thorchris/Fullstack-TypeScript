const { filterDir, filterDirP, filterDirMyPromise, filterDirMyPromise2 } = require("./filterdir")
const { PerformanceObserver, performance } = require('perf_hooks');

/* filterDir(__dirname, ".js", (err, files) => {
    if (err){
        return console.log(err)
    }
    console.log(files)
}) */

//Filterdir Promise
/* filterDirP(__dirname, ".js")
.then(files=>console.log(files))
.catch(e=>console.error(e)) */

//FilterDirP Async
/* async function tester(){
    const files = await filterDirP(__dirname, ".js")
    console.log(files)
}
tester() */


//MyPromise1
/* filterDirMyPromise(__dirname, ".js")
.then(files=>console.log(files)) */

//MyPromise2
/* async function tester() {
  try {
    const files = await filterDirMyPromise2(__dirname, ".js");
    console.log(files);
  } catch (err) {
    console.log(err);
  }
}
tester(); */


async function getFilesSequental() {
    var t0 = performance.now()
  try {
    const r1 = await filterDirMyPromise2("Folder1", ".js");
    const r2 = await filterDirMyPromise2("Folder2", ".js");
    const r3 = await filterDirMyPromise2("Folder3", ".js");
    const r4 = await filterDirMyPromise2("Folder4", ".js");
    const r5 = await filterDirMyPromise2("Folder5", ".js");
    const r6 = await filterDirMyPromise2(__dirname, ".js");
    console.log(`${r1}, ${r2}, ${r3}, ${r4}, ${r5}, ${r6}`);
  } catch (err) {
    console.log(err);
  }
  var t1 = performance.now()
    console.log("Call to getFilesSequental took " + (t1 - t0) + " milliseconds. \n\n")
}
getFilesSequental()


  async function getFilesParallel() {
        var t0 = performance.now()
    try {
      const p1 = await filterDirMyPromise2("Folder1", ".js");
      const p2 = await filterDirMyPromise2("Folder2", ".js");
      const p3 = await filterDirMyPromise2("Folder3", ".js");
      const p4 = await filterDirMyPromise2("Folder4", ".js");
      const p5 = await filterDirMyPromise2("Folder5", ".js");
      const p6 = await filterDirMyPromise2(__dirname, ".js");
      const allResults = await Promise.all([p1, p2, p3, p4, p5, p6]);
      console.log(allResults.join(", "));
    } catch (err) {
      console.log(err);
    }
    var t1 = performance.now()
    console.log("Call to getFilesParallel took " + (t1 - t0) + " milliseconds. \n\n")
  }
  getFilesParallel();