function outer() {
    var b = 10;
       function inner() {
            
             var a = 20; 
             console.log(a+b);
        }
       return inner;
    }
    var X = outer(); 
    var Y = outer(); 
    //end of outer() function executions
    X(); // X() invoked the first time
    X(); // X() invoked the second time
    X(); // X() invoked the third time
    Y(); // Y() invoked the first time