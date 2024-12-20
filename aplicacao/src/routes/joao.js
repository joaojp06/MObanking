var express = require("express");
var router = express.Router();

var joaoController = require("../controllers/joaoController");

router.get("/listarPrevisoes/:idEmpresa", function (req, res) {
    joaoController.listarPrevisoes(req, res);
})

router.get("/listarVerde/:idEmpresa", function (req, res) {
    joaoController.listarVerde(req, res);
})

router.get("/listarAmarelo/:idEmpresa", function (req, res) {
    joaoController.listarAmarelo(req, res);
})


router.get("/listarVermelho/:idEmpresa", function (req, res) {
    joaoController.listarVermelho(req, res);
})

module.exports = router;