"use strict";
//b) Design a function "implementing" this interface which returns an array with the three strings
let f1;
f1 = function (a, b, c) {
    return [a, b, c];
};
//c) Design another implementation that returns an array, with the three strings uppercased.
function upperCaseAray(a, b, c) {
    let returnArray = [a, b, c];
    returnArray.forEach(element => {
        element.toLocaleUpperCase;
    });
    return returnArray;
}
//e) Test f2 with the two implementations created in b+c.
let f2 = function logger(f1) {
    //Simulate that we get data from somewhere and uses the provided function
    let [a, b, c] = ["A", "B", "C"];
    console.log(f1(a, b, c));
};
//# sourceMappingURL=interfaces2.js.map