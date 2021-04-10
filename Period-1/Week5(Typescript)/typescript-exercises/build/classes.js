"use strict";
//A) The declaration below defines a Shape class, which as it's only properties has a color field +  a getArea() and a getPerimeter() function which both returns undefined.
//This is the closest we get to an abstract method in Java.
class Shape {
    constructor(color) {
        this.color = color;
    }
    get getColor() { return this.color; }
    set setColor(color) { this.color = color; }
    toString() { return `area: ${this.area}, perimiter: ${this.perimeter}, color: ${this.color}`; }
}
//Provide the class with a nice (using template literals) toString() method  + a getter/setter for the colour property.
//Verify that you cannot (why) make an instance of this class.
//B) Create a new class Circle that should extend the Shape class.
class Circle extends Shape {
    constructor(color, radius) {
        super(color);
        this.radius = radius;
    }
    get area() { return 30; }
    get perimeter() { return 30; }
    get getRadius() { return this.radius; }
    set setRadius(radius) { this.radius = radius; }
}
//C) Create a new class Cylinder (agreed, definitely not a perfect inheritance example) that should extend the Circle class.
class Cylinder extends Circle {
    constructor(color, radius, height) {
        super(color, radius);
        this.height = height;
    }
    get area() { return 50; }
    get perimeter() { throw new Error("Not implemented"); }
    get volume() { return 400; }
    get getHeight() { return this.height; }
    set setHeight(height) { this.height = height; }
}
//# sourceMappingURL=classes.js.map