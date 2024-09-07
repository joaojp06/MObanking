#importando as bibliotecas
import psutil as p 
import time
import platform 

#vendo qual é o sistema operacional
SO = platform.system()


#criando a variável limitante 
i=0
while i < 10:
    #porcentagem de cpu(da cpu no geral e n de todos os "processadores internos")
    percent_cpu = p.cpu_percent(interval=None, percpu=False)

    #vem como tupla com diversas informações, então devemos escolher depois qual queremos
    percent_memory = p.virtual_memory()

    #vejo qual o sistema operacional para conseguir acessar o disco (mac e linux é só "/" ent é só por no else)
    if(SO == "Windows"):
        percent_disk = p.disk_usage('C:\\')
    else:
        percent_disk = p.disk_usage('/')
    
    print(f'Uso percentual de cpu: {percent_cpu:.2f}%')
    print('--------------------------------------------------')
    print(f'Uso percentual de memoria ram: {percent_memory.percent:.2f}%')
    print('--------------------------------------------------')
    print(f'Uso percentual de disco: {percent_disk.percent:.2f}%')
    print('--------------------------------------------------')
    print(f'Uso de disco: {(percent_disk.used / 10**9):.2f}GB')
    print('--------------------------------------------------')
    print(f'Disco livre: {(percent_disk.free / 10**9):.2f}GB')
    
    print("\n")

    i += 1
    time.sleep(5)