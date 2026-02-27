function task1() {
    let month = Number(prompt("Введите номер месяца (1-12):"));

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
    let n = Number(prompt("Введите n:"));

    function isPrime(num) {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
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

    let value1 = Number(prompt("Введите число для add:"));
    Counter.add(value1);

    let value2 = Number(prompt("Введите число для sub:"));
    Counter.sub(value2);

    alert("Текущее значение count: " + Counter.count);
}

function task4() {
    let words = prompt("Введите слова через запятую:");
    alert(words.split(",").join("."));
}

function task5() {
    let str = prompt("Введите строку:");
    let cleaned = str.toLowerCase().replace(/\s/g, "");

    if (cleaned === cleaned.split("").reverse().join("")) {
        alert("Да");
    } else {
        alert("Нет");
    }
}