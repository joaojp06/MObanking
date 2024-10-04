var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listarEmpresas() {
  var instrucaoSql = `select id_empresa, razaoSocial, cnpj, status, nomeLogradouro, numLogradouro, cidade, estado, bairro, cep, complemento, tipo_logradouro, fkEndereco from vw_empresa_endereco;`;

  return database.executar(instrucaoSql);
}

function listarEmpresasPorId(idEmpresa) {
  var instrucaoSql = `
  select * from vw_empresa_endereco where id_empresa = ${idEmpresa} ;
  `;

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

function editarEndereco(idEndereco, nomeLogradouro, tipoLogradouro, numero, cep, complemento) {
  console.log(`idEndereco: ${idEndereco}`); // Adicione esta linha para depuração
  var instrucaoSql = `
  UPDATE endereco
  SET fkLogradouro = 1,
      nomeLogradouro = '${nomeLogradouro}',
      numLogradouro = ${numero},
      bairro = 'Centro Atualizado',
      cep = '${cep}',
      complemento = '${complemento}'
  WHERE id = ${idEndereco};
  `;

  return database.executar(instrucaoSql);
}


function editar(idEmpresa, razaoSocial, cnpj) {
  var instrucaoSql = `
  UPDATE empresa
SET razaoSocial = '${razaoSocial}',
    cnpj = '${cnpj}'
WHERE id = ${idEmpresa};
  `;

  return database.executar(instrucaoSql);
}

module.exports = {
  buscarPorCnpj, 
  buscarPorId, 
  cadastrar, 
  listarEmpresas,
  listarEmpresasPorId, 
  cadastrarEndereco,
  editarEndereco,
  editar
};
