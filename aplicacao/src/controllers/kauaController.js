var kauaModel = require("../models/kauaModel");

function listarServidores(req, res) {
  var idEmpresa = req.params.idEmpresa;
  var mes = req.params.mes;

  kauaModel.listarServidores(idEmpresa, mes).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os servidores avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function obterQtdAlertasCPU(req, res) {
  var idEmpresa = req.params.idEmpresa;
  var mes = req.params.mes;
  var idServidorPar = req.params.idServidorPar;

  kauaModel.obterQtdAlertasCPU(idEmpresa, mes, idServidorPar).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os servidores avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function obterQtdAlertasRAM(req, res) {
  var idEmpresa = req.params.idEmpresa;
  var mes = req.params.mes;
  var idServidorPar = req.params.idServidorPar;

  kauaModel.obterQtdAlertasRAM(idEmpresa, mes, idServidorPar).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os servidores avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function obterQtdAlertasDISCO(req, res) {
  var idEmpresa = req.params.idEmpresa;
  var mes = req.params.mes;
  var idServidorPar = req.params.idServidorPar;

  kauaModel.obterQtdAlertasDISCO(idEmpresa, mes, idServidorPar).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os servidores avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function obterQtdAlertasREDE(req, res) {
  var idEmpresa = req.params.idEmpresa;
  var mes = req.params.mes;
  var idServidorPar = req.params.idServidorPar;

  kauaModel.obterQtdAlertasREDE(idEmpresa, mes, idServidorPar).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os servidores avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
    listarServidores,
    obterQtdAlertasCPU,
    obterQtdAlertasRAM,
    obterQtdAlertasDISCO,
    obterQtdAlertasREDE
  }