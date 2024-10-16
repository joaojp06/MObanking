var database = require("../database/config");

function buscarAquariosPorEmpresa(empresaId) {
  var instrucaoSql = `SELECT * FROM aquario a WHERE fk_empresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(empresaId, descricao) {
  var instrucaoSql = `INSERT INTO (descricao, fk_empresa) aquario VALUES (${descricao}, ${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function desativarServidor(idServidor) {
  var instrucaoSql = `update servidor set status = 'desativado' where id = ${idServidor}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function ativarServidor(idServidor) {
  var instrucaoSql = `update servidor set status = 'ativo' where id = ${idServidor}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarServidores(idEmpresa, status) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `select * from vw_servidor_card where id_empresa = ${idEmpresa} and status = '${status}' order by id_servidor ;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarLimite(idServidor) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `
  select * from vw_limites_servico where id_servidor = ${idServidor};
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


// Edição de limites:
function editarLimiteServidorPlano1(idServidor, limiteCpu, limiteRam) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `
  UPDATE limite_servico_monitorado 
SET valor = CASE 
    WHEN fkServico = 1 THEN ${limiteCpu}
    WHEN fkServico = 2 THEN ${limiteRam}
END
WHERE fkServidor = ${idServidor} AND fkServico IN (1, 2);

  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function editarLimiteServidorPlano2(idServidor, limiteCpu, limiteRam, limiteDisco) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `
  UPDATE limite_servico_monitorado 
SET valor = CASE 
    WHEN fkServico = 1 THEN ${limiteCpu}
    WHEN fkServico = 2 THEN ${limiteRam}
    WHEN fkServico = 3 THEN ${limiteDisco}
END
WHERE fkServidor = ${idServidor} AND fkServico IN (1, 2, 3);

  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function editarLimiteServidorPlano3(idServidor, limiteCpu, limiteRam, limiteDisco, limiteRede) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `
  UPDATE limite_servico_monitorado 
SET valor = CASE 
    WHEN fkServico = 1 THEN ${limiteCpu}
    WHEN fkServico = 2 THEN ${limiteRam}
    WHEN fkServico = 3 THEN ${limiteDisco}
    WHEN fkServico = 4 THEN ${limiteRede}
END
WHERE fkServidor = ${idServidor} AND fkServico IN (1, 2, 3, 4);

  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}



module.exports = {
  buscarAquariosPorEmpresa,
  cadastrar,
  listarServidores,
  desativarServidor,
  ativarServidor,
  listarLimite,
  editarLimiteServidorPlano1,
  editarLimiteServidorPlano2,
  editarLimiteServidorPlano3
};
