"use strict";
// 2. Сам класс (в TS классы не могут "наследовать" type alias через implements,
// поэтому тип применяется к переменной-экземпляру)
class UserClass {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    hello() {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}
// 3. Типизируем экземпляр через псевдоним
const userTyped = new UserClass("Bob", 30);
userTyped.hello();
