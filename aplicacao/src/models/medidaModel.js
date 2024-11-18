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

function buscarMedidasMediaCPU(idEmpresa, inpCPU1, inpCPU2) {

    var instrucaoSql = `
    select valor_medio, data_dia from vw_media_diaria_componentes where servico_nome = "cpu" and id_empresa = ${idEmpresa} and data_dia between "${inpCPU1}" and "${inpCPU2}";
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasMediaRAM(idEmpresa, inpRAM1, inpRAM2) {

    var instrucaoSql = `
    select valor_medio, data_dia from vw_media_diaria_componentes where servico_nome = "ram" and id_empresa = ${idEmpresa} and data_dia between "${inpRAM1}" and "${inpRAM2}";
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasMediaDISCO(idEmpresa, inpDISCO1, inpDISCO2) {

    var instrucaoSql = `
    select valor_medio, data_dia from vw_media_diaria_componentes where servico_nome = "disco" and id_empresa = ${idEmpresa} and data_dia between "${inpDISCO1}" and "${inpDISCO2}";
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasMediaREDE(idEmpresa, inpREDE1, inpREDE2) {

    var instrucaoSql = `
    select valor_medio, data_dia from vw_media_diaria_componentes where servico_nome = "rede" and id_empresa = ${idEmpresa} and data_dia between "${inpREDE1}" and "${inpREDE2}";
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarMedidasServidor,
    buscarMedidasMediaCPU,
    buscarMedidasMediaRAM,
    buscarMedidasMediaDISCO,
    buscarMedidasMediaREDE
}
