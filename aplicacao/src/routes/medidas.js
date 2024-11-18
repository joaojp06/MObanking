var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/servidor/:idServidor", function (req, res) {
    medidaController.buscarMedidasServidor(req, res);
});

router.get("/servidorMediaCPU/:idEmpresa/:inpCPU1/:inpCPU2", function (req, res) {
    medidaController.buscarMedidasMediaCPU(req, res);
})

router.get("/servidorMediaRAM/:idEmpresa/:inpRAM1/:inpRAM2", function (req, res) {
    medidaController.buscarMedidasMediaRAM(req, res);
})

router.get("/servidorMediaDISCO/:idEmpresa/:inpDISCO1/:inpDISCO2", function (req, res) {
    medidaController.buscarMedidasMediaDISCO(req, res);
})

router.get("/servidorMediaREDE/:idEmpresa/:inpREDE1/:inpREDE2", function (req, res) {
    medidaController.buscarMedidasMediaREDE(req, res);
})

module.exports = router;