var joaoModel = require("../models/joaoModel");

function listarPrevisoes(req, res) {
  var idEmpresa = req.params.idEmpresa;
  var status = req.params.status;

  if (status == 1) {
    status = 'ativo'
  } else {
    status = 'desativado'
  }

  console.log(`ESSE É MEU STATUS: ${status} CONTROLLER`)

  joaoModel.listarPrevisoes(idEmpresa).then(function (resultado) {
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

function listarVerde(req, res) {
  var idEmpresa = req.params.idEmpresa;

  joaoModel.listarVerde(idEmpresa).then(function (resultado) {
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

function listarAmarelo(req, res) {
  var idEmpresa = req.params.idEmpresa;


  joaoModel.listarAmarelo(idEmpresa).then(function (resultado) {
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

function listarVermelho(req, res) {
  var idEmpresa = req.params.idEmpresa;

  joaoModel.listarVermelho(idEmpresa).then(function (resultado) {
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
  listarPrevisoes,
  listarVerde,
  listarAmarelo,
  listarVermelho
}