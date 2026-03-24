const statusElement = document.getElementById("protection-status");
const logElement = document.getElementById("event-log");
const enableButton = document.getElementById("enable-protection");
const disableButton = document.getElementById("disable-protection");
const clearLogButton = document.getElementById("clear-log");
const displayElement = document.getElementById("calc-display");
const keysContainer = document.getElementById("calc-keys");

let protectionEnabled = false;
let currentValue = "0";
let storedValue = null;
let currentOperator = null;
let waitingForNextValue = false;

function addLogLine(message) {
    const now = new Date();
    const time = now.toLocaleTimeString("ru-RU");
    const currentText = logElement.textContent.trim();
    const nextLine = `[${time}] ${message}`;

    if (currentText === "[Ожидание действий пользователя]") {
        logElement.textContent = nextLine;
        return;
    }

    logElement.textContent = `${currentText}\n${nextLine}`;
}

function updateProtectionStatus() {
    if (protectionEnabled) {
        statusElement.innerHTML = "<strong>Статус:</strong> защита включена.";
        statusElement.classList.add("is-active");
        document.body.classList.add("protection-enabled");
    } else {
        statusElement.innerHTML = "<strong>Статус:</strong> защита выключена.";
        statusElement.classList.remove("is-active");
        document.body.classList.remove("protection-enabled");
    }
}

function blockEvent(event, description) {
    if (!protectionEnabled) {
        return;
    }

    event.preventDefault();
    addLogLine(description);
}

function handleKeydown(event) {
    if (!protectionEnabled) {
        return;
    }

    const key = event.key.toLowerCase();
    const blockedCombination =
        (event.ctrlKey || event.metaKey) &&
        ["c", "u", "s", "p", "a"].includes(key);

    if (blockedCombination || key === "f12") {
        event.preventDefault();
        addLogLine(`Заблокирована клавиша: ${event.key}`);
    }
}

function attachProtection() {
    document.addEventListener("contextmenu", (event) => {
        blockEvent(event, "Контекстное меню заблокировано.");
    });

    document.addEventListener("copy", (event) => {
        blockEvent(event, "Попытка копирования заблокирована.");
    });

    document.addEventListener("cut", (event) => {
        blockEvent(event, "Попытка вырезания заблокирована.");
    });

    document.addEventListener("dragstart", (event) => {
        blockEvent(event, "Перетаскивание элементов заблокировано.");
    });

    document.addEventListener("selectstart", (event) => {
        blockEvent(event, "Выделение текста заблокировано.");
    });

    document.addEventListener("keydown", handleKeydown);
}

function setProtection(enabled) {
    protectionEnabled = enabled;
    updateProtectionStatus();
    addLogLine(enabled ? "Защита страницы включена." : "Защита страницы выключена.");
}

function updateDisplay() {
    displayElement.textContent = currentValue;
}

function clearCalculator() {
    currentValue = "0";
    storedValue = null;
    currentOperator = null;
    waitingForNextValue = false;
    updateDisplay();
}

function applyOperation(left, right, operator) {
    switch (operator) {
        case "+":
            return left + right;
        case "-":
            return left - right;
        case "*":
            return left * right;
        case "/":
            return right === 0 ? "Ошибка" : left / right;
        default:
            return right;
    }
}

function handleDigit(value) {
    if (waitingForNextValue) {
        currentValue = value;
        waitingForNextValue = false;
    } else {
        currentValue = currentValue === "0" ? value : currentValue + value;
    }

    updateDisplay();
}

function handleOperator(operator) {
    if (currentValue === "Ошибка") {
        clearCalculator();
    }

    const numericValue = Number(currentValue);

    if (storedValue === null) {
        storedValue = numericValue;
    } else if (currentOperator && !waitingForNextValue) {
        const result = applyOperation(storedValue, numericValue, currentOperator);
        storedValue = result;
        currentValue = String(result);
        updateDisplay();
    }

    currentOperator = operator;
    waitingForNextValue = true;
}

function handleEquals() {
    if (storedValue === null || currentOperator === null || waitingForNextValue) {
        return;
    }

    const result = applyOperation(storedValue, Number(currentValue), currentOperator);
    currentValue = String(result);
    storedValue = null;
    currentOperator = null;
    waitingForNextValue = true;
    updateDisplay();
}

function handleKeyClick(event) {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const { value, action } = button.dataset;

    if (action === "clear") {
        clearCalculator();
        return;
    }

    if (action === "equals") {
        handleEquals();
        return;
    }

    if (value && /\d/.test(value)) {
        handleDigit(value);
        return;
    }

    if (value) {
        handleOperator(value);
    }
}

enableButton.addEventListener("click", () => setProtection(true));
disableButton.addEventListener("click", () => setProtection(false));
clearLogButton.addEventListener("click", () => {
    logElement.textContent = "[Ожидание действий пользователя]";
});
keysContainer.addEventListener("click", handleKeyClick);

attachProtection();
updateProtectionStatus();
updateDisplay();
