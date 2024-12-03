var express = require("express");
var router = express.Router();

var fabioController = require("../controllers/fabioController");

router.get("/grafico", function (req, res) {
    fabioController.grafico(req, res);
});

router.get("/KPI1", function (req, res) {
    fabioController.KPI1(req, res);
});

router.get("/KPI2", function (req, res) {
    fabioController.KPI2(req, res);
});



module.exports = router;