var maikonModel = require("../models/maikonModel");

function listar(req, res) {
  var idEmpresa = req.params.idEmpresa;
  var apelido = req.params.apelido;

  if(apelido != "%%"){
    apelido = "%"+apelido+"%"
  }


  maikonModel.listar(idEmpresa, apelido).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function listarLimites(req, res) {
  var idServidor = req.params.idServidorPar;

  maikonModel.listarLimites(idServidor).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  listar,
  listarLimites
}