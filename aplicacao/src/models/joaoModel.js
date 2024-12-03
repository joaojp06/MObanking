var database = require("../database/config");

function listarPrevisoes(idEmpresa) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `SELECT 
  s.apelido,
  s.funcao,
  r.valor,
  r.fkAlertaPrevisao,
  lsm.valor AS limite_valor
FROM 
  servidor s
JOIN 
  registro r ON r.fkServidor = s.id
LEFT JOIN 
  limite_servico_monitorado lsm ON lsm.fkServidor = s.id AND lsm.fkServico = 2
WHERE 
  r.fkServico = 5 
  AND s.fkEmpresa = ${idEmpresa}
  AND r.data = (
      SELECT MAX(r2.data)
      FROM registro r2
      WHERE r2.fkServidor = s.id
        AND r2.fkServico = 5
  )
ORDER BY 
  r.fkAlertaPrevisao DESC;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarVerde(idEmpresa) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `SELECT 
  COUNT(*) AS quantidade
FROM 
  (
      SELECT 
          s.apelido, 
          s.funcao,
          r.valor AS ultimo_registro,
          r.fkAlertaPrevisao
      FROM 
          servidor s
      JOIN 
          empresa e ON s.fkEmpresa = e.id
      LEFT JOIN 
          registro r ON s.id = r.fkServidor 
          AND r.fkServico = 5
          AND r.data = (
              SELECT MAX(data) 
              FROM registro 
              WHERE fkServidor = s.id 
              AND fkServico = 5
          )
      WHERE 
          e.id = ${idEmpresa}
  ) AS subquery
WHERE 
  fkAlertaPrevisao = 1;
`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarAmarelo(idEmpresa) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `SELECT 
  COUNT(*) AS quantidade
FROM 
  (
      SELECT 
          s.apelido, 
          s.funcao,
          r.valor AS ultimo_registro,
          r.fkAlertaPrevisao
      FROM 
          servidor s
      JOIN 
          empresa e ON s.fkEmpresa = e.id
      LEFT JOIN 
          registro r ON s.id = r.fkServidor 
          AND r.fkServico = 5
          AND r.data = (
              SELECT MAX(data) 
              FROM registro 
              WHERE fkServidor = s.id 
              AND fkServico = 5
          )
      WHERE 
          e.id = ${idEmpresa}
  ) AS subquery
WHERE 
  fkAlertaPrevisao = 2;
`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarVermelho(idEmpresa) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `SELECT 
  COUNT(*) AS quantidade
FROM 
  (
      SELECT 
          s.apelido, 
          s.funcao,
          r.valor AS ultimo_registro,
          r.fkAlertaPrevisao
      FROM 
          servidor s
      JOIN 
          empresa e ON s.fkEmpresa = e.id
      LEFT JOIN 
          registro r ON s.id = r.fkServidor 
          AND r.fkServico = 5
          AND r.data = (
              SELECT MAX(data) 
              FROM registro 
              WHERE fkServidor = s.id 
              AND fkServico = 5
          )
      WHERE 
          e.id = ${idEmpresa}
  ) AS subquery
WHERE 
  fkAlertaPrevisao = 3;
`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  listarPrevisoes,
  listarVerde,
  listarAmarelo,
  listarVermelho
};