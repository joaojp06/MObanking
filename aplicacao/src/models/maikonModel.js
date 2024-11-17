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

function listarLimites(idServidor) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `
  WITH cpu AS (
    SELECT valor AS valor_cpu, data AS data_cpu,
           ROW_NUMBER() OVER (ORDER BY valor DESC) AS rn
    FROM registro
    WHERE fkServidor = ${idServidor} AND fkServico = 1
    GROUP BY data, valor
),
ram AS (
    SELECT valor AS valor_ram, data AS data_ram,
           ROW_NUMBER() OVER (ORDER BY valor DESC) AS rn
    FROM registro
    WHERE fkServidor = ${idServidor} AND fkServico = 2
    GROUP BY data, valor
)
SELECT 
    cpu.valor_cpu,
    cpu.data_cpu,
    ram.valor_ram,
    ram.data_ram
FROM cpu
LEFT JOIN ram ON cpu.rn = ram.rn
ORDER BY cpu.valor_cpu DESC
LIMIT 3;

  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  listar,
  listarLimites
};