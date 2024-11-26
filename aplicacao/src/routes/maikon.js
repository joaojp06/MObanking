var express = require("express");
var router = express.Router();

var maikonController = require("../controllers/maikonController");

router.get("/listar/:idEmpresa/:apelido", function (req, res) {
  maikonController.listar(req, res);
})


router.get("/listarLimiteCpu/:idServidorPar", function (req, res) {
  maikonController.listarLimiteCpu(req, res);
})

router.get("/listarLimiteRam/:idServidorPar", function (req, res) {
  maikonController.listarLimiteRam(req, res);
})

module.exports = router;