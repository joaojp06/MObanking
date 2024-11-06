var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        // Armazenando dados na sessão
                        idUsuario = resultadoAutenticar[0].idUsuario;
                        emailUsuario = resultadoAutenticar[0].emailUsuario;
                        nomeUsuario = resultadoAutenticar[0].nomeUsuario;
                        idUsuario = resultadoAutenticar[0].idUsuario;
                        idEmpresa = resultadoAutenticar[0].idEmpresa;
                        idTipoUsuario = resultadoAutenticar[0].idTipoUsuario;
                        fkPlano = resultadoAutenticar[0].fkPlano;
                        cpfUsuario = resultadoAutenticar[0].cpfUsuario;            

                        res.status(200).json(resultadoAutenticar);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrar(req, res) {
    var fkEmpresa = req.body.fkEmpresa
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var senha = req.body.senhaServer;
    var nivel = req.body.nivelServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");  
    } else {
        usuarioModel.cadastrar(nome, email, cpf, senha, fkEmpresa, nivel)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: to NA CONTROLLER ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarFuncionarios(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var idUsuarioListFun = req.params.idUsuarioListFun;
  
    usuarioModel.listarFuncionarios(idEmpresa, idUsuarioListFun).then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os funcionarios: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }

function infoUsuario(req, res) {
    var idUsuario = req.params.idUsuario;
  
    usuarioModel.infoUsuario(idUsuario).then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao obter informações do usuário desejado: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }

function listarTipoUsuario(req, res) {
    
  
    usuarioModel.listarTipoUsuario().then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os tipos usuarios: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }

function editarUsuario(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var idUsuario = req.params.idUsuario

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");  
    } else {
        usuarioModel.editarUsuario(nome, email, senha, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a edição! Erro: to NA CONTROLLER ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editarUsuarioADM(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var cpf = req.body.cpfServer;
    var tipoUsuario = req.body.tipoUsuarioServer;
    var idUsuario = req.params.idUsuario;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");  
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");  
    } else if (tipoUsuario == undefined) {
        res.status(400).send("Seu tipo de usuário está undefined!");  
    } else {
        usuarioModel.editarUsuarioADM(nome, email, senha, cpf, tipoUsuario, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a edição! Erro: to NA CONTROLLER ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function removerUsuario(req, res) {
    var idUsuario = req.params.idUsuario;
    usuarioModel.removerUsuario(idUsuario).then((resultado) => {
        if (resultado.length > 0) {
          res.status(200).json(resultado);
        } else {
          res.status(204).json([]);
        }
      }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os tipos usuarios: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
}

function recuperarSenha(req, res) {
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu CPF está undefined!");
    } else {

        usuarioModel.recuperarSenha(email, cpf)
            .then(
                function (resultadoRecuperar) {
                    console.log(`\nResultados encontrados: ${resultadoRecuperar.length}`);
                    if (resultadoRecuperar.length == 1) {
                        console.log(resultadoRecuperar);

                        res.status(200).json(resultadoRecuperar);
                    } else if (resultadoRecuperar.length == 0) {
                        console.log(resultadoRecuperar)
                        res.status(403).send("Email e/ou CPF inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function redefinirSenha(req, res) {
    var senha = req.body.senhaServer;
    var idUsuario = req.body.idUsuarioServer

    // Faça as validações dos valores
    if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");  
    } else {
        usuarioModel.redefinirSenha(senha, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a edição! Erro: to NA CONTROLLER ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar,
    listarFuncionarios,
    editarUsuario,
    listarTipoUsuario,
    infoUsuario,
    editarUsuarioADM,
    removerUsuario,
    recuperarSenha,
    redefinirSenha
}