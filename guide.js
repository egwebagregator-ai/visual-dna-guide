const tasks = [
  ['Разбери стиль по референсу', 'Приложи удачный макет, коллаж или скриншот профиля и получи визуальный паспорт.'],
  ['Найди стиль с нуля', 'Начни с короткого интервью и выбери визуальное направление для своего проекта.'],
  ['Преврати паспорт в правила', 'Приложи готовый паспорт и получи текстовую инструкцию для новых макетов.'],
  ['Проверь стиль на одном слайде', 'Собери первый макет по паспорту и проверь, подходит ли тебе выбранное направление.'],
  ['Получи разбор и три правки', 'Приложи макет и попроси оценить читаемость, оффер и соответствие стилю.'],
  ['Попробуй другую стилистику', 'Проверь новую обработку или палитру на том же макете.'],
  ['Перенеси стиль на всю серию', 'Возьми утверждённый слайд и блок правил, чтобы собрать остальные макеты.'],
];

const list = document.querySelector('#prompt-list');
const template = document.querySelector('#prompt-template');

function selectPrompt(prompt) {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(prompt);
  selection.removeAllRanges();
  selection.addRange(range);
}

for (const [index, [title, description]] of tasks.entries()) {
  const row = template.content.cloneNode(true);
  row.querySelector('.number').textContent = String(index + 1).padStart(2, '0');
  row.querySelector('.prompt-title').textContent = title;
  row.querySelector('.prompt-description').textContent = description;
  const prompt = row.querySelector('pre');
  const status = row.querySelector('.copy-status');
  prompt.textContent = guidePrompts[index];
  row.querySelector('button').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(prompt.textContent);
      status.textContent = 'Промпт скопирован';
    } catch {
      selectPrompt(prompt);
      status.textContent = 'Текст выделен. Скопируй его через меню устройства.';
    }
  });
  list.append(row);
}
