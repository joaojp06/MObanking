var fariaModel = require("../models/fariaModel");

function dadosGrafico(req, res) {
  fariaModel.dadosGrafico().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os dados do gráfico: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function obterIndicadores(req, res) {
    var empresa = req.params.empresa
  fariaModel.obterIndicadores(empresa).then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os dados do gráfico: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  dadosGrafico,
  obterIndicadores
};