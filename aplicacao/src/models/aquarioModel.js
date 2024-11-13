var database = require("../database/config");


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
  SELECT 
    fkServidor,
    MAX(CASE WHEN fkServico = 1 THEN valor END) AS limite_valor_cpu,
    MAX(CASE WHEN fkServico = 2 THEN valor END) AS limite_valor_ram,
    MAX(CASE WHEN fkServico = 3 THEN valor END) AS limite_valor_disco,
    MAX(CASE WHEN fkServico = 4 THEN valor END) AS limite_valor_rede
FROM 
    limite_servico_monitorado
WHERE 
    fkServidor = ${idServidor}
GROUP BY 
    fkServidor;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarApelidoFuncaoInput(idServidor) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `
  select apelido, funcao from vw_servidor_card where id_servidor = ${idServidor};
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

function editarInfoServidor(idServidor, apelidoServidor, funcaoServidor) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarInfoServidor()"
  );
  var instrucaoSql = `
  UPDATE servidor 
  SET apelido = '${apelidoServidor}', funcao = '${funcaoServidor}'
  WHERE id = ${idServidor};

  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  listarServidores,
  desativarServidor,
  ativarServidor,
  listarLimite,
  listarApelidoFuncaoInput,
  editarLimiteServidorPlano1,
  editarLimiteServidorPlano2,
  editarLimiteServidorPlano3,
  editarInfoServidor
};