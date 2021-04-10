//a) Create a TypeScript interface IBook, which should encapsulate information about a book, including:
//d) Change the interface to make published and pages become optional - Verify the new behaviour.
//e) Change the interface to make author readonly - Verify the new behaviour.

interface IBook {
    readonly author: string,
    title: string, 
    published?:Date,
    pages?:number,
    run(arg: any):void; //method
}

//b) Create a function that takes an IBook instance and test it with an object instance.
function logger(book: IBook){
    console.log(`Author: ${book.author}, Title: ${book.title}, Published: ${book.published}, Pages: ${book.pages}`)
}

//Optional fields
function loggerv2(book: IBook){
    console.log(`Author: ${book.author}, Title: ${book.title}`)
}

//f) Create a class Book and demonstrate the "Java way" of implementing an interface.
class ImplementInterface implements IBook{
    author: string
    title: string
    published?: Date
    pages?: number
    constructor(author: string, title: string) {
        this.author = author;
        this.title = title
    }
    run(arg: any): void {
        console.log(`running: ${this.author}, ${this.title}`);
    }
}

    let lmplementInterface: IBook = new ImplementInterface('JK Rowling', 'Harry Potter');

    lmplementInterface.run("test");


//c) Given the example above, explain what is meant by the term Duck Typing, when TypeScript interfaces are discussed.
/*
DUCK TYPING
The concept is known as Duck typing. The duck-typing feature provides type safety in TypeScript code.
Through the duck-typing rule TypeScript compiler checks that an object is same as other object or not.
According to the duck-typing method, both objects must have the same properties/variables types.
*/


