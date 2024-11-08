var express = require("express");
var router = express.Router();

var aquarioController = require("../controllers/aquarioController");

router.get("/:empresaId", function (req, res) {
  aquarioController.buscarAquariosPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  aquarioController.cadastrar(req, res);
})

router.put("/desativarServidor/:idServidor", function (req, res) {
  aquarioController.desativarServidor(req, res);
})

router.put("/ativarServidor/:idServidor", function (req, res) {
  aquarioController.ativarServidor(req, res);
})

router.get("/listarServidores/:idEmpresa/:status", function (req, res) {
  aquarioController.listarServidores(req, res);
})

router.get("/infoApelidoFuncaoServidor/:idServidor/:status", function (req, res) {
  aquarioController.infoApelidoFuncaoServidor(req, res);
})

router.get("/listarLimite/:id_servidor", function (req, res) {
  aquarioController.listarLimite(req, res);
})

router.put("/editarLimiteServidor", function (req, res) {
  aquarioController.editarLimiteServidor(req, res);
})

module.exports = router;