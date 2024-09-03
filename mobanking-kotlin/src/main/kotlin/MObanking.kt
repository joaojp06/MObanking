import kotlin.random.Random

class MObanking(
    var servidor: String = "",
) {

    val alertas = mutableListOf<String>()
    val mensagemSuporte = mutableListOf<String>()

    fun adicionar() {

        println("Você adicionou o servidor $servidor ao site")
    }

    fun verificarEstado() {

        val cpu = Random.nextInt(1, 101)
        val ram = Random.nextInt(1, 101)
        val armazenamento = Random.nextInt(1, 101)
        val rede = Random.nextInt(1, 101)

        if (cpu > 70) {
            adicionarAlerta("Alerta: O uso da CPU está em: ${cpu}%!")
        } else {
            println("Está tudo bem com o servidor o uso da CPU está em: ${cpu}%!")
        }
        if (ram > 70) {
            adicionarAlerta("Alerta: O uso da RAM está em: ${ram}%!")
        } else {
            println("Está tudo bem com o servidor o uso da RAM está em: ${ram}%!")
        }
        if (armazenamento > 70) {
            adicionarAlerta("Alerta: O espaço do Armazenamento está em ${armazenamento}%!")
        } else {
            println("Está tudo bem com o servidor o uso do Armazenamento está em: ${armazenamento}%!")
        }
        if (rede > 70) {
            adicionarAlerta("Alerta: O uso da Rede está em ${rede}%!")
        } else {
            println("O uso da Rede está em: ${rede}%!")
        }
    }


    fun adicionarAlerta(mensagem: String) {
        alertas.add(mensagem)
        println(mensagem)
    }

    fun listarAlertas() {

        println("Lista de Alertas:")
        println()
        if (alertas.isEmpty()) {
            println("Nenhum Alerta registrado.")
        } else {
            for (alerta in alertas) {
                println(alerta)
            }
        }
    }

    fun suporte() {

            println("Descreva o problema:")
            val problema = readln()
            mensagemSuporte.add(problema)
            println("Chamado ao suporte registrado com a seguinte mensagem: '$problema'")
        }


    fun listarSuporte() {

        println("Lista de Mensagens de Suporte:")
        println()
        if (mensagemSuporte.isEmpty()) {
            println("Nenhuma mensagem de suporte registrada.")
        } else {
            for (mensagem in mensagemSuporte) {
                println(mensagem)
            }
        }
    }
}



