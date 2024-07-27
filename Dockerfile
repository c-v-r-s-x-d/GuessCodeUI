FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Используем Node.js для запуска сервера через serve
FROM node:18

WORKDIR /app

# Копируем билдированные файлы из предыдущего этапа
COPY --from=build /app/build /app/build

# Устанавливаем пакет serve для сервировки статических файлов
RUN npm install -g serve

EXPOSE 80

# Запускаем сервер с использованием serve
CMD ["serve", "-s", "build", "-l", "80"]

