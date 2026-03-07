# Лаба 2: Asynchronous & Advanced JS

## Что реализовано
- Ввод для задач 2-5 сделан через собственную DOM-модалку (`showInputModal`), чтобы не использовать `prompt`.
- `task2` и `task3` выполнены в Promise-стиле.
- `task4_ordered` и `task4_unordered` выполнены через `async/await` как аналог task2/task3.
- Ошибки загрузки изображений показываются как текстовый блок `Can’t load image`.
- `task5` делает 5 запросов к geoip API и проверяет, есть ли запрещенная страна.

## Технические пояснения
### `let activeModalResolver = null;`
- Это переменная для хранения текущего `resolve` из `Promise`, который возвращает `showInputModal(...)`.
- Когда пользователь нажимает `OK`/`Cancel`, обработчик вызывает этот `resolve` и завершает ожидание модалки.
- После закрытия значение снова ставится в `null`, чтобы не было повторного срабатывания.

### Как устроена модалка
- `ensureInputModal()` один раз создает CSS и HTML модалки и вешает обработчики кнопок/клавиш.
- `showInputModal(title, placeholder)`:
  1. показывает оверлей,
  2. настраивает заголовок/placeholder,
  3. возвращает `Promise` с результатом `{ cancelled, value }`.
- `collectInputs(...)` несколько раз подряд вызывает `showInputModal(...)` и собирает массив значений.

### Почему в `task2` используется `Promise.all`
- `Promise.all` возвращает результаты в том же порядке, что и входной массив URL.
- Поэтому картинки вставляются в исходном порядке, даже если загружаются с разной скоростью.

### Почему в `task3` порядок не гарантирован
- Каждый `loadImage(url)` добавляет элемент в DOM сразу по готовности.
- Кто загрузился быстрее, тот раньше и появился.

### Зачем `clearOutput()`
- Перед новой задачей очищает контейнер `#output`, чтобы не смешивать результаты разных запусков.

## Примеры ключевых фрагментов
```js
let activeModalResolver = null;

function showInputModal(title, placeholder) {
  ensureInputModal();
  // ... показать модалку
  return new Promise((resolve) => {
    activeModalResolver = resolve;
  });
}
```

```js
const promises = urls.map((url) =>
  loadImage(url).catch(() => createErrorParagraph())
);

Promise.all(promises).then((elements) => {
  elements.forEach((element) => output.appendChild(element));
});
```
