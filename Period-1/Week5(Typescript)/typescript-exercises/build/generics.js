"use strict";
//a) Implement a generic function which will take an array of any kind, and return the array reversed
//(just use the built-in reverse function), so the three first calls below will print the reversed array, and the last call will fail.
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _value;
function reverseArr(array) {
    return array.reverse();
}
console.log(reverseArr(["a", "b", "c"]));
console.log(reverseArr([1, 2, 3]));
console.log(reverseArr([true, true, false]));
//console.log(reverseArr<number>(["a","b","c"]));
//b) Implement a generic Class DataHolder that will allow us to create instances as sketched below:
class DataHolder {
    constructor(value) {
        _value.set(this, void 0);
        __classPrivateFieldSet(this, _value, value);
    }
    ;
    get getValue() { return __classPrivateFieldGet(this, _value); }
    set setValue(value) { __classPrivateFieldSet(this, _value, value); }
}
_value = new WeakMap();
let d = new DataHolder("Hello");
console.log(d.getValue);
d.setValue = "World";
console.log(d.getValue);
let d2 = new DataHolder(123);
console.log(d2.getValue);
d2.setValue = 500;
console.log(d2.getValue);
//Verify that once created, an instance can only be used with the type it was created from.
// d.setValue(23); FAILS: becuase d was created with string, not numbers
//c) Rewrite the example above to user getters and setters instead of the silly getXX and setXX methods
//# sourceMappingURL=generics.js.map