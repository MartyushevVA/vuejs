function task1() {
    let raw = prompt("Введите номер месяца (1-12):");
    if (raw === null) return;
    let month = Number(raw);

    const months = [
        "Январь", "Февраль", "Март", "Апрель",
        "Май", "Июнь", "Июль", "Август",
        "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    if (month >= 1 && month <= 12) {
        alert(months[month - 1]);
    } else {
        alert("Некорректный номер месяца");
    }
}

function task2() {
    let raw = prompt("Введите n:");
    if (raw === null) return;
    let n = Number(raw);
    if (!Number.isInteger(n) || n < 1) {
        alert("Введите натуральное число");
        return;
    }

    function isPrime(num) {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0) return false;
        }
        return true;
    }

    let primes = [];
    let number = 2;

    while (primes.length < n) {
        if (isPrime(number)) {
            primes.push(number);
        }
        number++;
    }

    alert(primes.join(" "));
}

function task3() {
    let Counter = {
        count: 0,
        add(value) {
            this.count += value;
        },
        sub(value) {
            this.count -= value;
        }
    };

    let raw1 = prompt("Введите число для add:");
    if (raw1 === null) return;
    let value1 = Number(raw1);
    if (!Number.isFinite(value1)) {
        alert("Некорректное число");
        return;
    }
    Counter.add(value1);

    let raw2 = prompt("Введите число для sub:");
    if (raw2 === null) return;
    let value2 = Number(raw2);
    if (!Number.isFinite(value2)) {
        alert("Некорректное число");
        return;
    }
    Counter.sub(value2);

    alert("Текущее значение count: " + Counter.count);
}

function task4() {
    let words = prompt("Введите слова через запятую:");
    if (words === null) return;
    alert(words.split(",").join("."));
}

function task5() {
    let str = prompt("Введите строку:");
    if (str === null) return;
    let cleaned = str.toLowerCase().replace(/[\s,]/g, "");

    if (cleaned === cleaned.split("").reverse().join("")) {
        alert("Да");
    } else {
        alert("Нет");
    }
}

document.getElementById("task1Btn")?.addEventListener("click", task1);
document.getElementById("task2Btn")?.addEventListener("click", task2);
document.getElementById("task3Btn")?.addEventListener("click", task3);
document.getElementById("task4Btn")?.addEventListener("click", task4);
document.getElementById("task5Btn")?.addEventListener("click", task5);
