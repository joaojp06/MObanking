var database = require("../database/config");

function listarServidores(idEmpresa, mes) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `SELECT
    v.id_servidor AS id,
    v.servidor_apelido AS Apelido,
    v.servidor_funcao AS Funcao,
    COUNT(v.alerta_id) AS qtdAlertas
FROM 
    vw_alertas v
WHERE
    v.id_empresa = ${idEmpresa}
    AND MONTH(v.alerta_data) = ${mes}
GROUP BY 
    v.id_servidor, v.servidor_apelido, v.servidor_funcao
ORDER BY 
    qtdAlertas DESC;

`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function obterQtdAlertasCPU(idEmpresa, mes, idServidor) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `SELECT 
    (WEEK(alerta_data, 1) - WEEK(DATE_SUB(alerta_data, INTERVAL DAYOFMONTH(alerta_data) - 1 DAY), 1) + 1) AS semana,
    COUNT(alerta_id) AS qtd_alertas
FROM 
    vw_alertas
WHERE 
    id_empresa = ${idEmpresa}                          -- Filtro pela empresa com id 3
    AND id_servidor = ${idServidor}                    -- Filtro pelo id do servidor (preenchido pelo usuário)
    AND id_servico = 1                      -- Filtro pelo id do serviço (preenchido pelo usuário)
    AND MONTH(alerta_data) = ${mes}         -- Filtro pelo mês escolhido (preenchido pelo usuário)
    AND YEAR(alerta_data) = 2024               -- Filtro pelo ano escolhido (preenchido pelo usuário)
GROUP BY 
    semana
ORDER BY 
    semana;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function obterQtdAlertasRAM(idEmpresa, mes, idServidor) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `SELECT 
    (WEEK(alerta_data, 1) - WEEK(DATE_SUB(alerta_data, INTERVAL DAYOFMONTH(alerta_data) - 1 DAY), 1) + 1) AS semana,
    COUNT(alerta_id) AS qtd_alertas
FROM 
    vw_alertas
WHERE 
    id_empresa = ${idEmpresa}                          -- Filtro pela empresa com id 3
    AND id_servidor = ${idServidor}                    -- Filtro pelo id do servidor (preenchido pelo usuário)
    AND id_servico = 2            -- Filtro pelo id do serviço (preenchido pelo usuário)
    AND MONTH(alerta_data) = ${mes}         -- Filtro pelo mês escolhido (preenchido pelo usuário)
    AND YEAR(alerta_data) = 2024               -- Filtro pelo ano escolhido (preenchido pelo usuário)
GROUP BY 
    semana
ORDER BY 
    semana;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function obterQtdAlertasDISCO(idEmpresa, mes, idServidor) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `SELECT 
    (WEEK(alerta_data, 1) - WEEK(DATE_SUB(alerta_data, INTERVAL DAYOFMONTH(alerta_data) - 1 DAY), 1) + 1) AS semana,
    COUNT(alerta_id) AS qtd_alertas
FROM 
    vw_alertas
WHERE 
    id_empresa = ${idEmpresa}                          -- Filtro pela empresa com id 3
    AND id_servidor = ${idServidor}                    -- Filtro pelo id do servidor (preenchido pelo usuário)
    AND id_servico = 3                     -- Filtro pelo id do serviço (preenchido pelo usuário)
    AND MONTH(alerta_data) = ${mes}         -- Filtro pelo mês escolhido (preenchido pelo usuário)
    AND YEAR(alerta_data) = 2024               -- Filtro pelo ano escolhido (preenchido pelo usuário)
GROUP BY 
    semana
ORDER BY 
    semana;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function obterQtdAlertasREDE(idEmpresa, mes, idServidor) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `SELECT 
    (WEEK(alerta_data, 1) - WEEK(DATE_SUB(alerta_data, INTERVAL DAYOFMONTH(alerta_data) - 1 DAY), 1) + 1) AS semana,
    COUNT(alerta_id) AS qtd_alertas
FROM 
    vw_alertas
WHERE 
    id_empresa = ${idEmpresa}                          -- Filtro pela empresa com id 3
    AND id_servidor = ${idServidor}                    -- Filtro pelo id do servidor (preenchido pelo usuário)
    AND id_servico = 4                      -- Filtro pelo id do serviço (preenchido pelo usuário)
    AND MONTH(alerta_data) = ${mes}         -- Filtro pelo mês escolhido (preenchido pelo usuário)
    AND YEAR(alerta_data) = 2024               -- Filtro pelo ano escolhido (preenchido pelo usuário)
GROUP BY 
    semana
ORDER BY 
    semana;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
    listarServidores,
    obterQtdAlertasCPU,
    obterQtdAlertasRAM,
    obterQtdAlertasDISCO,
    obterQtdAlertasREDE
  };