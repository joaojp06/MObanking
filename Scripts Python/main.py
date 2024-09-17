from mysql.connector import connect, Error
import psutil as p 
import time
import platform 
from dotenv import load_dotenv
import os

load_dotenv() 

SO = platform.system()
# tem outro jeito melhor para pegar o ip
# ipv4 = p.net_connections(kind='inet4')
# ipv6 = p.net_connections(kind='inet6')

config = {
  "user": os.getenv("USER_LOGIN"),
  "password": os.getenv("DB_PASSWORD"),
  "host": os.getenv("HOST"),
  "database": os.getenv("DATABASE")
}

#quero pegar o ipv4, o ipv6 e o disco automaticamente, assim abstraindo pro usuário e colocar na tabela servidor
# try:
#             mydb = connect(**config)
#             if mydb.is_connected():

#                 mycursor = mydb.cursor()

#                 sql_query = "INSERT INTO Servidor() VALUES (%s, %s, %s)"
#                 val = []
#                 mycursor.execute(sql_query, val)
#                 mydb.commit()
#                 print(mycursor.rowcount, "registro inserido")

# except Error as e:
#         print("Erro ao conectar com o MySQL", e)
        
# finally:
#         if(mydb.is_connected()):
#             mycursor.close()
#             mydb.close()

#aqui começa a captura de dados
i = 0
while i < 10:
    percent_cpu = p.cpu_percent()
    percent_memory = p.virtual_memory().percent

    if(SO == "Windows"):
        percent_disk = p.disk_usage('C:\\').percent
    else:
        percent_disk = p.disk_usage('/').percent

    print(f'Uso percentual de cpu: {percent_cpu:.2f}%')
    print(f'Uso percentual de memoria ram: {percent_memory:.2f}%')
    print(f'Uso percentual de disco: {percent_disk:.2f}%')
    print("\n")

    try:
            mydb = connect(**config)
            if mydb.is_connected():

                mycursor = mydb.cursor()

                if(percent_cpu > 0.1 or percent_memory > 0.1 or percent_disk > 0.1):
                    
                    sql_query = "INSERT INTO Captura VALUES (default, %s, %s, %s, current_timestamp())"
                    val = [percent_cpu, percent_memory, percent_disk]
                    mycursor.execute(sql_query, val)
                    mydb.commit()

                    #select pra pegar idDado
                    result = mycursor.execute("SELECT idCaptura FROM Captura ORDER BY idCaptura DESC LIMIT 1;")
                    idCaptura = mycursor.fetchall()
                    idCaptura = idCaptura[0][0]
                    print(idCaptura)
                    
                    if(percent_cpu > 0.1, percent_memory > 0.1, percent_disk > 0.1):
                        descricao = f"Todos os componentes estão em risco! CPU: {percent_cpu}; RAM: {percent_memory}; DISK: {percent_disk}."

                    elif((percent_cpu > 0.1, percent_memory > 0.1) or (percent_cpu > 0.1, percent_disk > 0.1) or (percent_disk > 0.1, percent_memory > 0.1)):
                        descricao = f"Dois componentes em risco! CPU: {percent_cpu}; RAM: {percent_memory}; DISK: {percent_disk}."

                    elif(percent_cpu > 0.1):
                        descricao = f"Porcentual de uso de CPU está em risco! CPU: {percent_cpu}"

                    elif(percent_memory > 0.1):
                        descricao = f"Porcentual de uso de memória RAM está em risco! RAM: {percent_memory}"

                    elif(percent_disk > 0.1):
                        descricao = f"Porcentual de uso de disco está em risco! disk: {percent_disk}"
                        

                    sql_query = "INSERT INTO Alerta VALUES (default, 1, %s, %s, current_timestamp());"
                    val = [idCaptura, descricao]
                    mycursor.execute(sql_query, val)
                    mydb.commit()


                else:
                    sql_query = "INSERT INTO Captura VALUES (default, %s, %s, %s, current_timestamp())"
                    val = [percent_cpu, percent_memory, percent_disk]
                    mycursor.execute(sql_query, val)
                    mydb.commit()
                    print(mycursor.rowcount, "registro inserido")

    except Error as e:
        print("Erro ao conectar com o MySQL", e)
        
    finally:
        if(mydb.is_connected()):
            mycursor.close()
            mydb.close()

    i += 1
    time.sleep(5)