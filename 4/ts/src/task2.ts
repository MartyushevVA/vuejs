interface IUser {
  name: string;
  age: number;
  hello(): void;
}

class User implements IUser {
  constructor(public name: string, public age: number) {}

  hello(): void {
    console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
  }
}

const user: IUser = new User("Alice", 24);
user.hello();