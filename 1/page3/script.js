function task1() {
    let input = prompt("Введите натуральные числа через пробел:");
    let arr = input.split(" ").map(Number);

    arr.sort((a, b) => a - b);

    alert("Отсортированный список: " + arr.join(" "));
}

function task2() {
    let input = prompt("Введите натуральные числа через пробел:");
    let arr = input.split(" ").map(Number);

    function modFive(numbers) {
        return numbers.map(num => num % 5);
    }

    alert("Остатки: " + modFive(arr).join(" "));
}

function median(...numbers) {
    numbers.sort((a, b) => a - b);

    let mid = Math.floor(numbers.length / 2);

    if (numbers.length % 2 === 0) {
        return (numbers[mid - 1] + numbers[mid]) / 2;
    }
    return numbers[mid];
}

function task3() {
    let input = prompt("Введите числа через пробел:");
    let arr = input.split(" ")
                   .map(Number)
                   .filter(Number.isFinite);

    if (arr.length === 0) {
        alert("Пустой ввод");
        return;
    }

    let result1 = median(...arr);

    let result2 = median.apply(null, arr);

    alert(
        "Медиана (через распаковку): " + result1 +
        "\nМедиана (через apply): " + result2
    );
}

function task4() {
    let str = prompt("Введите строку из скобок:");
    let stack = [];

    for (let char of str) {
        if (char === "(") {
            stack.push(char);
        } else if (char === ")") {
            if (stack.length === 0) {
                alert("Неправильная");
                return;
            }
            stack.pop();
        }
    }

    if (stack.length === 0) {
        alert("Правильная");
    } else {
        alert("Неправильная");
    }
}

function deepCopy(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepCopy(item));
    }

    let copy = {};
    for (let key in obj) {
        copy[key] = deepCopy(obj[key]);
    }
    return copy;
}

function task5() {
    let original = {
        a: 1,
        b: { c: 2 },
        d: [1, 2, { e: 3 }]
    };

    let cloned = deepCopy(original);

    alert("Объект успешно скопирован.\nПроверьте в консоли.");

    console.log("Original:", original);
    console.log("Clone:", cloned);
}