var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.post("/cadastrarEndereco", function (req, res) {
  empresaController.cadastrarEndereco(req, res);
})

router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})

router.get("/buscar", function (req, res) {
    empresaController.buscarPorCnpj(req, res);
});

router.get("/buscar/:id", function (req, res) {
  empresaController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
  empresaController.listar(req, res);
});

module.exports = router;