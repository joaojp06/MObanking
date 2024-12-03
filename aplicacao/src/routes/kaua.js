var express = require("express");
var router = express.Router();

var kauaController = require("../controllers/kauaController");

router.get("/listarServidores/:idEmpresa/:mes", function (req, res) {
    kauaController.listarServidores(req, res);
})

router.get("/obterQtdAlertasCPU/:idServidorPar/:mes/:idEmpresa", function (req, res) {
    kauaController.obterQtdAlertasCPU(req, res);
})

router.get("/obterQtdAlertasRAM/:idServidorPar/:mes/:idEmpresa", function (req, res) {
    kauaController.obterQtdAlertasRAM(req, res);
})

router.get("/obterQtdAlertasDISCO/:idServidorPar/:mes/:idEmpresa", function (req, res) {
    kauaController.obterQtdAlertasDISCO(req, res);
})

router.get("/obterQtdAlertasREDE/:idServidorPar/:mes/:idEmpresa", function (req, res) {
    kauaController.obterQtdAlertasREDE(req, res);
})


module.exports = router;