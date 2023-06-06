const express = require('express');
const {resolve} = require("path");
const app = express();
const port = process.env.PORT || 5000;

// Использование статики из React-приложения
app.use(express.static(resolve(__dirname, './client/build')));

// Лог запуска
app.listen(port, () => console.log(`Listening on port ${port}`));

// Любой GET-роут кроме статики ссылается на билд React-приложения
app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, './client/build', 'index.html'));
});