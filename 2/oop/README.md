# Лаба 2: Javascript OOP

## Что реализовано
- Ввод сделан через DOM-модалку (`showInputModal`) вместо `prompt`.
- Вывод результатов сделан только в консоль (`console.log`).
- Один класс `User` используется в задачах с классами и валидациями.
- `Student` наследуется от `User` и имеет приватное поле знаний.
- `Array.prototype.reverse` переопределен по условию задачи (дублирование массива).

## По заданиям
1. `User` с `name`, `age`, `hello()`.
2. Аналог через функцию-конструктор `UserFunction` + `prototype.hello`.
3. `tel` через getter/setter с форматом `+7xxxxxxxxxx` (защищенное `_tel`).
4. `age` через getter/setter и приватное `#age`, только целые 1..100.
5. `Student extends User`, переопределенный `hello()`, приватное `#knowledge`, метод `learn()`.
6. Переопределение `reverse()` для всех массивов.

## Технические пояснения
### `let activeInputResolver = null;`
- То же назначение, что и в async-лабе: хранит `resolve` текущей модалки ввода.
- Пока модалка открыта, переменная указывает на активный промис.
- После `OK/Cancel` резолвер вызывается и очищается (`null`).

### Как пишется модалка в текущем коде
- `ensureModals()` (в этом файле она создает только input-модалку) один раз добавляет HTML/CSS и события.
- `showInputModal(...)` возвращает `Promise`, поэтому ввод можно обрабатывать через `await`.
- Функции `askRequiredText/askValidAge/askValidTel` делают цикл валидации до корректного значения или `Cancel`.

### Почему `User` объединен в один класс
- Базовая логика пользователя (имя, возраст, телефон, `hello`) находится в одном месте.
- Это убирает дублирование и упрощает наследование `Student extends User`.

### Пояснение по `reverse`
```js
const originalReverse = Array.prototype.reverse;

Object.defineProperty(Array.prototype, "reverse", {
    configurable: true,
    writable: true,
    value: function reverseAsDuplicate() {
        return this.concat(this);
    }
});
```
- `const originalReverse = ...` сохраняет ссылку на исходную реализацию (на случай отката или сравнения).
- `Object.defineProperty(...)` переопределяет метод `reverse` у всех массивов глобально.
- `configurable: true` позволяет позже снова переопределить/удалить это свойство.
- `writable: true` разрешает присваивать другое значение `Array.prototype.reverse`.
- Новый `reverseAsDuplicate()` возвращает `this.concat(this)`, то есть дублирует массив вместо разворота.

### Важный эффект
- После такого переопределения любое место в приложении, где вызывается `.reverse()`, получит дублирование, а не обратный порядок.
