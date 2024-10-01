var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listarEmpresas() {
  var instrucaoSql = `SELECT * FROM empresa;`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrarEndereco(nomeLogradouro, tipoLogradouro, numero, cep, complemento) {
  var instrucaoSql = `INSERT INTO endereco (fkLogradouro, nomeLogradouro, numLogradouro, bairro, cep, complemento) 
  VALUES ('${tipoLogradouro}','${nomeLogradouro}','${numero}', 'bairro qualquer', '${cep}','${complemento}')`;

  return database.executar(instrucaoSql);
}

function cadastrar(fkEndereco, razaoSocial, cnpj) {
  var instrucaoSql = `INSERT INTO empresa (fkEndereco, razaoSocial, cnpj) 
  VALUES ('${fkEndereco}','${razaoSocial}', '${cnpj}')`;

  return database.executar(instrucaoSql);
}

module.exports = {
  buscarPorCnpj, 
  buscarPorId, 
  cadastrar, 
  listarEmpresas, 
  cadastrarEndereco };
