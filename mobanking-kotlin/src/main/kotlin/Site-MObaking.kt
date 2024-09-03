fun main() {
    val cadastro = Cadastro()
    val mobaking = MObanking()

    println()
    println("MObanking")
    println()
    println("Cadastro")
    print("Digite seu nome: ")
    cadastro.nome = readln()
    print("Digite seu e-mail: ")
    cadastro.email = readln()
    print("Digite sua senha: ")
    cadastro.senha = readln()
    print("Digite o seu cargo na empresa: ")
    cadastro.cargo = readln()
    cadastro.cadastrar()

    println()

    var loginBemSucedido = false

    while (!loginBemSucedido) {
        println("Login")
        print("Digite seu e-mail para login: ")
        val emailInformado = readln()
        print("Digite sua senha para login: ")
        val senhaInformada = readln()

        if (cadastro.logar(emailInformado, senhaInformada)) {
            println("Login bem-sucedido!")
            loginBemSucedido = true
        } else {
            println("Email ou senha incorretos. Tente novamente.")
        }
    }

    println()

    print("Adicione o nome do seu servidor ao site: ")
    mobaking.servidor = readln()
    mobaking.adicionar()

    println()

    var continuar = true

    while (continuar) {
        println("------- ${mobaking.servidor} --------\n" +
                "1 - Verificar o estado do Servidor.\n" +
                "2 - Ver a lista dos últimos alertas.\n" +
                "3 - Abrir um chamado ao Suporte.\n" +
                "4 - Ver a lista dos chamados abertos.\n" +
                "5 - Sair.\n")
        print("Digite aqui: ")
        val escolha = readln().toInt()

        when (escolha){
            1 -> {
                mobaking.verificarEstado()
                println()
            }
            2 -> {
                mobaking.listarAlertas()
                println()
            }
            3 -> {
                mobaking.suporte()
                println()
            }
            4 -> {
                mobaking.listarSuporte()
                println()
            }
            5 -> {
                println("Logout")
                cadastro.sair()
                println("Você foi desconectado.")
                continuar = false
            }
            else -> println("Valor inserido inválido!")
        }

    }
}

