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


  empresaModel.cadastrarEndereco(nomeLogradouro, tipoLogradouro, numero, cep, complemento)
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

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listarEmpresas,
  cadastrarEndereco
};
