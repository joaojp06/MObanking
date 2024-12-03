var database = require("../database/config");

function listarServidores(idEmpresa, mes) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `SELECT 
    s.apelido AS Apelido,
    s.funcao AS Funcao,
    COUNT(a.id) AS qtdAlertas,
    a.data
FROM 
    servidor s
LEFT JOIN 
    alerta a
ON 
    s.id = a.fkServidor
JOIN 
	empresa e
ON
	a.fkEmpresa = e.id
WHERE
	e.id = ${idEmpresa}
    AND MONTH(a.data) = ${mes}
GROUP BY 
    s.id, s.apelido, s.funcao, a.data
ORDER BY 
    qtdAlertas DESC;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
    listarServidores
  };