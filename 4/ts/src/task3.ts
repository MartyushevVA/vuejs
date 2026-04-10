type UserType = {
  name: string;
  age: number;
  hello(): void;
};

class UserClass {
  constructor(public name: string, public age: number) {}

  hello(): void {
    console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
  }
}

const userTyped: UserType = new UserClass("Bob", 30);
userTyped.hello();