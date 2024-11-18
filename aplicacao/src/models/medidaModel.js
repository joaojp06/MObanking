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

function buscarMedidasServidorMedia(idEmpresa) {

    var instrucaoSql = `
    select * from vw_media_diaria_componentes where id_empresa = 3;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarMedidasServidor,
    buscarMedidasServidorMedia
}
