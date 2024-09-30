var database = require("../database/config");

function buscarAquariosPorEmpresa(empresaId) {
  var instrucaoSql = `SELECT * FROM aquario a WHERE fk_empresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(empresaId, descricao) {
  var instrucaoSql = `INSERT INTO (descricao, fk_empresa) aquario VALUES (${descricao}, ${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarServidores(idEmpresa) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `
        select 
          e.razaoSocial as empresa,
          s.id as id,
          sv.nome as servicoMonitorado,
          r.valor as valorRegistro
            from empresa e
            join servidor s on e.id = s.fkEmpresa
            join servicoMonitorado sm on s.id = sm.fkServidor
            join servico sv on sm.fkServico = sv.id
            join registro r on sm.id = r.fkServicoMonitorado
              where e.id = ${idEmpresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarAquariosPorEmpresa,
  cadastrar,
  listarServidores
};
