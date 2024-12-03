var express = require("express");
var router = express.Router();

var kauaController = require("../controllers/kauaController");

router.get("/listarServidores/:idEmpresa/:mes", function (req, res) {
    kauaController.listarServidores(req, res);
})


module.exports = router;