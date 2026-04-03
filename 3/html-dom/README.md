# HTML DOM

## Где используется DOM API

Вся DOM-логика находится прямо в [index.html](c:/Users/drell/coding/frontend/3/html-dom/index.html).

- Получение элементов страницы через `document.getElementById(...)`:
  [index.html#L232](c:/Users/drell/coding/frontend/3/html-dom/index.html#L232),
  [index.html#L303](c:/Users/drell/coding/frontend/3/html-dom/index.html#L303),
  [index.html#L428](c:/Users/drell/coding/frontend/3/html-dom/index.html#L428)
- Назначение обработчиков через `addEventListener(...)`:
  [index.html#L271](c:/Users/drell/coding/frontend/3/html-dom/index.html#L271),
  [index.html#L281](c:/Users/drell/coding/frontend/3/html-dom/index.html#L281),
  [index.html#L397](c:/Users/drell/coding/frontend/3/html-dom/index.html#L397),
  [index.html#L600](c:/Users/drell/coding/frontend/3/html-dom/index.html#L600)
- Обновление интерфейса через `textContent`, `classList.add/remove`, `document.body.classList...`:
  [index.html#L238](c:/Users/drell/coding/frontend/3/html-dom/index.html#L238),
  [index.html#L311](c:/Users/drell/coding/frontend/3/html-dom/index.html#L311),
  [index.html#L590](c:/Users/drell/coding/frontend/3/html-dom/index.html#L590)

## Как блокируется выделение

Логика защиты страницы работает так:

1. Кнопки включения и выключения защиты меняют флаг `protectionEnabled`:
   [index.html#L271](c:/Users/drell/coding/frontend/3/html-dom/index.html#L271)
2. Функция `renderProtectionState()` обновляет текст статуса и класс `body.protection-enabled`:
   [index.html#L238](c:/Users/drell/coding/frontend/3/html-dom/index.html#L238)
3. В CSS для `body.protection-enabled` задано `user-select: none`, поэтому текст нельзя выделять мышью:
   [index.html#L15](c:/Users/drell/coding/frontend/3/html-dom/index.html#L15)
4. Дополнительно стоит обработчик события `selectstart`, который вызывает `blockEvent(event, ...)`:
   [index.html#L297](c:/Users/drell/coding/frontend/3/html-dom/index.html#L297)
5. Внутри `blockEvent(...)` при активной защите вызывается `event.preventDefault()`:
   [index.html#L250](c:/Users/drell/coding/frontend/3/html-dom/index.html#L250)

Итог: выделение блокируется сразу двумя уровнями.

- CSS-уровень: `user-select: none`
- DOM-уровень: перехват `selectstart` и `preventDefault()`

## Путь вызовов обычного калькулятора

Точка входа:

- клик по кнопкам внутри контейнера `#basic-keys`:
  [index.html#L178](c:/Users/drell/coding/frontend/3/html-dom/index.html#L178)
  [index.html#L397](c:/Users/drell/coding/frontend/3/html-dom/index.html#L397)

Цепочки вызовов:

- Цифра или точка:
  `basicKeys.addEventListener("click", ...)`
  -> `inputBasicDigit(value)`
  -> `renderBasicDisplay()`
- Оператор:
  `basicKeys.addEventListener("click", ...)`
  -> `chooseBasicOperator(operator)`
  -> при необходимости `applyBasicOperation(...)`
  -> `renderBasicDisplay()`
- Кнопка `=`:
  `basicKeys.addEventListener("click", ...)`
  -> `calculateBasicResult()`
  -> `applyBasicOperation(...)`
  -> `renderBasicDisplay()`
- Кнопка `C`:
  `basicKeys.addEventListener("click", ...)`
  -> `clearBasicCalculator()`
  -> `renderBasicDisplay()`

Ключевые функции:

- `renderBasicDisplay()`:
  [index.html#L311](c:/Users/drell/coding/frontend/3/html-dom/index.html#L311)
- `clearBasicCalculator()`:
  [index.html#L315](c:/Users/drell/coding/frontend/3/html-dom/index.html#L315)
- `applyBasicOperation(...)`:
  [index.html#L323](c:/Users/drell/coding/frontend/3/html-dom/index.html#L323)
- `inputBasicDigit(...)`:
  [index.html#L343](c:/Users/drell/coding/frontend/3/html-dom/index.html#L343)
- `chooseBasicOperator(...)`:
  [index.html#L364](c:/Users/drell/coding/frontend/3/html-dom/index.html#L364)
- `calculateBasicResult()`:
  [index.html#L384](c:/Users/drell/coding/frontend/3/html-dom/index.html#L384)

## Путь вызовов калькулятора со скобками и ОПЗ

Точка входа:

- кнопка `Вычислить`:
  [index.html#L215](c:/Users/drell/coding/frontend/3/html-dom/index.html#L215)
  [index.html#L600](c:/Users/drell/coding/frontend/3/html-dom/index.html#L600)

Основная цепочка вызовов:

- `calculateExpression()`
  -> читает `expressionInput.value.trim()`
  -> `tokenizeExpression(expression)`
  -> `toPostfix(tokens)`
  -> `evaluatePostfix(postfix)`
  -> записывает результат в `#rpn-output` и `#expression-result`

Путь по функциям:

- `calculateExpression()`:
  [index.html#L581](c:/Users/drell/coding/frontend/3/html-dom/index.html#L581)
- `tokenizeExpression(...)`:
  [index.html#L434](c:/Users/drell/coding/frontend/3/html-dom/index.html#L434)
- `toPostfix(...)`:
  [index.html#L481](c:/Users/drell/coding/frontend/3/html-dom/index.html#L481)
- `evaluatePostfix(...)`:
  [index.html#L534](c:/Users/drell/coding/frontend/3/html-dom/index.html#L534)

Отдельная ветка очистки:

- кнопка `Очистить`:
  [index.html#L216](c:/Users/drell/coding/frontend/3/html-dom/index.html#L216)
  [index.html#L602](c:/Users/drell/coding/frontend/3/html-dom/index.html#L602)

Цепочка:

- `clearExpressionButton.addEventListener("click", ...)`
  -> `expressionInput.value = ""`
  -> `rpnOutput.textContent = "—"`
  -> `expressionResult.textContent = "—"`
