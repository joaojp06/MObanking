var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listarEmpresas() {
  var instrucaoSql = `select id_empresa, razaoSocial, cnpj, status, nomeLogradouro, numLogradouro, cidade, estado, bairro, cep, complemento, tipo_logradouro, fkEndereco from vw_empresa_endereco where status = 'Ativa';`;

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

function cadastrarEndereco(nomeLogradouro, tipoLogradouro, numero, cep, complemento, bairro, cidade, estado) {
  var instrucaoSql = `insert into endereco (fkLogradouro, nomeLogradouro, numLogradouro, cidade, estado, bairro, cep, complemento) 
  VALUES ('${tipoLogradouro}','${nomeLogradouro}','${numero}','${cidade}', '${estado}', '${bairro}' ,'${cep}','${complemento}')`;

  return database.executar(instrucaoSql);
}

function cadastrar(razaoSocial, cnpj, plano) {
  var instrucaoSql = `INSERT INTO empresa (fkEndereco, razaoSocial, cnpj, fkPlano, status) 
  VALUES ('${fkEndereco}','${razaoSocial}', '${cnpj}', ${plano}, 'Ativa')`;

  return database.executar(instrucaoSql);
}

function editarEndereco(idEndereco, nomeLogradouro, tipoLogradouro, numero, cep, complemento, bairro, cidade, estado) {
  console.log(`idEndereco: ${idEndereco}`); // Adicione esta linha para depuração
  var instrucaoSql = `
 UPDATE endereco
  SET fkLogradouro = ${tipoLogradouro},
      nomeLogradouro = '${nomeLogradouro}',
      numLogradouro = ${numero},
      cidade = '${cidade}',
      estado = '${estado}',
      bairro = '${bairro}',
      cep = '${cep}',
      complemento = '${complemento}'
  WHERE id = ${idEndereco};
  `;

  return database.executar(instrucaoSql);
}


function editar(idEmpresa, razaoSocial, cnpj, plano) {
  var instrucaoSql = `
update empresa
set fkPlano = ${plano},
razaoSocial = '${razaoSocial}',
cnpj = ${cnpj}
where id = ${idEmpresa};
  `;

  return database.executar(instrucaoSql);
}

function removerEmpresa(idEmpresa) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucaoSql = `
  update empresa set status = 'Desativado' where id = ${idEmpresa};`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarTipoLogradouro() {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucaoSql = `
  select * from logradouro;;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarTipoPlanos() {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucaoSql = `
 select id,nome from plano;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
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
  editar,
  removerEmpresa,
  listarTipoLogradouro,
  listarTipoPlanos
};
