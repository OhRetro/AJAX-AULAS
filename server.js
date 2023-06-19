const bodyParser = require('body-parser');
const express = require('express');
const multer = require("multer")

const app = express();

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./upload")
    },
    filename: function(req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage}).single("file")

app.use(express.static("."))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/teste", function(req, res) {
    res.send(new Date)
})

app.post("/upload", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.end("Error")
        }
        res.end("Enviado")
    })
})

app.post("/formulario", (req, res) => {
    console.log(req.body)
    res.send({
        ...req.body,
        id: 1
    })
})

app.get("/parOuImpar", (req, res) => {
    console.log(req.query)
    console.log(req.query.number)
    console.log(req.body)
    console.log(req.params)

    const even = parseInt(req.query.number) % 2 === 0
    res.send({
        result: even ? "Par" : "Impar"
    })
})

app.listen(8018, () => console.log("Executando"))