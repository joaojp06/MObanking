var express = require("express");
var router = express.Router();

var maikonController = require("../controllers/maikonController");

router.get("/listar/:idEmpresa/:apelido", function (req, res) {
  maikonController.listar(req, res);
})

router.get("/listarLimites/:idServidorPar", function (req, res) {
  maikonController.listarLimites(req, res);
})

module.exports = router;