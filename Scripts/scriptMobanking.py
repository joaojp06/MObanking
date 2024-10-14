from mysql.connector import connect, Error
import psutil as p


config = {
  'user': 'root',
  'password': 'sptech',
  'host': 'localhost',
  'database': 'mobanking'
}

import time

#Configuração dos inserts, ou seja, vamos criar uma máquina com id 10 e inserir na empresa 1
idMaquina = 10
idEmpresa = 1

#essa função captura os dados do plano básico
def capturar_dados_basico():
    # Captura as informações do sistema
    ram = p.virtual_memory().percent
    cpu = p.cpu_percent(interval=1)

    servicoCpu = 2
    servicoRam = 3
    
    idMaquina = 5

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
                
                db.commit()

            cursor.close()
        db.close()

    except Error as e:
        print('Error to connect with MySQL -', e)   

    
    
def capturar_dados_intermediario():
    # Captura as informações do sistema
    ram = p.virtual_memory().percent
    cpu = p.cpu_percent(interval=1)
    servicoCpu = 1
    servicoRam = 2
    servicoHd = 3
    hd = p.disk_usage('C:\\')
    hd = hd[1] / (1024 ** 3)  # Converter para GB
    tempo = p.cpu_times()
    tempo1 = tempo[0]
    tempoFormatadaMinutos = tempo1 / 60
    tempoFormatadaHoras = tempoFormatadaMinutos / 60

    try:
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                query1 = ("INSERT INTO registro (fkServicoMonitorado, valor) VALUES (%s,%s);")
                value1 = [servicoRam, ram]  # Agora 'ram' é o percentual de uso de RAM
                cursor.execute(query1, value1)
                print(cursor.rowcount, "registro inserido na primeira query")
                
                # Segunda query de INSERT
                query2 = ("INSERT INTO registro (fkServicoMonitorado, valor) VALUES (%s,%s);")
                value2 = [servicoCpu, cpu]
                cursor.execute(query2, value2)
                print(cursor.rowcount, "registro inserido na segunda query")
                
                # Segunda query de INSERT
                query3 = ("INSERT INTO registro (fkServicoMonitorado, valor) VALUES (%s,%s);")
                value3 = [servicoHd, hd]
                cursor.execute(query3, value3)
                print(cursor.rowcount, "registro inserido na terceira query")
                
                
                # Confirmar as mudanças no banco de dados
                db.commit()

            cursor.close()
        db.close()

    except Error as e:
        print('Error to connect with MySQL -', e)   
        
        
def configuracao_basico():
    
    
    

    try:
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                
                query = ("INSERT INTO servidor (id, fkEmpresa, funcao) VALUES (%s,%s,'Servidor');")
                value = [idMaquina, idEmpresa] 
                cursor.execute(query, value)
                print(cursor.rowcount, "registro inserido na query")
                
               
                # Confirmar as mudanças no banco de dados
                db.commit()

            cursor.close()
        db.close()
        
        db = connect(**config)
        if db.is_connected():
            db_info = db.get_server_info()
            print('Connected to MySQL server version -', db_info)
            
            with db.cursor() as cursor:
                
                query1 = ("INSERT INTO servicoMonitorado (fkServidor, fkServico) VALUES (%s, 1);")
                value1 = [idMaquina] 
                cursor.execute(query1, value1)          
                print(cursor.rowcount, "registro inserido na primeira query")
                
                query2 = ("INSERT INTO servicoMonitorado (fkServidor, fkServico) VALUES (%s, 2);")
                value2 = [idMaquina]  
                cursor.execute(query2, value2)
                print(cursor.rowcount, "registro inserido na segunda query")
                
                query3 = ("INSERT INTO servicoMonitorado (fkServidor, fkServico) VALUES (%s, 3);")
                value3 = [idMaquina]  
                cursor.execute(query3, value3)
                print(cursor.rowcount, "registro inserido na terceira query")
               
                db.commit()

            cursor.close()
        db.close()
        
               
                
                


    except Error as e:
        print('Error to connect with MySQL -', e)   



# PRECISA FAZER UMA FUNÇÃO PARA PESQUISAR O PLANO DE NOVO


try:
    db = connect(**config)
    if db.is_connected():
        db_info = db.get_server_info()
        print('Connected to MySQL server version -', db_info)
        
        with db.cursor() as cursor:
            query = ("select plano.nome from planoEmpresa inner join empresa on empresa.id = planoEmpresa.fkEmpresa inner join plano on plano.id = planoEmpresa.fkPlano where empresa.id = 1;")
            cursor.execute(query)
            result = cursor.fetchone()  # Obter o primeiro resultado
            
            if result:
                plano = result[0]
                
                # Verifica se o plano é 'Básico'
                if plano == 'Plano Básico':
                    print("Plano básico ok")
                    
                    configuracao_basico()
                    for _ in range(80):  # Executa 60 vezes (1 minuto)
                        capturar_dados_basico()
                        time.sleep(10)  # Espera 1 segundo antes da próxima execução
    
                    
                else:
                    print("Plano intermediário ok")
                    for _ in range(60):  # Executa 60 vezes (1 minuto)
                        capturar_dados_intermediario()
                        time.sleep(1)  # Espera 1 segundo antes da próxima execução
    
                    
            else:
                print("Nenhum valor encontrado.")

        
        cursor.close()
        db.close()

except Error as e:
    print('Error to connect with MySQL -', e)
    
    
