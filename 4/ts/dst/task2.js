"use strict";
// 2. Реализуем класс, явно указывая, что он соответствует интерфейсу
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    hello() {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}
// 3. Пример использования
const user = new User("Alice", 24);
user.hello();
