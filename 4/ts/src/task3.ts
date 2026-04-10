// 1. Создаём псевдоним типа, описывающий форму объекта
type UserType = {
  name: string;
  age: number;
  hello(): void;
};

// 2. Сам класс (в TS классы не могут "наследовать" type alias через implements,
// поэтому тип применяется к переменной-экземпляру)
class UserClass {
  constructor(public name: string, public age: number) {}

  hello(): void {
    console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
  }
}

// 3. Типизируем экземпляр через псевдоним
const userTyped: UserType = new UserClass("Bob", 30);
userTyped.hello();