import psutil as p 
import time

while (True):
    percent_cpu = p.cpu_percent()
    percent_memory = p.virtual_memory()
    percent_disk = p.disk_usage('C:\\')

    print(f'Uso percentual de cpu: {percent_cpu:.2f}%')
    print(f'Uso percentual de memoria ram: {percent_memory.percent:.2f}%')
    print(f'Uso percentual de disco: {percent_disk.percent:.2f}%')
    print("\n")

    time.sleep(5)
