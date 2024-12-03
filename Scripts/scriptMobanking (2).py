from mysql.connector import connect, Error
import psutil as p
import schedule
import threading
from datetime import datetime

config = {
  'user': 'root',
  'password': 'sptech',
  'host': 'localhost',
  'database': 'mobanking'
}

import time

#Configuração dos inserts, ou seja, vamos criar uma máquina com id 10 e inserir na empresa 1

idEmpresa = 3
idMaquina = 0  
breakMsgSlackCpu = 0
breakMsgSlackRam = 0
breakMsgSlackHd = 0
breakMsgSlackRede = 0
textoMensagem = ""
msgAlerta = ""

# Testar em máquina fisica

# def pegar_mac():
#     global idMaquina
#     global idEmpresa
#     global mac

#     mac_addresses = []
#     for interface, addrs in p.net_if_addrs().items():
#         for addr in addrs:
#             if addr.family == p.AF_LINK:
#                 mac_addresses.append(addr.address)

#     # Pegando o primeiro endereço MAC
#     mac = mac_addresses[0] 
#      return mac



# testar em ambientes virtuais

def pegar_mac():
    global idMaquina
    global idEmpresa
    global mac

    mac = None
    for interface, addrs in p.net_if_addrs().items():
        if interface == 'enX0':  # Verificar se a interface é 'enX0'
            for addr in addrs:
                if addr.family == p.AF_LINK and addr.address != '00:00:00:00:00:00':
                    mac = addr.address
                    break
            if mac:
                break

    # Verificar se algum endereço MAC válido foi encontrado
    if mac is None:
        print("Nenhum endereço MAC válido encontrado para a interface 'enX0'")
    else:
        print(f"MAC Address for 'enX0': {mac}")

    return mac

pegar_mac()

def mudarBreakSlackCpu():
    global breakMsgSlackCpu
    print("Esperando por 20 segundos CPU") 
    time.sleep(20)
    breakMsgSlackCpu = 0
    
def mudarBreakSlackRam():
    global breakMsgSlackRam
    print("Esperando por 20 segundos RAM") 
    time.sleep(20)
    breakMsgSlackRam = 0
    
def mudarBreakSlackHd():
    global breakMsgSlackHd
    print("Esperando por 20 segundos HD") 
    time.sleep(20)
    breakMsgSlackHd = 0

def mudarBreakSlackRede():
    global breakMsgSlackRede
    print("Esperando por 20 segundos REDE") 
    time.sleep(20)
    breakMsgSlackRede = 0
    
    
def inserirAlerta(dataFormatada):
    global msgAlerta
    try:
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                
                query1 = ("INSERT INTO alerta (fkServidor, fkEmpresa, descricao, data) VALUES (%s, %s, %s, %s);")
                value1 = [idMaquina, idEmpresa, msgAlerta, dataFormatada] 
                cursor.execute(query1, value1)          
                print(cursor.rowcount, "Alerta inserido no banco de dados!")
                           
                db.commit()

            cursor.close()
        db.close()
        
    except Error as e:
        print('Error to connect with MySQL -', e)   
        
def verificarLimite_basico():
    global breakMsgSlackCpu
    global breakMsgSlackRam
    global textoMensagem
    global msgAlerta 

    try:
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                query = ("select * from vw_servidor_card where id_servidor = %s")
                value = [idMaquina] 
                cursor.execute(query, value)
                resultado = cursor.fetchall()  # Obter o primeiro resultado
                
                if resultado:
                    
                    horario_atual = datetime.now()

                    # Formatar a data e hora
                    horario_formatado = horario_atual.strftime("%Y-%m-%d %H:%M:%S")

                    # Exibir o horário formatado
                    print("Horário atual formatado:", horario_formatado)

                    print(resultado)
                    for linha in resultado:
                        
                        # Suponha que sua tabela tenha as colunas 'id', 'nome' e 'endereco'
                        cpu = linha[6] if linha[6] is not None else 0.0
                        limiteCpu = linha[8] if linha[8] is not None else 0.0
                        
                        ram = linha[9] if linha[9] is not None else 0.0
                        limiteRam = linha[11] if linha[11] is not None else 0.0
                    
                        apelido = linha[3] if linha[3] is not None else "sem identificação"
                        funcao = linha[4] if linha[4] is not None else "Sem função"

                    
                        print(f"Antes do if valor  CPU {cpu} --- Limite de CPU {limiteCpu}")
                        if cpu > limiteCpu and breakMsgSlackCpu == 0:
                            textoMensagem = f"O servidor com identificador {apelido} e função de {funcao} superou o limite de {limiteCpu}%, com um uso atual de {cpu}% - superado em {horario_formatado}   "
                            enviarMensagem(textoMensagem)
                            breakMsgSlackCpu = 1
                            threading.Thread(target=mudarBreakSlackCpu).start()
                            msgAlerta = f"limite de {limiteCpu} foi superado em {cpu}%"
                            threading.Thread(target=inserirAlerta(horario_formatado)).start()
                            
                        else:
                            print(f"Não foi possivel CPU - var de break = {breakMsgSlackCpu}")
                            
                        if ram > limiteRam and breakMsgSlackRam == 0:
                            textoMensagem = f"O servidor com identificador {apelido} e função de {funcao} superou o limite de {limiteRam}%, com um uso atual de {ram}% - superado em {horario_formatado}   "
                            enviarMensagem(textoMensagem)
                            breakMsgSlackRam = 1
                            threading.Thread(target=mudarBreakSlackRam).start()
                            msgAlerta = f"limite de {limiteRam} foi superado em {ram}%"
                            threading.Thread(target=inserirAlerta(horario_formatado)).start()
                        else:
                            print(f"Não foi possivel RAM - var de break = {breakMsgSlackRam}")
                            
                    else:
                        print("Sem resultado")
            
                cursor.close()
                db.close()
                

    except Error as e:
        print('Error to connect with MySQL -', e)

def verificarLimite_intermediario():
    global breakMsgSlackCpu
    global breakMsgSlackRam
    global breakMsgSlackHd
    global textoMensagem
    global msgAlerta 

    try:
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                query = ("select * from vw_servidor_card where id_servidor = %s")
                value = [idMaquina] 
                cursor.execute(query, value)
                resultado = cursor.fetchall()  # Obter o primeiro resultado
                
                if resultado:
                    
                    horario_atual = datetime.now()

                    # Formatar a data e hora
                    horario_formatado = horario_atual.strftime("%Y-%m-%d %H:%M:%S")

                    # Exibir o horário formatado
                    print("Horário atual formatado:", horario_formatado)

                    print(resultado)
                    for linha in resultado:
                        
                        # Suponha que sua tabela tenha as colunas 'id', 'nome' e 'endereco'
                        cpu = linha[6] if linha[6] is not None else 0.0
                        limiteCpu = linha[8] if linha[8] is not None else 0.0
                        
                        ram = linha[9] if linha[9] is not None else 0.0
                        limiteRam = linha[11] if linha[11] is not None else 0.0
                        
                        hd = linha[12] if linha[12] is not None else 0.0
                        limiteHd = linha[14] if linha[14] is not None else 0.0
                    
                        apelido = linha[3] if linha[3] is not None else "sem identificação"
                        funcao = linha[4] if linha[4] is not None else "Sem função"

                    
                        print(f"Antes do if valor  CPU {cpu} --- Limite de CPU {limiteCpu}")
                        if cpu > limiteCpu and breakMsgSlackCpu == 0:
                            textoMensagem = f"O servidor com identificador {apelido} e função de {funcao} superou o limite de {limiteCpu}%, com um uso atual de {cpu}% - superado em {horario_formatado}   "
                            enviarMensagem(textoMensagem)
                            breakMsgSlackCpu = 1
                            threading.Thread(target=mudarBreakSlackCpu).start()
                            msgAlerta = f"limite de {limiteCpu} foi superado em {cpu}%"
                            threading.Thread(target=inserirAlerta(horario_formatado)).start()
                            
                        else:
                            print(f"Não foi possivel CPU - var de break = {breakMsgSlackCpu}")
                            
                        if ram > limiteRam and breakMsgSlackRam == 0:
                            textoMensagem = f"O servidor com identificador {apelido} e função de {funcao} superou o limite de {limiteRam}%, com um uso atual de {ram}% - superado em {horario_formatado}   "
                            enviarMensagem(textoMensagem)
                            breakMsgSlackRam = 1
                            threading.Thread(target=mudarBreakSlackRam).start()
                            msgAlerta = f"limite de {limiteRam} foi superado em {ram}%"
                            threading.Thread(target=inserirAlerta(horario_formatado)).start()
                        else:
                            print(f"Não foi possivel RAM - var de break = {breakMsgSlackRam}")
                            
                        if hd > limiteHd and breakMsgSlackHd == 0:
                            textoMensagem = f"O servidor com identificador {apelido} e função de {funcao} superou o limite de {limiteRam}%, com um uso atual de {ram}% - superado em {horario_formatado}   "
                            enviarMensagem(textoMensagem)
                            breakMsgSlackHd = 1
                            threading.Thread(target=mudarBreakSlackHd).start()
                            msgAlerta = f"limite de {limiteHd} foi superado, Gb atual {hd}%"
                            threading.Thread(target=inserirAlerta(horario_formatado)).start()
                        else:
                            print(f"Não foi possivel hd - var de break = {breakMsgSlackHd}")
                        
                        
                    else:
                        print("Sem resultado")
            
                cursor.close()
                db.close()
                

    except Error as e:
        print('Error to connect with MySQL -', e)
   
def verificarLimite():
    global breakMsgSlackCpu
    global breakMsgSlackRam
    global breakMsgSlackHd
    global breakMsgSlackRede
    global textoMensagem
    global msgAlerta 

    try:
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                query = ("select * from vw_servidor_card where id_servidor = %s")
                value = [idMaquina] 
                cursor.execute(query, value)
                resultado = cursor.fetchall()  # Obter o primeiro resultado
                
                if resultado:
                    
                    horario_atual = datetime.now()

                    # Formatar a data e hora
                    horario_formatado = horario_atual.strftime("%Y-%m-%d %H:%M:%S")

                    # Exibir o horário formatado
                    print("Horário atual formatado:", horario_formatado)

                    print(resultado)
                    for linha in resultado:
                        
                        # Suponha que sua tabela tenha as colunas 'id', 'nome' e 'endereco'
                        cpu = linha[6] if linha[6] is not None else 0.0
                        limiteCpu = linha[8] if linha[8] is not None else 0.0
                        
                        ram = linha[9] if linha[9] is not None else 0.0
                        limiteRam = linha[11] if linha[11] is not None else 0.0
                        
                        hd = linha[12] if linha[12] is not None else 0.0
                        limiteHd = linha[14] if linha[14] is not None else 0.0
                        
                        rede = linha[15] if linha[15] is not None else 0.0
                        limiteRede = linha[17] if linha[17] is not None else 0.0
                        
                        apelido = linha[3] if linha[3] is not None else "sem identificação"
                        funcao = linha[4] if linha[4] is not None else "Sem função"

                    
                        print(f"Antes do if valor  CPU {cpu} --- Limite de CPU {limiteCpu}")
                        if cpu > limiteCpu and breakMsgSlackCpu == 0:
                            textoMensagem = f"O servidor com identificador {apelido} e função de {funcao} superou o limite de {limiteCpu}%, com um uso atual de {cpu}% - superado em {horario_formatado}   "
                            enviarMensagem(textoMensagem)
                            breakMsgSlackCpu = 1
                            threading.Thread(target=mudarBreakSlackCpu).start()
                            msgAlerta = f"limite de {limiteCpu} foi superado em {cpu}%"
                            threading.Thread(target=inserirAlerta(horario_formatado)).start()
                            
                        else:
                            print(f"Não foi possivel CPU - var de break = {breakMsgSlackCpu}")
                            
                            
                            
                            
                            
                            
                        if ram > limiteRam and breakMsgSlackRam == 0:
                            textoMensagem = f"O servidor com identificador {apelido} e função de {funcao} superou o limite de {limiteRam}%, com um uso atual de {ram}% - superado em {horario_formatado}   "
                            enviarMensagem(textoMensagem)
                            breakMsgSlackRam = 1
                            threading.Thread(target=mudarBreakSlackRam).start()
                            msgAlerta = f"limite de {limiteRam} foi superado em {ram}%"
                            threading.Thread(target=inserirAlerta(horario_formatado)).start()
                        else:
                            print(f"Não foi possivel RAM - var de break = {breakMsgSlackRam}")
                            
                        if hd > limiteHd and breakMsgSlackHd == 0:
                            textoMensagem = f"O servidor com identificador {apelido} e função de {funcao} superou o limite de {limiteRam}%, com um uso atual de {ram}% - superado em {horario_formatado}   "
                            enviarMensagem(textoMensagem)
                            breakMsgSlackHd = 1
                            threading.Thread(target=mudarBreakSlackHd).start()
                            msgAlerta = f"limite de {limiteHd} foi superado, Gb atual {hd}%"
                            threading.Thread(target=inserirAlerta(horario_formatado)).start()
                        else:
                            print(f"Não foi possivel hd - var de break = {breakMsgSlackHd}")
                        
                        print(f"Antes do if valor  CPU {rede} --- Limite de CPU {limiteRede}")
                        if rede > limiteRede and breakMsgSlackRede == 0:
                            textoMensagem = f"O servidor com identificador {apelido} e função de {funcao} superou o limite de {limiteRam}%, com um uso atual de {ram}% - superado em {horario_formatado}   "
                            enviarMensagem(textoMensagem)
                            breakMsgSlackRede = 1
                            threading.Thread(target=mudarBreakSlackRede).start()
                            threading.Thread(target=inserirAlerta(horario_formatado)).start()
                        else:
                            print(f"Não foi possivel REDE - var de break = {breakMsgSlackRede}")
                    else:
                        print("Sem resultado")
            
                cursor.close()
                db.close()
                

    except Error as e:
        print('Error to connect with MySQL -', e)
        
def verificar_maquina():
        global idMaquina
        try:
            db = connect(**config)
            if db.is_connected():
                db_info = db.get_server_info()
                print('Connected to MySQL server version -', db_info)
                
                with db.cursor() as cursor:
                    query = ("select id from servidor order by id desc limit 1")
                    cursor.execute(query)
                    result = cursor.fetchone()  # Obter o primeiro resultado
                    
                    if result:
                        id = result[0]
                        
                        # Verifica se o plano é 'Básico'
                        if idMaquina > 0:
                            print("maquina já existe")
                            
                        else:
                            print("Adicionando nova máquina")
                            idMaquina = id + 1
                            
                            
                    else:
                        print("Nenhum valor encontrado.")

                
                    cursor.close()
                    db.close()

        except Error as e:
            print('Error to connect with MySQL -', e)
    
def capturar_dados_pro():
    global idMaquina
    
    ram = p.virtual_memory().percent
    cpu = p.cpu_percent(interval=1)

    servicoCpu = 1
    servicoRam = 2
    servicoHd = 3
    hd = p.disk_usage('/')
    hd = hd[1] / (1024 ** 3)  # Converter para GB
    hd = round(hd, 0)
    

    try:
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                query1 = ("INSERT INTO registro (fkServidor, fkServico, valor) VALUES (%s, %s, %s);")
                value1 = [idMaquina, servicoRam, ram]  
                cursor.execute(query1, value1)
                print(cursor.rowcount, "registro inserido na primeira query")
                
                query2 = ("INSERT INTO registro (fkServidor, fkServico, valor) VALUES (%s, %s, %s);")
                value2 = [idMaquina, servicoCpu, cpu]
                cursor.execute(query2, value2)
                print(cursor.rowcount, "registro inserido na segunda query")
                
                query2 = ("INSERT INTO registro (fkServidor, fkServico, valor) VALUES (%s, %s, %s);")
                value2 = [idMaquina, servicoHd, hd]
                cursor.execute(query2, value2)
                print(cursor.rowcount, "registro inserido na terceira query")
                
                db.commit()

            cursor.close()
        db.close()

    except Error as e:
        print('Error to connect with MySQL -', e) 
           
def capturar_dados_intermediario():
    global idMaquina
    
    ram = p.virtual_memory().percent
    cpu = p.cpu_percent(interval=1)

    servicoCpu = 1
    servicoRam = 2
    servicoHd = 3
    hd = p.disk_usage('/')
    hd = hd[1] / (1024 ** 3)  # Converter para GB
    hd = round(hd, 0)
    

    try:
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                query1 = ("INSERT INTO registro (fkServidor, fkServico, valor) VALUES (%s, %s, %s);")
                value1 = [idMaquina, servicoRam, ram]  
                cursor.execute(query1, value1)
                print(cursor.rowcount, "registro inserido na primeira query")
                
                query2 = ("INSERT INTO registro (fkServidor, fkServico, valor) VALUES (%s, %s, %s);")
                value2 = [idMaquina, servicoCpu, cpu]
                cursor.execute(query2, value2)
                print(cursor.rowcount, "registro inserido na segunda query")
                
                query2 = ("INSERT INTO registro (fkServidor, fkServico, valor) VALUES (%s, %s, %s);")
                value2 = [idMaquina, servicoHd, hd]
                cursor.execute(query2, value2)
                print(cursor.rowcount, "registro inserido na terceira query")
            
                db.commit()

            cursor.close()
        db.close()

    except Error as e:
        print('Error to connect with MySQL -', e)   
    
def capturar_dados_basico():
    global idMaquina
    ram = p.virtual_memory().percent
    cpu = p.cpu_percent(interval=1)
    servicoCpu = 1
    servicoRam = 2

    try:
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                query1 = ("INSERT INTO registro (fkServidor, fkServico, valor) VALUES (%s, %s, %s);")
                value1 = [idMaquina, servicoRam, ram]  
                cursor.execute(query1, value1)
                print(cursor.rowcount, "registro inserido na primeira query")
                
                query2 = ("INSERT INTO registro (fkServidor, fkServico, valor) VALUES (%s, %s, %s);")
                value2 = [idMaquina, servicoCpu, cpu]
                cursor.execute(query2, value2)
                print(cursor.rowcount, "registro inserido na segunda query")
                
               
                # Confirmar as mudanças no banco de dados
                db.commit()

            cursor.close()
        db.close()

    except Error as e:
        print('Error to connect with MySQL -', e)   
  
def add_servico_monitorado_pro():
    global idMaquina
    cpu_freq = p.cpu_freq() 

# Converte a frequência máxima de MHz para GHz
    capacidadeTotalCpu = cpu_freq.max / 1000
    capacidadeTotalRam = round(p.virtual_memory().total / (1024 ** 3), 0)
    capacidadeTotalDisco = round(p.disk_usage('/').total / (1024 ** 3),0)

    try:
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                
                query1 = ("INSERT INTO servico_monitorado (fkServidor, fkServico, capacidadeTotal) VALUES (%s, 1, %s);")
                value1 = [idMaquina, capacidadeTotalCpu ] 
                cursor.execute(query1, value1)          
                print(cursor.rowcount, "Adicionando máquina servico moniorado serviço 1")
                
                query2 = ("INSERT INTO servico_monitorado (fkServidor, fkServico, capacidadeTotal) VALUES (%s, 2, %s);")
                value2 = [idMaquina, capacidadeTotalRam]  
                cursor.execute(query2, value2)
                print(cursor.rowcount, "Adicionando máquina servico moniorado serviço 2")
                
                query3 = ("INSERT INTO servico_monitorado (fkServidor, fkServico, capacidadeTotal) VALUES (%s, 3, %s);")
                value3 = [idMaquina, capacidadeTotalDisco]  
                cursor.execute(query3, value3)
                print(cursor.rowcount, "Adicionando máquina servico moniorado serviço 3")
                
                query8 = ("INSERT INTO servico_monitorado (fkServidor, fkServico, capacidadeTotal) VALUES (%s, 4, 0);")
                value8 = [idMaquina]  
                cursor.execute(query8, value8)
                print(cursor.rowcount, "Adicionando máquina servico moniorado serviço 4")
                
                query4 = ("insert into limite_servico_monitorado (fkServidor, fkServico, valor, unidadeMedida) values (%s, 1, 60, '%');")
                value4 = [idMaquina]  
                cursor.execute(query4, value4)
                print(cursor.rowcount, "registro inserido na tabela limite servico - Intermediario Pro")
                
                query5 = ("insert into limite_servico_monitorado (fkServidor, fkServico, valor, unidadeMedida) values (%s, 2, 60, '%');")
                value5 = [idMaquina]  
                cursor.execute(query5, value5)
                print(cursor.rowcount, "registro inserido na tabela limite servico - Intermediario Pro")
                
                query6 = ("insert into limite_servico_monitorado (fkServidor, fkServico, valor, unidadeMedida) values (%s, 3, 1500, 'GB');")
                value6 = [idMaquina]  
                cursor.execute(query6, value6)
                print(cursor.rowcount, "registro inserido na tabela limite servico - Intermediario Pro")
                
                query7 = ("insert into limite_servico_monitorado (fkServidor, fkServico, valor, unidadeMedida) values (%s, 4, 1000000, 'MB');")
                value7 = [idMaquina]  
                cursor.execute(query7, value7)
                print(cursor.rowcount, "registro inserido na tabela limite servico - Intermediario Pro")
                
                
               
                db.commit()

            cursor.close()
        db.close()
        
    except Error as e:
        print('Error to connect with MySQL -', e)   
           
def add_servico_monitorado_intermediario():
    global idMaquina
    cpu_freq = p.cpu_freq() 

# Converte a frequência máxima de MHz para GHz
    capacidadeTotalCpu = cpu_freq.max / 1000
    capacidadeTotalRam = round(p.virtual_memory().total / (1024 ** 3), 0)
    capacidadeTotalDisco = round(p.disk_usage('/').total / (1024 ** 3),0)

    try:
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                
                query1 = ("INSERT INTO servico_monitorado (fkServidor, fkServico, capacidadeTotal) VALUES (%s, 1, %s);")
                value1 = [idMaquina, capacidadeTotalCpu ] 
                cursor.execute(query1, value1)          
                print(cursor.rowcount, "Adicionando máquina servico moniorado serviço 1")
                
                query2 = ("INSERT INTO servico_monitorado (fkServidor, fkServico, capacidadeTotal) VALUES (%s, 2, %s);")
                value2 = [idMaquina, capacidadeTotalRam]  
                cursor.execute(query2, value2)
                print(cursor.rowcount, "Adicionando máquina servico moniorado serviço 2")
                
                query3 = ("INSERT INTO servico_monitorado (fkServidor, fkServico, capacidadeTotal) VALUES (%s, 3, %s);")
                value3 = [idMaquina, capacidadeTotalDisco]  
                cursor.execute(query3, value3)
                print(cursor.rowcount, "Adicionando máquina servico moniorado serviço 3")
                
                query4 = ("insert into limite_servico_monitorado (fkServidor, fkServico, valor, unidadeMedida) values (%s, 1, 60, '%');")
                value4 = [idMaquina]  
                cursor.execute(query4, value4)
                print(cursor.rowcount, "registro inserido na tabela limite servico - Intermediario Pro")
                
                query5 = ("insert into limite_servico_monitorado (fkServidor, fkServico, valor, unidadeMedida) values (%s, 2, 60, '%');")
                value5 = [idMaquina]  
                cursor.execute(query5, value5)
                print(cursor.rowcount, "registro inserido na tabela limite servico - Intermediario Pro")
                
                query6 = ("insert into limite_servico_monitorado (fkServidor, fkServico, valor, unidadeMedida) values (%s, 3, 60, 'GB');")
                value6 = [idMaquina]  
                cursor.execute(query6, value6)
                print(cursor.rowcount, "registro inserido na tabela limite servico - Intermediario Pro")
                
                db.commit()

            cursor.close()
        db.close()
        
    except Error as e:
        print('Error to connect with MySQL -', e)   
             
def configuracao_pro():
    global idMaquina
    global idEmpresa
    try:
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                
                query = ("INSERT INTO servidor (id, fkEmpresa, funcao, enderecoMac, status) VALUES (%s,%s,'Servidor', %s, 'ativo');")
                value = [idMaquina, idEmpresa, mac] 
                cursor.execute(query, value)
                print(cursor.rowcount, "Nova máquina inserida com sucesso!")
                
               
                # Confirmar as mudanças no banco de dados
                db.commit()

            cursor.close()
        db.close()
        
    except Error as e:
        print('Error to connect with MySQL -', e)   
        
    print("Iniciando add_servico_monitorado_pro()")
    add_servico_monitorado_pro()
    print("add_servico_monitorado_pro() concluída")
    

def configuracao_intermediario():
    global idMaquina
    global idEmpresa
    try:
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                
                query = ("INSERT INTO servidor (id, fkEmpresa, funcao, enderecoMac, status) VALUES (%s,%s,'Servidor', %s, 'ativo');")
                value = [idMaquina, idEmpresa, mac] 
                cursor.execute(query, value)
                print(cursor.rowcount, "Nova máquina inserida com sucesso!")
                
               
                # Confirmar as mudanças no banco de dados
                db.commit()

            cursor.close()
        db.close()
        
    except Error as e:
        print('Error to connect with MySQL -', e)   
        
    print("Iniciando add_servico_monitorado_intermediario()")
    add_servico_monitorado_intermediario()
    print("add_servico_monitorado_intermediario() concluída")
        
def add_servico_monitorado_basico():
    global idMaquina
    cpu_freq = p.cpu_freq() 

# Converte a frequência máxima de MHz para GHz
    capacidadeTotalCpu = cpu_freq.max / 1000
    capacidadeTotalRam = round(p.virtual_memory().total / (1024 ** 3), 0)

    try:
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                
                query1 = ("INSERT INTO servico_monitorado (fkServidor, fkServico, capacidadeTotal) VALUES (%s, 1, %s);")
                value1 = [idMaquina, capacidadeTotalCpu ] 
                cursor.execute(query1, value1)          
                print(cursor.rowcount, "Adicionando máquina servico moniorado serviço 1")
                
                query2 = ("INSERT INTO servico_monitorado (fkServidor, fkServico, capacidadeTotal) VALUES (%s, 2, %s);")
                value2 = [idMaquina, capacidadeTotalRam]  
                cursor.execute(query2, value2)
                print(cursor.rowcount, "Adicionando máquina servico moniorado serviço 2")
                
                query4 = ("insert into limite_servico_monitorado (fkServidor, fkServico, valor, unidadeMedida) values (%s, 1, 60, '%');")
                value4 = [idMaquina]  
                cursor.execute(query4, value4)
                print(cursor.rowcount, "registro inserido na tabela limite servico - Intermediario Pro")
                
                query5 = ("insert into limite_servico_monitorado (fkServidor, fkServico, valor, unidadeMedida) values (%s, 2, 60, '%');")
                value5 = [idMaquina]  
                cursor.execute(query5, value5)
                print(cursor.rowcount, "registro inserido na tabela limite servico - Intermediario Pro")
                
                db.commit()

            cursor.close()
        db.close()
        
    except Error as e:
        print('Error to connect with MySQL -', e)    
                
def configuracao_basico():
    global idMaquina
    global idEmpresa
    try:
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                
                query = ("INSERT INTO servidor (id, fkEmpresa, funcao, enderecoMac, status) VALUES (%s,%s,'Servidor', %s, 'ativo');")
                value = [idMaquina, idEmpresa, mac] 
                cursor.execute(query, value)
                print(cursor.rowcount, "Nova máquina inserida com sucesso!")
                
               
                # Confirmar as mudanças no banco de dados
                db.commit()

            cursor.close()
        db.close()
        

        
    except Error as e:
        print('Error to connect with MySQL -', e) 
        
    print("Iniciando add_servico_monitorado_basico()")
    add_servico_monitorado_basico()
    print("add_servico_monitorado_basico() concluída")

def inicio():
    try:
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                query = ("select fkPlano from empresa where id = 3")
                cursor.execute(query)
                result = cursor.fetchone()  # Obter o primeiro resultado
                
                if result:
                    plano = result[0]
                    
                    # Verifica se o plano é 'Básico'
                    if plano == 1:
                        print("Plano basico ok - NOVA MÁQUINA")
                        
                        configuracao_basico()
                        while True:  
                            verificarLimite_basico()
                            capturar_dados_basico()
                            time.sleep(5)  
                        
                    if plano == 2:
                        
                        print("intermediario ok - NOVA MÁQUINA")    
                        
                        configuracao_intermediario()
                        while True:  
                            
                            verificarLimite_intermediario()
                            capturar_dados_pro()
                            time.sleep(5) 
                    
                    if plano == 3:
                        print("Plano Pro - NOVA MÁQUINA")
                        
                        configuracao_pro()
                        while True:  
                            
                            verificarLimite()
                            capturar_dados_pro()
                            time.sleep(5) 
                        
                else:
                    print("Nenhum valor encontrado.")

            
                cursor.close()
                db.close()

    except Error as e:
        print('Error to connect with MySQL -', e)
    

def agendar_tarefa_semanal():
    print("Agendando a tarefa semanal...")
    # Executa a função inicio uma vez por semana (por exemplo, todo domingo às 10h)
    schedule.every().sunday.at("10:00").do(inicio)

    while True:
        schedule.run_pending()
        time.sleep(60)  # Verifica a cada minuto se há uma tarefa agendada   
      
         
def existe():
    try:
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                query = ("select fkPlano from empresa where id = 3")
                cursor.execute(query)
                result = cursor.fetchone()  # Obter o primeiro resultado
                
                if result:
                    plano = result[0]
                    
                    # Verifica se o plano é 'Básico'
                    if plano == 1:
                        print("Plano basico ok da MÁQUINA EXISTENTE")
                        
                        for _ in range(80):  
                            capturar_dados_basico()
                            time.sleep(5)  
                            
                    if plano == 2:
                        print("intermediario ok da MÁQUINA EXISTENTE")
                        
                        for _ in range(80): 
                            verificarLimite_intermediario() 
                            capturar_dados_intermediario()
                            time.sleep(5) 
                        
                    if plano == 3:
                        print("Plano Pro ok da MÁQUINA EXISTENTE")
                        
                        for _ in range(80): 
                            verificarLimite() 
                            capturar_dados_pro()
                            time.sleep(5) 
                        
                else:
                    print("Nenhum valor encontrado.")

            
                cursor.close()
                db.close()

    except Error as e:
        print('Error to connect with MySQL -', e)
    
       
def macCheck():
   
    mac = pegar_mac()
    
    try:
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                query = ("select id from servidor where enderecoMac = %s")
                value = [mac] 
                cursor.execute(query, value)
                result = cursor.fetchone()  # Obter o primeiro resultado
                global idMaquina
                
                if result:
                    id = result[0] 
                    
                    if id > 0:
                        idMaquina = id
                        existe()
                        
                        
                else:
                    print("Endereço Mac não encontrado no sistema")
                    print("Adicionando máquina...")
                    
                    try:
                        db = connect(**config)
                        if db.is_connected():
                            db_info = db.get_server_info()
                            print('Connected to MySQL server version -', db_info)
                            
                            with db.cursor() as cursor:
                                query = ("select id from servidor order by id desc limit 1")
                                cursor.execute(query)
                                result = cursor.fetchone()  # Obter o primeiro resultado
                                
                                if result:
                                    id = result[0]
                                    
                                    # Verifica se o plano é 'Básico'
                                    if idMaquina > 0:
                                        print("maquina já existe")
                                        
                                    else:
                                        print("Adicionando nova máquina")
                                        idMaquina = id + 1
                                        
                                        
                                else:
                                    print("Nenhum valor encontrado.")

                            
                                cursor.close()
                                db.close()

                    except Error as e:
                            print('Error to connect with MySQL -', e)
                    inicio()

            
                cursor.close()
                db.close()

    except Error as e:
        print('Error to connect with MySQL -', e)
        
import requests
import json

# Substitua pela sua URL do Webhook
webhook_url = "https://hooks.slack.com/services/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"

def enviarMensagem(texto):
    message = {
        "text": texto
    }

    try:
        response = requests.post(webhook_url, data=json.dumps(message),
                                headers={'Content-Type': 'application/json'})
        if response.status_code == 200:
            print("Mensagem enviada com sucesso!")
        else:
            print(f"Erro ao enviar mensagem: {response.status_code} - {response.text}")

    except requests.exceptions.RequestException as e:
        print(f"Erro ao enviar mensagem: {e}")


macCheck()
agendar_tarefa_semanal()



