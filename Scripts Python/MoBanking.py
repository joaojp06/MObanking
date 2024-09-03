import psutil as p 
import time
import platform 

SO = platform.system()


while (True):
    percent_cpu = p.cpu_percent()
    percent_memory = p.virtual_memory()

    if(SO == "Windows"):
        percent_disk = p.disk_usage('C:\\')
    else:
        percent_disk = p.disk_usage('/')

    

    print(f'Uso percentual de cpu: {percent_cpu:.2f}%')
    print(f'Uso percentual de memoria ram: {percent_memory.percent:.2f}%')
    print(f'Uso percentual de disco: {percent_disk.percent:.2f}%')
    print("\n")

    time.sleep(5)
