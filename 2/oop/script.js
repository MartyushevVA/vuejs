let activeInputResolver = null;

function ensureModals() {
    if (document.getElementById("input-modal-overlay")) {
        return;
    }

    const style = document.createElement("style");
    style.textContent = `
        #input-modal-overlay {
            position: fixed;
            inset: 0;
            display: none;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.25);
            z-index: 1000;
        }

        .modal-box {
            width: min(360px, calc(100vw - 24px));
            padding: 14px;
            border: 1px solid #d0d0d0;
            background: #ffffff;
            font-family: Arial, sans-serif;
        }

        .modal-title {
            margin: 0 0 10px;
            font-size: 14px;
            font-weight: 700;
        }

        .modal-input {
            width: 100%;
            padding: 8px;
            border: 1px solid #c8c8c8;
            box-sizing: border-box;
        }

        .modal-actions {
            margin-top: 10px;
            display: flex;
            justify-content: flex-end;
            gap: 6px;
        }

        .modal-actions button {
            padding: 6px 10px;
            border: 1px solid #c8c8c8;
            background: #f6f6f6;
            cursor: pointer;
        }

    `;
    document.head.appendChild(style);

    const inputOverlay = document.createElement("div");
    inputOverlay.id = "input-modal-overlay";
    inputOverlay.innerHTML = `
        <div class="modal-box">
            <h2 id="input-modal-title" class="modal-title"></h2>
            <input id="input-modal-field" class="modal-input" type="text" />
            <div class="modal-actions">
                <button id="input-modal-cancel" type="button">Cancel</button>
                <button id="input-modal-ok" type="button">OK</button>
            </div>
        </div>
    `;

    document.body.appendChild(inputOverlay);

    const inputField = document.getElementById("input-modal-field");
    const inputOk = document.getElementById("input-modal-ok");
    const inputCancel = document.getElementById("input-modal-cancel");

    function closeInput(result) {
        if (!activeInputResolver) {
            return;
        }

        const resolver = activeInputResolver;
        activeInputResolver = null;
        inputOverlay.style.display = "none";
        resolver(result);
    }

    inputOk.addEventListener("click", () => closeInput({ cancelled: false, value: inputField.value }));
    inputCancel.addEventListener("click", () => closeInput({ cancelled: true, value: null }));

    inputField.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            closeInput({ cancelled: false, value: inputField.value });
        }

        if (event.key === "Escape") {
            closeInput({ cancelled: true, value: null });
        }
    });

}

function showInputModal(title, placeholder) {
    ensureModals();

    const inputOverlay = document.getElementById("input-modal-overlay");
    const titleEl = document.getElementById("input-modal-title");
    const input = document.getElementById("input-modal-field");

    titleEl.textContent = title;
    input.value = "";
    input.placeholder = placeholder || "";
    inputOverlay.style.display = "flex";

    setTimeout(() => input.focus(), 0);

    return new Promise((resolve) => {
        activeInputResolver = resolve;
    });
}

async function askRequiredText(title, placeholder) {
    while (true) {
        const result = await showInputModal(title, placeholder);

        if (result.cancelled) {
            return null;
        }

        const value = result.value.trim();
        if (value.length > 0) {
            return value;
        }

        console.log("Ошибка: поле не должно быть пустым.");
    }
}

async function askValidAge(title) {
    while (true) {
        const result = await showInputModal(title);

        if (result.cancelled) {
            return null;
        }

        const age = Number(result.value);
        if (Number.isInteger(age) && age >= 1 && age <= 100) {
            return age;
        }

        console.log("Ошибка: возраст должен быть целым числом от 1 до 100.");
    }
}

async function askValidTel(title) {
    const pattern = /^\+7\d{10}$/;

    while (true) {
        const result = await showInputModal(title, "+7...");

        if (result.cancelled) {
            return null;
        }

        const tel = result.value.trim();
        if (pattern.test(tel)) {
            return tel;
        }

        console.log("Ошибка: некорректный телефон. Формат: +7xxxxxxxxxx");
    }
}

function UserFunction(name, age) {
    this.name = name;
    this.age = age;
}

UserFunction.prototype.hello = function () {
    const message = `Hi! My name is ${this.name}. And I am ${this.age} years old.`;
    console.log(message);
    return message;
};

class User {
    #age;

    constructor(name, age, tel) {
        this.name = name;
        this.age = age;
        if (typeof tel === "string" && tel.trim().length > 0) {
            this.tel = tel;
        }
    }

    hello() {
        const message = `Hi! My name is ${this.name}. And I am ${this.age} years old.`;
        console.log(message);
        return message;
    }

    get tel() {
        return this._tel;
    }

    set tel(value) {
        const phonePattern = /^\+7\d{10}$/;
        if (!phonePattern.test(value)) {
            throw new Error("Некорректный телефон. Формат: +7xxxxxxxxxx");
        }

        this._tel = value;
    }

    get age() {
        return this.#age;
    }

    set age(value) {
        if (!Number.isInteger(value) || value < 1 || value > 100) {
            throw new Error("Возраст должен быть целым числом от 1 до 100.");
        }

        this.#age = value;
    }
}

class Student extends User {
    #knowledge = 0;

    hello() {
        const message = `Hi! My name is ${this.name}. I am ${this.age} years old. And I am a student!`;
        console.log(message);
        return message;
    }

    learn() {
        this.#knowledge += 1;
        return this.#knowledge;
    }

    get knowledge() {
        return this.#knowledge;
    }
}

const originalReverse = Array.prototype.reverse;

Object.defineProperty(Array.prototype, "reverse", {
    configurable: true,
    writable: true,
    value: function reverseAsDuplicate() {
        return this.concat(this);
    }
});

async function task1() {
    const name = await askRequiredText("Task 1: Введите имя:");
    if (name === null) {
        return;
    }

    const age = await askValidAge("Task 1: Введите возраст:");
    if (age === null) {
        return;
    }

    const user = new User(name, age);
    user.hello();
}

async function task2() {
    const name = await askRequiredText("Task 2: Введите имя:");
    if (name === null) {
        return;
    }

    const age = await askValidAge("Task 2: Введите возраст:");
    if (age === null) {
        return;
    }

    const user = new UserFunction(name, age);
    user.hello();
}

async function task3() {
    const name = await askRequiredText("Task 3: Введите имя:");
    if (name === null) {
        return;
    }

    const age = await askValidAge("Task 3: Введите возраст:");
    if (age === null) {
        return;
    }

    const tel = await askValidTel("Task 3: Введите телефон:");
    if (tel === null) {
        return;
    }

    const user = new User(name, age, tel);
    const message = `Имя: ${user.name}\nВозраст: ${user.age}\nТелефон: ${user.tel}`;

    console.log(message);
}

async function task4() {
    const name = await askRequiredText("Task 4: Введите имя:");
    if (name === null) {
        return;
    }

    const age = await askValidAge("Task 4: Введите возраст:");
    if (age === null) {
        return;
    }

    const tel = await askValidTel("Task 4: Введите телефон:");
    if (tel === null) {
        return;
    }

    const user = new User(name, age, tel);

    const newAge = await askValidAge("Task 4: Введите новый возраст:");
    if (newAge === null) {
        return;
    }

    user.age = newAge;

    const message = `Возраст после изменения: ${user.age}`;
    console.log(message);
}

async function task5() {
    const name = await askRequiredText("Task 5: Введите имя:");
    if (name === null) {
        return;
    }

    const age = await askValidAge("Task 5: Введите возраст:");
    if (age === null) {
        return;
    }

    const tel = await askValidTel("Task 5: Введите телефон:");
    if (tel === null) {
        return;
    }

    const student = new Student(name, age, tel);
    const helloMessage = student.hello();

    const before = student.knowledge;
    student.learn();
    student.learn();
    const after = student.knowledge;

    const message = `${helloMessage}\nKnowledge before learning: ${before}\nKnowledge after learning: ${after}`;

    console.log(message);
}

async function task6() {
    const arr = [1, 2, 3, 4, 5];
    const result = arr.reverse();

    const message = `[1,2,3,4,5].reverse() => [${result.join(",")}]\n(Оригинальная reverse сохранена в переменной originalReverse)`;

    console.log(message);
}
