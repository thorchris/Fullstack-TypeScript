//a) Create an interface to describe a function: myFunc that should take three string parameters and return a String Array.
interface myFunc {
    (a: string, b: string, c: string): string[];
}

//b) Design a function "implementing" this interface which returns an array with the three strings
let f1 : myFunc
f1 = function (a:string, b:string, c:string) {
    return [a, b, c]
}

//c) Design another implementation that returns an array, with the three strings uppercased.
function upperCaseAray(a:string, b: string, c:string){
    let returnArray = [a,b,c]
    returnArray.forEach(element => {
        element.toLocaleUpperCase
    });
    return returnArray
}

//e) Test f2 with the two implementations created in b+c.
let f2 = function logger(f1: myFunc){
    //Simulate that we get data from somewhere and uses the provided function
    let [ a, b, c] = ["A", "B", "C"];
    console.log(f1(a,b,c));
}

