var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listarEmpresas(_req, res) {
  empresaModel.listarEmpresas().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listarEmpresasPorId(req, res) {
  var idEmpresa = req.params.idEmpresa
  empresaModel.listarEmpresasPorId(idEmpresa).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrarEndereco(req, res) {
  var nomeLogradouro = req.body.nomeLogradouroServer;
  var tipoLogradouro = req.body.tipoLogradouroServer;
  var numero = req.body.numeroServer;
  var cep = req.body.cepServer;
  var complemento = req.body.complementoServer;
  var bairro = req.body.bairroServer;
  var cidade = req.body.cidadeServer;
  var estado = req.body.estadoServer;


  empresaModel.cadastrarEndereco(nomeLogradouro, tipoLogradouro, numero, cep, complemento, bairro, cidade, estado)
    .then((resultado) => {
      res.status(201).json(resultado);
    }).catch(
      function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! ENDEREÇO Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      }
    );


}

function cadastrar(req, res) {
  var fkEndereco = req.body.idEnderecoServer;
  var razaoSocial = req.body.razaoSocialServer;
  var cnpj = req.body.cnpjServer;
  var plano = req.body.planoServer;
  empresaModel.cadastrar(fkEndereco, razaoSocial, cnpj, plano)
    .then((resultado) => {
      res.status(201).json(resultado);
    }).catch(
      function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro EMPRESA DADOS! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      }
    );

}

function editarEndereco(req, res) {
  var idEndereco = req.params.fkEndereco
  var nomeLogradouro = req.body.nomeLogradouroServer;
  var tipoLogradouro = req.body.tipoLogradouroServer;
  var numero = req.body.numeroServer;
  var cep = req.body.cepServer;
  var complemento = req.body.complementoServer;
  var bairro = req.body.bairroServer;
  var cidade = req.body.cidadeServer;
  var estado = req.body.estadoServer;


  console.log(`------  ${idEndereco}  -------`)
  if (idEndereco == undefined) {
    res.status(400).send("idEndereco indefindido");
  } else if (nomeLogradouro == undefined) {
    res.status(400).send("A nomeLogradouro está indefinido!");
  } else if (tipoLogradouro == undefined) {
    res.status(400).send("A tipoLogradouro está indefinido!");
  } else if (numero == undefined) {
    res.status(400).send("A numero está indefinido!");
  } else if (cep == undefined) {
    res.status(400).send("A cep está indefinido!");
  } else if (complemento == undefined) {
    res.status(400).send("A complemento está indefinido!");
  } else {

    empresaModel.editarEndereco(idEndereco, nomeLogradouro, tipoLogradouro, numero, cep, complemento, bairro, cidade, estado)
      .then((resultado) => {
        res.status(201).json(resultado);
      }).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastro! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );

  }
}

function editar(req, res) {
  var idEmpresa = req.params.idEmpresa;
  var razaoSocial = req.body.razaoSocialServer;
  var cnpj = req.body.cnpjServer;
  var plano = req.body.planoServer;

  if (idEmpresa == undefined) {
    res.status(400).send("IdEmpresa indefindido");
  } else if (razaoSocial == undefined) {
    res.status(400).send("Razao social está indefinido!");
  } else if (cnpj == undefined) {
    res.status(400).send("Cnpj está indefinido!");
  } else if (plano == undefined) {
    res.status(400).send("Plano está indefinido!");
  } else {
    empresaModel.editar(idEmpresa, razaoSocial, cnpj, plano)
      .then((resultado) => {
        res.status(201).json(resultado);
      }).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastro EMPRESA DADOS! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }


}


function removerEmpresa(req, res) {
  var idEmpresa = req.params.idEmpresa;
  empresaModel.removerEmpresa(idEmpresa).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    res.status(500).json(erro.sqlMessage);
  });
}

function listarTipoLogradouro(req, res) {

  empresaModel.listarTipoLogradouro().then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os tipos de logradouro: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function listarTipoPlanos(req, res) {

  empresaModel.listarTipoPlanos().then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os tipos de planos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listarEmpresas,
  listarEmpresasPorId,
  cadastrarEndereco,
  editarEndereco,
  editar,
  removerEmpresa,
  listarTipoLogradouro,
  listarTipoPlanos
};
