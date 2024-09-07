from mysql.connector import connect, Error
import psutil as p 
import time
import platform 
from dotenv import load_dotenv as os

os.load_dotenv() 

SO = platform.system()
ipv4 = p.net_connections(kind='inet4')
ipv6 = p.net_connections(kind='inet6')

config = {
  "user": os.getenv("USER_LOGIN"),
  "password": os.getenv("DB_PASSWORD"),
  "host": os.getenv("HOST"),
  "database": os.getenv("DATABASE")
}

#quero pegar o ipv4, o ipv6 e o disco automaticamente, assim abstraindo pro usuário e colocar na tabela servidor
try:
            mydb = connect(**config)
            if mydb.is_connected():

                mycursor = mydb.cursor()

                sql_query = "INSERT INTO Servidor() VALUES (%s, %s, %s)"
                val = []
                mycursor.execute(sql_query, val)
                mydb.commit()
                print(mycursor.rowcount, "registro inserido")

except Error as e:
        print("Erro ao conectar com o MySQL", e)
        
finally:
        if(mydb.is_connected()):
            mycursor.close()
            mydb.close()

#aqui começa a captura de dados
i = 0
while i < 10:
    percent_cpu = p.cpu_percent()
    percent_memory = p.virtual_memory()

    if(SO == "Windows"):
        percent_disk = p.disk_usage('C:\\')
    else:
        percent_disk = p.disk_usage('/')

    print(f'Uso percentual de cpu: {percent_cpu:.2f}%')
    print(f'Uso percentual de memoria ram: {percent_memory.percent:.2f}%')
    print(f'Uso percentual de disco: {percent_disk.percent:.2f}%')
    print(f'Uso de disco: {percent_disk.used:.2f}GB')
    print(f'Disco livre: {percent_disk.free:.2f}GB')
    print("\n")

try:
            mydb = connect(**config)
            if mydb.is_connected():

                mycursor = mydb.cursor()

                if(percent_cpu > 70.0 or percent_memory > 70.0 or percent_disk.percent > 75.0):
                    
                    sql_query = "INSERT INTO Dado VALUES (default, %s, %s, %s)"
                    val = [percent_cpu, percent_memory, percent_disk.percent]
                    mycursor.execute(sql_query, val)
                    mydb.commit()

                    #select pra pegar idDado
                    result = mycursor.execute("SELECT idDado FROM Dado ORDER BY idDado DESC LIMIT = 1")
                    idDado = mycursor.fetchall()
                    print(idDado) 
                    

                    if(percent_cpu > 70.0):
                        sql_query = "INSERT INTO Alerta VALUES (%s, 'Porcentage de cpu em risco: %s%')"
                        val = [idDado, percent_cpu]
                        mycursor.execute(sql_query, val)
                        mydb.commit()

                    if(percent_memory > 70.0):
                        sql_query = "INSERT INTO Alerta VALUES (%s, 'Porcentage de memória em risco: %s%')"
                        val = [idDado, percent_memory]
                        mycursor.execute(sql_query, val)
                        mydb.commit()

                    if(percent_disk.percent > 75.0):
                        sql_query = "INSERT INTO Alerta VALUES (%s, 'Porcentage de disco em risco: %s%')"
                        val = [idDado, percent_disk.percent]
                        mycursor.execute(sql_query, val)
                        mydb.commit()


                else:
                    sql_query = "INSERT INTO Dado VALUES (default, %s, %s, %s)"
                    val = [percent_cpu, percent_memory, percent_disk.percent]
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
