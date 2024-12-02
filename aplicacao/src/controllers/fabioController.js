var fabioModel = require("../models/fabioModel");

function grafico(req, res) {

  const inicio = req.query.inicio;
  const fim = req.query.fim;

  if (!inicio || !fim) {
      res.status(400).send("Os parâmetros 'inicio' e 'fim' são obrigatórios.");
      return;
  }

  const idEmpresa = req.query.empresa;

  if (!idEmpresa) {
      res.status(400).send("Parâmetros 'empresa' são obrigatórios!");
      return;
  }


  fabioModel.grafico(inicio, fim, idEmpresa).then(function (resultado) {
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

function KPI1(req, res) {

    const inicio = req.query.inicio;
    const fim = req.query.fim;
  
    if (!inicio || !fim) {
        res.status(400).send("Os parâmetros 'inicio' e 'fim' são obrigatórios.");
        return;
    }
  
    const idEmpresa = req.query.empresa;
  
    if (!idEmpresa) {
        res.status(400).send("Parâmetros 'empresa' são obrigatórios!");
        return;
    }
  
  
    fabioModel.KPI1(inicio, fim, idEmpresa).then(function (resultado) {
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

  function KPI2(req, res) {

    const inicio = req.query.inicio;
    const fim = req.query.fim;
  
    if (!inicio || !fim) {
        res.status(400).send("Os parâmetros 'inicio' e 'fim' são obrigatórios.");
        return;
    }
  
    const idEmpresa = req.query.empresa;
  
    if (!idEmpresa) {
        res.status(400).send("Parâmetros 'empresa' são obrigatórios!");
        return;
    }
  
  
    fabioModel.KPI2(inicio, fim, idEmpresa).then(function (resultado) {
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


module.exports = {
  grafico,
  KPI1,
  KPI2
  }