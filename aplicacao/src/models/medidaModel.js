var database = require("../database/config");

function buscarMedidasServidor(idServidor) {

    var instrucaoSql = `
    SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY fkServico ORDER BY id DESC) as row_num
    FROM registro
    WHERE fkServidor = ${idServidor}
) sub
WHERE row_num <= 5;

    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    var instrucaoSql = `SELECT 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        FROM medida WHERE fk_aquario = ${idAquario} 
                    ORDER BY id DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarMedidasServidor,
    buscarMedidasEmTempoReal
}
