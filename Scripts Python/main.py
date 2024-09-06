from mysql.connector import connect, Error
import psutil as p 
import time
import platform 
from dotenv import load_dotenv

load_dotenv()

SO = platform.system()

config = {
  "user": os.getenv("USER_LOGIN"),
  "password": os.getenv("DB_PASSWORD"),
  "host": os.getenv("HOST"),
  "database": os.getenv("DATABASE")
}

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



                    if(percent_cpu > 70.0):
                        sql_query = "INSERT INTO Alerta VALUES (1, %s)"
                        val = [percent_cpu]
                        mycursor.execute(sql_query, val)
                        mydb.commit()

                    if(percent_memory > 70.0):
                        sql_query = "INSERT INTO Alerta VALUES (%s)"
                        val = [percent_memory]
                        mycursor.execute(sql_query, val)
                        mydb.commit()

                    if(percent_disk.percent > 75.0):
                        sql_query = "INSERT INTO Alerta VALUES (%s)"
                        val = [percent_disk.percent]
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
