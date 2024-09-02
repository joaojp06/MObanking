class Cadastro(
    var nome: String = "",
    var email: String = "",
    var senha: String = "",
    var cargo: String = ""
) {

    fun cadastrar() {
        println("Cadastro realizado com sucesso!")
    }

    fun logar(emailInformado: String, senhaInformada: String): Boolean {
        return emailInformado == email && senhaInformada == senha
    }

    fun sair (){
        nome = ""
        email = ""
        senha = ""
        cargo = ""
    }
}
