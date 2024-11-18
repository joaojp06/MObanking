var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/servidor/:idServidor", function (req, res) {
    medidaController.buscarMedidasServidor(req, res);
});

router.get("/servidorMedia/:idEmpresa", function (req, res) {
    medidaController.buscarMedidasServidorMedia(req, res);
})

module.exports = router;