const express = require('express');
const { resolve } = require("path")
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Использование статики из React-приложения
app.use(express.static(resolve(__dirname, './client/build')));

// Любой GET-роут кроме статики ссылается на билд React-приложения
app.get('/env.js', (req, res) => {
    res.sendFile(resolve(__dirname, './client/build/', 'env.js'));
});

app.get(/^(?!\/api\/).*$/, (req, res) => {
    res.sendFile(resolve(__dirname, './client/build', 'index.html'));
});

// Проксирование запросов на другой сервер
app.all('/api/*', (req, res) => {
    const targetUrl = process.env.BACKEND_API_URL; // Замените на URL другого сервера

    proxy.web(req, res, { target: targetUrl });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});