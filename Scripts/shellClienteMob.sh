#!/bin/bash

echo "Seja bem-vindo ao script de instalação da MOBanking"
sleep 5

echo "Atualizando aplicações da sua máquina"
sleep 5
sudo apt update && sudo apt upgrade –y > /dev/null 2>&1

java --version > /dev/null 2>&1
if [ $? = 0 ]; #se retorno for igual a 0
        then #entao,
                echo "Cliente possui java instalado!" #print no terminal
                sleep 5
        else #se nao,
                echo "Estamos instalando o java para você :)" #print no terminal
                sleep 5
                sudo apt install openjdk-17-jre-headless -y > /dev/null 2>&1
fi #fecha o if



python3  --version > /dev/null 2>&1 #verifica versao atual do python
if [ $? = 0 ]; #se retorno for igual a 0
        then #entao,
                echo "Cliente possui python instalado!" #print no terminal
                sleep 5
        else #se nao,
                echo "Estamos instalando o python para você :)" #print no terminal
                sleep 5
                sudo apt install python3 python3-venv -y > /dev/null 2>&1
fi #fecha o if
sudo apt install python3 python3-venv -y > /dev/null 2>&1

echo "Criando ambiente virtual"
sleep 5
python3 -m venv venv

# Verifica se o ambiente virtual foi criado corretamente
if [ -d "venv" ]; then
    echo "Ambiente virtual criado com sucesso"
else
    echo "Erro ao criar ambiente virtual"
    exit 1
fi

source venv/bin/activate

echo "Instalando bibliotecas"
sleep 5
pip install mysql-connector-python psutil schedule

echo "Baixando aplicação Python & Kotlin para captura de dados dos serviços oferecidos."
sleep 5
git clone https://github.com/MaikonDsGomes/clienteMobankingPro.git

# Rodar o script so funciona dentro do amiente virtual

clear

echo "Agradecemos por escolher a MOBanking"
sleep 5