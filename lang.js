// Словник перекладів (ключ - ідентифікатор)
const translations = {
  ua: {
    nav_home: "Головна",
    nav_items: "Предмети",
    nav_blocks: "Блоки",
    nav_mobs: "Моби",
    nav_download: "Завантажити",
    welcome_title: "Ласкаво просимо на офіційну вікі ImprovedPotions!",
    main_desc: "ImprovedPotions — це невеликий дата-пак для гри Minecraft. Його основна мета — покращення механіки варіння зілля. Додаючи нові інгредієнти, робочі блоки, а також кардинально змінюючи взаємодію під час варіння, проєкт робить цю частину гри значно цікавішою. Основним автором є BigSTy. Тут ви знайдете всю необхідну інформацію та посилання на завантаження.",
    nav_panel: "Панель навігації",
    card_structures: "Структури",
    card_mechanics: "Механіки",
    card_creators: "Автори",
    card_video: "Відеоогляд",
    card_more: "Інші роботи"
  },
  en: {
    nav_home: "Home",
    nav_items: "Items",
    nav_blocks: "Blocks",
    nav_mobs: "Mobs",
    nav_download: "Download",
    welcome_title: "Welcome to the official ImprovedPotions Wiki!",
    main_desc: "ImprovedPotions is a Minecraft datapack focused on overhauling brewing mechanics. By adding new ingredients, functional blocks, and refining interactions during potion brewing, it brings new life to alchemy. Developed primarily by BigSTy. Here you will find all guides, documentation, and downloads.",
    nav_panel: "Navigation Panel",
    card_structures: "Structures",
    card_mechanics: "Mechanics",
    card_creators: "Authors",
    card_video: "Video Review",
    card_more: "More Projects"
  },
  ru: {
    nav_home: "Главная",
    nav_items: "Предметы",
    nav_blocks: "Блоки",
    nav_mobs: "Мобы",
    nav_download: "Скачать",
    welcome_title: "Добро пожаловать на официальную вики ImprovedPotions!",
    main_desc: "ImprovedPotions - это небольшой ДатаПак для игры Minecraft. Основной его целью является улучшение механики варки зельей. Добавляя новые ингредиенты, рабочие блоки, а также под корень изменяя элементы взаимодействия вовремя варки, проект делает эту часть игры более интересной. Основным автором ДатаПака является игрок BigSTy. На данном сайте Вы можете найти всю нужную информацию про проект, кто создавал его, а также его скачать. Меню со всеми вкладками находится ниже.",
    nav_panel: "Панель навигации",
    card_structures: "Структуры",
    card_mechanics: "Механики",
    card_creators: "Авторы",
    card_video: "Видео обзор",
    card_more: "Другие работы"
  }
};

// Застосування мови до всіх елементів з атрибутом data-i18n
function setLanguage(lang) {
  localStorage.setItem('site_lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Оновлення активної кнопки у кутку
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

// Ініціалізація при завантаженні
document.addEventListener('DOMContentLoaded', () => {
  // Додаємо віджет у правий верхній кут
  const switcher = document.createElement('div');
  switcher.className = 'lang-switcher-top';
  switcher.innerHTML = `
    <button class="lang-btn" data-lang="ua">UA</button>
    <button class="lang-btn" data-lang="en">EN</button>
    <button class="lang-btn" data-lang="ru">RU</button>
  `;
  document.body.appendChild(switcher);

  switcher.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
  });

  // Перевірка, чи це перший візит
  const savedLang = localStorage.getItem('site_lang');

  if (!savedLang) {
    // Показуємо модальне вікно
    const modal = document.createElement('div');
    modal.className = 'lang-modal-overlay';
    modal.innerHTML = `
      <div class="lang-modal">
        <h2>Оберіть мову / Choose language</h2>
        <p>Please select your preferred language for the wiki:</p>
        <div class="lang-modal-buttons">
          <button class="lang-modal-btn" data-lang="ua">🇺🇦 Українська</button>
          <button class="lang-modal-btn" data-lang="en">🇬🇧 English</button>
          <button class="lang-modal-btn" data-lang="ru">🇷🇺 Русский</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelectorAll('.lang-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
        modal.remove();
      });
    });
  } else {
    setLanguage(savedLang);
  }
});