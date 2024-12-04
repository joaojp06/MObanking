var express = require("express");
var router = express.Router();

var fariaController = require("../controllers/fariaController");

router.get("/dadosGrafico", function (req, res) {
    fariaController.dadosGrafico(req, res);
});

router.get("/obterIndicadores/:empresa", function (req, res) {
    fariaController.obterIndicadores(req, res);
});

router.post("/BobIA/Perguntar", function (req, res) {
    fariaController.BobIAPerguntar(req, res);
 });

module.exports = router;