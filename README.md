## Auth

Мини-приложение аутентификации с формой входа и шагом двухфакторной проверки кода (6 цифр) на базе mock API (`json-server`).
[Макет](https://www.figma.com/design/TUs0yc4YQtkpMhHvawK5iG/Auth?t=adjzCTQaHxTiuJLJ-0)

### Стек

- React 19 + Vite
- TypeScript
- TailwindCSS
- TanStack React Query (мутации/кэш)
- React Hook Form + Zod (валидация)
- json-server (mock backend)

### Возможности

- Логин с валидацией через Zod
- Проверка существования пользователя (mock `/users`)
- Второй фактор: 6 инпутов с автофокусом, backspace-навигацией, таймером повторной отправки
- Ошибки/состояния загрузки через React Query

### Запуск

1. Установить зависимости

```bash
npm install
```

2. Запустить клиент и mock-сервер одновременно

```bash
npm run dev:full
```

По умолчанию:

- Клиент: `http://localhost:5173`
- API (json-server): `http://localhost:3001`

3. Создать файл окружения

Создайте файл `.env.local` в корне проекта и задайте базовый URL API:

```bash
VITE_API_BASE_URL=http://localhost:3001
```

### Эндпоинты mock API

- `GET /users`
- `GET /verifyCode`

### Заметки

- Данные для входа и verifyCode лежат в `data.json`. Обновите при необходимости.
