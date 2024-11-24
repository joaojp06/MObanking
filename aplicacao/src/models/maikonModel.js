var database = require("../database/config");

function listar(idEmpresa, apelido) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `
select * from demanda_hardware_servidor where idEmpresa = ${idEmpresa} and status = 'ativo' and apelido like "${apelido}";
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


function listarLimiteCpu(idServidor) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `
  WITH DailyMax AS (
    SELECT 
        fkServidor, 
        fkServico, 
        DATE(data) AS dia, 
        MAX(valor) AS maior_valor
    FROM 
        registro
    WHERE 
        fkServidor = ${idServidor} AND fkServico = 1
    GROUP BY 
        fkServidor, fkServico, DATE(data)
)
SELECT 
    r.fkServidor, 
    r.fkServico, 
    r.data AS data_completa, 
    dm.maior_valor
FROM 
    registro r
JOIN 
    DailyMax dm
ON 
    r.fkServidor = dm.fkServidor 
    AND r.fkServico = dm.fkServico 
    AND DATE(r.data) = dm.dia 
    AND r.valor = dm.maior_valor
ORDER BY 
    dm.maior_valor desc LIMIT 3;

  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarLimiteRam(idServidor) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `
  WITH DailyMax AS (
    SELECT 
        fkServidor, 
        fkServico, 
        DATE(data) AS dia, 
        MAX(valor) AS maior_valor
    FROM 
        registro
    WHERE 
        fkServidor = ${idServidor} AND fkServico = 2
    GROUP BY 
        fkServidor, fkServico, DATE(data)
)
SELECT 
    r.fkServidor, 
    r.fkServico, 
    r.data AS data_completa, 
    dm.maior_valor
FROM 
    registro r
JOIN 
    DailyMax dm
ON 
    r.fkServidor = dm.fkServidor 
    AND r.fkServico = dm.fkServico 
    AND DATE(r.data) = dm.dia 
    AND r.valor = dm.maior_valor
ORDER BY 
    dm.maior_valor desc LIMIT 3;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  listar,
  listarLimiteCpu,
  listarLimiteRam
};