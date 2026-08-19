# Дипломный проект QA.GURU: Комплексная автоматизация UI и API

Данный проект представляет собой фреймворк для автоматизированного тестирования, охватывающий два направления: функциональность веб-интерфейса [RealWorld QA.GURU](https://realworld.qa.guru/) и проверку REST-сервиса [API Challenges](https://apichallenges.eviltester.com/).

## Содержание

- [Покрытие тестами](#покрытие-тестами)
- [Технологический стек](#технологический-стек)
- [Архитектура](#архитектура)
- [Структура проекта](#структура-проекта)
- [Подготовка окружения](#подготовка-окружения)
- [Запуск тестов](#запуск-тестов)
- [Отчёты](#отчёты)
- [CI/CD](#cicd)
- [Оповещения в Telegram](#оповещения-в-Telegram)

## Покрытие тестами

В проекте реализовано 35 функциональных тестов: 5 UI и 30 API.

### UI

1. Изменение данных профиля.
2. Создание новой статьи.
3. Редактирование статьи.
4. Добавление статьи в избранное и удаление из избранного.
5. Добавление комментария к статье.

### API

API-набор проверяет поведение сервиса API Challenges, в том числе:

- создание сессии и получение токена `x-challenger`;
- получение списка челленджей и задач в JSON/XML;
- CRUD;
- проверка пограничных значения длины заголовка, описания и тела запроса;
- неподдерживаемые HTTP-методы, `Accept` и `Content-Type`;
- валидация http-статусов;
- healthcheck сервера.

## Технологический стек

- JavaScript, Node.js;
- [Playwright](https://playwright.dev/) для UI- и API-тестов;
- Библиотека Faker для тестовых данных;
- Allure Report и Allure TestOps;
- Jenkins Pipeline;
- [QA.GURU Allure Notifications](https://github.com/qa-guru/allure-notifications) для отправки результатов в Telegram.

## Архитектура

### Сервисы и фасад API

API-клиенты находятся в `src/services`. Фасад `Api` объединяет сервисы `challenger`, `challenges`, `todos`, `todo` и `heartbeat` и предоставляется тестам через фикстуру `api`.

### Fixtures

Кастомные фикстуры, определенные в `src/helpers/fixtures/fixture.js`, связывают объекты страниц и API-клиентов с контекстом Playwright (`page` и `request`). Это обеспечивает изоляцию данных между тестами и упрощает их написание.

### Builders

Для создания тестовых данных применяются билдеры (`UserBuilder`, `ArticleBuilder`, `CommentBuilder`, `TodoBuilder`). Генерация случайных значений делегирована библиотеке Faker, которая используется исключительно внутри билдеров.

## Структура проекта

```text
.
├── src
│   ├── helpers
│   │   ├── builders       # билдеры для тестовых данных
│   │   ├── constants      # константы
│   │   └── fixtures       # кастомные Playwright fixtures
│   ├── pages              # Page Objects и UI-фасад App
│   └── services           # сервисы для работы с API и фасад Api
├── tests
│   └── api.test.js        # API-тесты
│   ├── ui.test.js         # UI-тесты
├── Jenkinsfile            # pipeline JenkinS
├── playwright.config.js   # конфигурационный файл Playwright
├── eslint.config.js       # настройки линтера
├── .env.example           # шаблон переменных окружения
└── package.json           # зависимости и NPM-скрипты
```

## Подготовка окружения

### Требования

- Node.js 24.x;
- npm;
- Git.

### Установка

```bash
git clone https://github.com/TLC/qa-guru-diplom.git
cd qa-guru-diplom
npm ci
npx playwright install
```

Для Linux и CI зависимости браузеров можно установить командой:

```bash
npx playwright install --with-deps
```

### Переменные окружения

Создайте локальный `.env` из примера:

```bash
cp .env.example .env
```

Для локального запуска необходимы:

```dotenv
APP_URL=https://realworld.qa.guru/
API_URL=https://apichallenges.eviltester.com
```

Telegram-токен, идентификатор чата и токен Allure TestOps хранятся в Jenkins Credentials.

## Запуск тестов

Все тесты:

```bash
npm t
```

Только API:

```bash
npx playwright test tests/api.test.js
```

Только UI:

```bash
npx playwright test tests/ui.test.js
```

Интерактивный UI Mode:

```bash
npm run test:ui
```

Проверка линтером:

```bash
npm run lint
```

## Отчёты

Для каждого запуска настроены три репортера:

- HTML Reporter Playwright;
- консольный line reporter;
- Allure reporter.

Открыть локальный HTML-отчёт Playwright:

```bash
npm run report
```

Сформировать и открыть локальный Allure Report:

```bash
npm run allure:report
```

### Allure TestOps

Jenkins запускает тесты внутри `withAllureUpload`, поэтому результаты автоматически отправляются в проект Allure TestOps.

**[Проект Allure TestOps](https://allure.qa.guru/project/5323/launches)**

<img width="1904" height="675" alt="image" src="https://github.com/user-attachments/assets/b283b9ce-80df-496f-b824-85d172666fd3" />

### Allure Report в Jenkins

**[Отчет Allure Report в Jenkins](https://jenkins.qa.guru/job/tlc-jenkins/allure/)**

<img width="1915" height="812" alt="image" src="https://github.com/user-attachments/assets/d756cc38-b247-4ee8-bc2d-88bd01b489a4" />

## CI/CD

В проекте реализованы два способа настройки непрерывной интеграции в Jenkins. Это позволяет сравнить классическую конфигурацию через интерфейс Jenkins с воспроизводимым подходом Pipeline as Code.

| Реализация | Описание | Ссылка |
|---|---|---|
| Freestyle Project | Классическая сборка Jenkins и конфигурации CI | [001-TLC-freestyle](https://jenkins.qa.guru/job/001-TLC-freestyle/) |
| Pipeline as Code | Конфигурация хранится в `Jenkinsfile` и воспроизводится из репозитория | [tlc-jenkins](https://jenkins.qa.guru/job/tlc-jenkins/) |

Обе сборки выполняют идентичный функционал: запуск автотестов и публикацию отчетов. Однако основным и приоритетным является подход Pipeline as Code, поскольку он обеспечивает воспроизводимость, упрощает ревью и позволяет изменять конфигурацию CI параллельно с развитием тестов.

Основные этапы Jenkins-пайплайна:

1. Очистка рабочего пространства от артефактов предыдущих запусков.
2. Установка npm-зависимостей и браузеров.
3. Запуск UI- и API-тестов.
4. Отправка результатов в Allure TestOps.
5. Генерация Allure-отчета.
6. Подготовка конфигурации для отправки уведомлений.
7. Формирование и отправка отчета в Telegram-канал.


## Оповещения в Telegram

По окончании каждого прогона в Jenkins срабатывает механизм отправки уведомлений в Telegram.

<img width="507" height="625" alt="image" src="https://github.com/user-attachments/assets/9036349a-aafd-42ab-912d-f6c7d64ec8cd" />
