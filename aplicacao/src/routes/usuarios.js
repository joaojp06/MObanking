var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
})

router.get("/listarFuncionarios/:idEmpresa", function (req, res) {
    usuarioController.listarFuncionarios(req, res);
});

router.get("/infoUsuario/:idUsuario", function (req, res) {
    usuarioController.infoUsuario(req, res);
});

router.get("/listarTipoUsuario", function (req, res) {
    usuarioController.listarTipoUsuario(req, res);
});

router.put("/editarUsuario/:idUsuario", function (req, res) {
    usuarioController.editarUsuario(req, res);
});

router.put("/editarUsuarioADM/:idUsuario", function (req, res) {
    usuarioController.editarUsuarioADM(req, res);
});

router.put("/removerUsuario/:idUsuario", function (req, res) {
    usuarioController.removerUsuario(req, res);
});

module.exports = router;