var aquarioModel = require("../models/aquarioModel");

function buscarAquariosPorEmpresa(req, res) {
  var idUsuario = req.params.idUsuario;

  aquarioModel.buscarAquariosPorEmpresa(idUsuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


function cadastrar(req, res) {
  var descricao = req.body.descricao;
  var idUsuario = req.body.idUsuario;

  if (descricao == undefined) {
    res.status(400).send("descricao está undefined!");
  } else if (idUsuario == undefined) {
    res.status(400).send("idUsuario está undefined!");
  } else {


    aquarioModel.cadastrar(descricao, idUsuario)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function desativarServidor(req, res) {
  var idServidor = req.params.idServidor;

  if (idServidor == undefined) {
    res.status(400).send("id SERVIDOR está undefined!");
  }
  else {


    aquarioModel.desativarServidor(idServidor)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function ativarServidor(req, res) {
  var idServidor = req.params.idServidor;

  if (idServidor == undefined) {
    res.status(400).send("id SERVIDOR está undefined!");
  }
  else {


    aquarioModel.ativarServidor(idServidor)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function listarServidores(req, res) {
  var idEmpresa = req.params.idEmpresa;
  var status = req.params.status;

  if (status == 1) {
    status = 'ativo'
  } else {
    status = 'desativado'
  }

  console.log(`ESSE É MEU STATUS: ${status} CONTROLLER`)

  aquarioModel.listarServidores(idEmpresa, status).then(function (resultado) {
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

function infoApelidoFuncaoServidor(req, res) {
  var idServidor = req.params.idServidor;

  aquarioModel.infoApelidoFuncaoServidor(idServidor).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao obter informações do servidor desejado: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function listarLimite(req, res) {
  var idServidor = req.params.id_servidor;


  aquarioModel.listarLimite(idServidor).then(function (resultado) {
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


function editarLimiteServidor(req, res) {
  var idServidor = req.body.idServidorServer;
  var idPlano = req.body.idPlanoServer;
  var limiteCpu = req.body.limiteCpuServer;
  var limiteRam = req.body.limiteRamServer;
  var limiteDisco = req.body.limiteDiscoServer;
  var limiteRede = req.body.limiteRedeServer;

  // Faça as validações dos valores
  if (idPlano == 1) {
    aquarioModel.editarLimiteServidorPlano1(idServidor, limiteCpu, limiteRam)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar a edição! Erro: to NA CONTROLLER ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }else if(idPlano == 2){
    aquarioModel.editarLimiteServidorPlano2(idServidor, limiteCpu, limiteRam, limiteDisco)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar a edição! Erro: to NA CONTROLLER ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }else if(idPlano == 3){
    aquarioModel.editarLimiteServidorPlano3(idServidor, limiteCpu, limiteRam, limiteDisco, limiteRede)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar a edição! Erro: to NA CONTROLLER ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

module.exports = {
  buscarAquariosPorEmpresa,
  cadastrar,
  listarServidores,
  infoApelidoFuncaoServidor,
  desativarServidor,
  ativarServidor,
  listarLimite,
  editarLimiteServidor
}