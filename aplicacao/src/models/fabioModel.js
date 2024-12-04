var database = require("../database/config");

function grafico(inicio, fim, idEmpresa) {
  // Monta a instrução SQL usando os parâmetros fornecidos
  var instrucaoSql = ` 
       WITH dias_filtrados AS (
    SELECT 
        DATE_FORMAT(r.data, '%Y-%m-%d') AS data,
        COUNT(*) AS total_registros,
        SUM(CASE WHEN r.valor > 20 THEN 1 ELSE 0 END) AS registros_acima_85,
        (SUM(CASE WHEN r.valor > 20 THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS percentual_acima_85
    FROM registro r
    INNER JOIN servico_monitorado sm ON r.fkServidor = sm.fkServidor AND r.fkServico = sm.fkServico
    INNER JOIN servidor s ON sm.fkServidor = s.id
    WHERE r.data BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
      AND TIME(r.data) BETWEEN '${inicio}:00' AND '${fim}:59'
      AND sm.fkServico = 1 -- Serviço monitorado a ser analisado (por exemplo, CPU)
      AND s.fkEmpresa = ${idEmpresa} -- Filtra pela empresa
    GROUP BY DATE_FORMAT(r.data, '%Y-%m-%d')
    HAVING percentual_acima_85 >= 30 -- Apenas dias com mais de 30% acima de 85%
),
dados_filtrados AS (
    SELECT 
        DATE_FORMAT(r.data, '%W') AS dia_semana,  -- Nome do dia da semana
        DATE_FORMAT(r.data, '%H:00') AS hora,  -- Hora arredondada
        DATE_FORMAT(r.data, '%Y-%m-%d') AS data, -- Data sem hora
        AVG(r.valor) AS media_valor
    FROM registro r
    INNER JOIN servico_monitorado sm ON r.fkServidor = sm.fkServidor AND r.fkServico = sm.fkServico
    INNER JOIN servidor s ON sm.fkServidor = s.id
    WHERE r.data BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
      AND TIME(r.data) BETWEEN '${inicio}:00' AND '${fim}:59'
      AND sm.fkServico = 1 -- Serviço monitorado a ser analisado
      AND s.fkEmpresa = ${idEmpresa} -- Filtra pela empresa
    GROUP BY 
        DATE_FORMAT(r.data, '%W'),  -- Dia da semana (semana)
        DATE_FORMAT(r.data, '%H:00'), -- Hora
        DATE_FORMAT(r.data, '%Y-%m-%d') -- Data
)
SELECT 
    df.dia_semana,
    df.hora,
    df.data,
    df.media_valor
FROM dados_filtrados df
JOIN dias_filtrados df2 ON df.data = df2.data
ORDER BY df.data DESC, df.hora ASC;

  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function KPI1(inicio, fim, idEmpresa) {
  // Monta a instrução SQL usando os parâmetros fornecidos
  var instrucaoSql = ` 
       WITH dias_filtrados AS (
    SELECT 
        DATE_FORMAT(r.data, '%Y-%m-%d') AS data,
        COUNT(*) AS total_registros,
        SUM(CASE WHEN r.valor > 20 THEN 1 ELSE 0 END) AS registros_acima_85,
        (SUM(CASE WHEN r.valor > 20 THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS percentual_acima_85
    FROM registro r
    INNER JOIN servico_monitorado sm ON r.fkServidor = sm.fkServidor AND r.fkServico = sm.fkServico
    INNER JOIN servidor s ON sm.fkServidor = s.id
    WHERE r.data BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
      AND TIME(r.data) BETWEEN '${inicio}:00' AND '${fim}:59'
      AND sm.fkServico = 1
      AND s.fkEmpresa = ${idEmpresa}
    GROUP BY DATE_FORMAT(r.data, '%Y-%m-%d')
    HAVING percentual_acima_85 >= 30
),
dados_filtrados AS (
    SELECT 
        DATE_FORMAT(r.data, '%W') AS dia_semana,
        MAX(r.valor) AS maior_valor
    FROM registro r
    INNER JOIN servico_monitorado sm ON r.fkServidor = sm.fkServidor AND r.fkServico = sm.fkServico
    INNER JOIN servidor s ON sm.fkServidor = s.id
    WHERE r.data BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
      AND TIME(r.data) BETWEEN '${inicio}:00' AND '${fim}:59'
      AND sm.fkServico = 1
      AND s.fkEmpresa = ${idEmpresa}
    GROUP BY DATE_FORMAT(r.data, '%W')
)
SELECT 
    CASE df.dia_semana
        WHEN 'Sunday' THEN 'Domingo'
        WHEN 'Monday' THEN 'Segunda'
        WHEN 'Tuesday' THEN 'Terça'
        WHEN 'Wednesday' THEN 'Quarta'
        WHEN 'Thursday' THEN 'Quinta'
        WHEN 'Friday' THEN 'Sexta'
        WHEN 'Saturday' THEN 'Sábado'
    END AS dia_semana_traduzido,
    df.maior_valor
FROM dados_filtrados df
ORDER BY df.maior_valor DESC
LIMIT 1;

`;


  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
  console.log("EXECUTANDO KPI1");

}

function KPI2(inicio, fim, idEmpresa) {
  // Monta a instrução SQL usando os parâmetros fornecidos
  var instrucaoSql = ` 
       WITH dias_filtrados AS (
    SELECT 
        DATE_FORMAT(r.data, '%Y-%m-%d') AS data,
        COUNT(*) AS total_registros,
        SUM(CASE WHEN r.valor > 20 THEN 1 ELSE 0 END) AS registros_acima_85,
        (SUM(CASE WHEN r.valor > 20 THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS percentual_acima_85
    FROM registro r
    INNER JOIN servico_monitorado sm ON r.fkServidor = sm.fkServidor AND r.fkServico = sm.fkServico
    INNER JOIN servidor s ON sm.fkServidor = s.id
    WHERE r.data BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
      AND TIME(r.data) BETWEEN '${inicio}:00' AND '${fim}:59'
      AND sm.fkServico = 1
      AND s.fkEmpresa = ${idEmpresa}
    GROUP BY DATE_FORMAT(r.data, '%Y-%m-%d')
    HAVING percentual_acima_85 >= 30
),
dados_filtrados AS (
    SELECT 
        DATE_FORMAT(r.data, '%W') AS dia_semana,
        MIN(r.valor) AS menor_valor
    FROM registro r
    INNER JOIN servico_monitorado sm ON r.fkServidor = sm.fkServidor AND r.fkServico = sm.fkServico
    INNER JOIN servidor s ON sm.fkServidor = s.id
    WHERE r.data BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
      AND TIME(r.data) BETWEEN '${inicio}:00' AND '${fim}:59'
      AND sm.fkServico = 1
      AND s.fkEmpresa = ${idEmpresa}
    GROUP BY DATE_FORMAT(r.data, '%W')
)
SELECT 
    CASE df.dia_semana
        WHEN 'Sunday' THEN 'Domingo'
        WHEN 'Monday' THEN 'Segunda'
        WHEN 'Tuesday' THEN 'Terça'
        WHEN 'Wednesday' THEN 'Quarta'
        WHEN 'Thursday' THEN 'Quinta'
        WHEN 'Friday' THEN 'Sexta'
        WHEN 'Saturday' THEN 'Sábado'
    END AS dia_semana_traduzido,
    df.menor_valor
FROM dados_filtrados df
ORDER BY df.menor_valor ASC
LIMIT 1;

`;


  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
  console.log("EXECUTANDO KPI2");

}



module.exports = {
  grafico,
  KPI1,
  KPI2
};