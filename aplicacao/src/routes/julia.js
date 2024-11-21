var express = require("express");
var router = express.Router();

var juliaController = require("../controllers/juliaController");

router.get("/servidor/:idServidor", function (req, res) {
    juliaController.buscarMedidasServidor(req, res);
});


module.exports = router;