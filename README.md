# 🛒 IM — Интернет-магазин на Angular

IM — это полнофункциональный интернет-магазин, разработанный с использованием **Angular** (фронтенд) и **Node.js** (бэкенд). Приложение позволяет просматривать каталог товаров, управлять корзиной и избранным, проходить регистрацию и вход в аккаунт. Все данные (товары, пользователи, корзина и т.д.) получаются с бэкенда, взаимодействие происходит через REST API с помощью **RxJS**.

---

## 🔧 Технологии

**Frontend:**

- Angular
- TypeScript
- RxJS
- Angular Router

**Backend:**

- Node.js
- Express.js
- REST API
- JSON (временное хранилище)

---

## 📁 Структура проекта

```
IM/
├── frontend/             # Angular-приложение
│   ├── src/app/          # Компоненты, сервисы, роутинг
│   └── ...               # Конфигурация Angular
│
├── backend/              # Node.js + Express
│   ├── app.js            # Точка входа в бэкенд
│   ├── routes/           # Маршруты API
│   ├── controllers/      # Логика обработки запросов
│   ├── models/           # Модели данных
│   └── data/             # Тестовые JSON-данные (если используются)
│
└── README.md
```

---

## 🚀 Запуск проекта

1. **Фронтенд (Angular)**

   ```bash
   cd frontend
   npm install
   ng serve
   ```

   Приложение будет доступно по адресу: `http://localhost:4200`

2. **Бэкенд (Node.js + Express)**

   ```bash
   cd backend
   npm install
   npx nodemon app.js
   ```

   API будет доступен по адресу: `http://localhost:3000`

---

## ⚙️ Основной функционал

- 📦 Каталог товаров
- 🛒 Корзина и управление количеством
- ❤️ Избранное
- 🔐 Регистрация и авторизация
- 👤 Профиль пользователя
- 🔄 RxJS для асинхронного обмена данными
- 🌐 Интеграция с REST API

---

## 📌 Примеры API-запросов

```http
GET  /api/products      # Получить все товары
GET  /api/products/:id  # Получить товар по ID
POST /api/cart          # Добавить в корзину
GET  /api/cart          # Получить содержимое корзины
POST /api/signup        # Регистрация
POST /api/login         # Авторизация
GET  /api/profile       # Профиль пользователя
```

---

## 📬 Контакты

- **Автор:** Dmitry Bogolepov
- **GitHub:** [@DmitryBogolepov](https://github.com/DmitryBogolepov)
- **WebSite:** https://dmitrybogolepov.ru/
