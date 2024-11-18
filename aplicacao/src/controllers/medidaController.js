var medidaModel = require("../models/medidaModel");

function buscarMedidasServidor(req, res) {

    var idServidor = req.params.idServidor;


    medidaModel.buscarMedidasServidor(idServidor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasMediaCPU(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var inpCPU1 = req.params.inpCPU1;
    var inpCPU2 = req.params.inpCPU2;


    medidaModel.buscarMedidasMediaCPU(idEmpresa, inpCPU1, inpCPU2).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas de média diária da CPU.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasMediaRAM(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var inpRAM1 = req.params.inpRAM1;
    var inpRAM2 = req.params.inpRAM2;


    medidaModel.buscarMedidasMediaRAM(idEmpresa, inpRAM1, inpRAM2).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas de média diária da RAM.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasMediaDISCO(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var inpDISCO1 = req.params.inpDISCO1;
    var inpDISCO2 = req.params.inpDISCO2;


    medidaModel.buscarMedidasMediaDISCO(idEmpresa, inpDISCO1, inpDISCO2).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas de média diária da DISCO.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasMediaREDE(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var inpREDE1 = req.params.inpREDE1;
    var inpREDE2 = req.params.inpREDE2;


    medidaModel.buscarMedidasMediaREDE(idEmpresa, inpREDE1, inpREDE2).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas de média diária da REDE.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarMedidasServidor,
    buscarMedidasMediaCPU,
    buscarMedidasMediaRAM,
    buscarMedidasMediaDISCO,
    buscarMedidasMediaREDE

}