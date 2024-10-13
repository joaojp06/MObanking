var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listarEmpresas(req, res) {
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
          "\nHouve um erro ao realizar o cadastro! Erro: ",
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

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `A empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrar(fkEndereco, razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

function editarEndereco(req, res) {
  var idEndereco = req.params.fkEndereco
  var nomeLogradouro = req.body.nomeLogradouroServer;
  var tipoLogradouro = req.body.tipoLogradouroServer;
  var numero = req.body.numeroServer;
  var cep = req.body.cepServer;
  var complemento = req.body.complementoServer;

  console.log(`------  ${idEndereco}  -------`)
  if (idEndereco == undefined) {
    res.status(400).send("idEndereco indefindido");
  } else if (nomeLogradouro == undefined) {
    res.status(400).send("A nomeLogradouro está indefinido!");
  } else if (tipoLogradouro == undefined) {
    res.status(400).send("A tipoLogradouro está indefinido!");
  }else if (numero == undefined) {
    res.status(400).send("A numero está indefinido!");
  }else if (cep == undefined) {
    res.status(400).send("A cep está indefinido!");
  }else if (complemento == undefined) {
    res.status(400).send("A complemento está indefinido!");
  } else {

    empresaModel.editarEndereco(idEndereco, nomeLogradouro, tipoLogradouro, numero, cep, complemento)
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

  empresaModel.editar(cnpj).then((resultado) => {
    empresaModel.cadastrar(idEmpresa, fkEndereco, razaoSocial, cnpj).then((resultado) => {
      res.status(201).json(resultado);
    });
  });
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

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listarEmpresas,
  listarEmpresasPorId,
  cadastrarEndereco,
  editarEndereco,
  editar,
  removerEmpresa
};
