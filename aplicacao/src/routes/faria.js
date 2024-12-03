var express = require("express");
var router = express.Router();

var fariaController = require("../controllers/fariaController");

router.get("/dadosGrafico", function (req, res) {
    fariaController.dadosGrafico(req, res);
});

router.get("/obterIndicadores", function (req, res) {
    fariaController.obterIndicadores(req, res);
});

module.exports = router;