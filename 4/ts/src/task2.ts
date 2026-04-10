// 1. Описываем интерфейс для экземпляров класса
interface IUser {
  name: string;
  age: number;
  hello(): void;
}

// 2. Реализуем класс, явно указывая, что он соответствует интерфейсу
class User implements IUser {
  constructor(public name: string, public age: number) {}

  hello(): void {
    console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
  }
}

// 3. Пример использования
const user: IUser = new User("Alice", 24);
user.hello();