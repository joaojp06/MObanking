var database = require("../database/config");

function buscarMedidasServidor(idServidor) {

  var instrucaoSql = `
  SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY fkServico ORDER BY id DESC) as row_num
  FROM registro
  WHERE fkServidor = ${idServidor}
) sub
WHERE row_num <= 1;

  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarMedidasServidor
};