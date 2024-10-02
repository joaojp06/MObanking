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

router.get("/listarEmpresas", function (req, res) {
  empresaController.listarEmpresas(req, res);
});

router.get("/listarEmpresasPorId/:idEmpresa", function (req, res) {
  empresaController.listarEmpresasPorId(req, res);
});

router.put("/editar/:idEmpresa", function (req, res) {
  empresaController.editar(req, res);
});

router.put("/editarEndereco/:idEndereco", function (req, res) {
  empresaController.editarEndereco(req, res);
});

module.exports = router;