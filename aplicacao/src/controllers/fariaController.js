var fariaModel = require("../models/fariaModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");

function dadosGrafico(req, res) {
  fariaModel.dadosGrafico().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os dados do gráfico: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function obterIndicadores(req, res) {
    var empresa = req.params.empresa
  fariaModel.obterIndicadores(empresa).then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os dados do gráfico: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function BobIAPerguntar(req, res) {
    const pergunta = req.body.pergunta;

    gerarResposta(pergunta).then( resposta => {
        res.status(200).json({ resposta: resposta });
    }).catch( erro => {
        res.status(500).json({ status: "Erro", message: "Falha ao gerar resposta", erro: erro.message});
    });

    async function gerarResposta(perguntaIA) {

        let chaveGemini = null;

        if (!chaveGemini) {
            console.error(` Tentando obter a chave do .env...`);
            chaveGemini = process.env.CHAVE_GEMINI;
        }

        if(chaveGemini) {
            console.log(`Chave da API do Gemini Obtida com Sucesso... ${chaveGemini}`);
        }

        // instanciando a classe GoogleGenerativeAI
        const chatIA = new GoogleGenerativeAI(chaveGemini);
        // obtendo o modelo de IA
        const modeloIA = chatIA.getGenerativeModel({ model: "gemini-pro" });
    
        try {
            // gerando conteúdo com base na pergunta
            const resultado = await modeloIA.generateContent(`${perguntaIA}`);
            const resposta = await resultado.response.text();
            
            console.log('Requisição na API do Gemini feita, resposta: ', resposta);
    
            return resposta;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

module.exports = {
  dadosGrafico,
  obterIndicadores,
  BobIAPerguntar
};