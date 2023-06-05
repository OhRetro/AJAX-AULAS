const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.static("."))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/teste", function(req, res) {
    res.send(new Date)
})
app.listen(8018, () => console.log("Executando"))