## 多线程

1. 示例

```py
import random, string
import requests,json
import time
import threading


exitFlag = 0

class HandleThread(threading.Thread):
    def __init__(self, threadID,name,counter):
        threading.Thread.__init__(self)
        self.threadID =  threadID
        self.name = name
        self.counter = counter
    
    def run(self):
        print("start: " + self.name)
        send_request(self.name,self.counter)
        print("end: " + self.name)


data = json.dumps({
    "username": "abelit"+''.join(random.sample(string.ascii_letters + string.digits, 8)),
    "phone": "152"+str(random.randint(10000000,99999999)),
    "token": "bWE7faBdy7gdIaLKNFeXCTBk"
})

headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36",
}

# print(data)

def send_request(threadName,counter):
    data = json.dumps({
                "username": "abelit"+''.join(random.sample(string.ascii_letters + string.digits, 8)),
                "phone": "152"+str(random.randint(10000000,99999999)),
                "token": "bWE7faBdy7gdIaLKNFeXCTBk"
            })
    while counter:
        if exitFlag:
            threadName.exit()
        
        if counter % 20 == 0:
            data = json.dumps({
                "username": "abelit"+''.join(random.sample(string.ascii_letters + string.digits, 8)),
                "phone": "152"+str(random.randint(10000000,99999999)),
                "token": "bWE7faBdy7gdIaLKNFeXCTBk"
            })

        response = requests.post("http://58.42.231.98:58080/api/setprize", data=data, headers=headers)
        print ("%s: %s" % (threadName, time.ctime(time.time())))
        counter -= 1

threadList = []

for i in range(10):
    threadList.append(HandleThread(i,"Thread-"+str(i), 5000))

for j in threadList:
    j.start()

for k in threadList:
    k.join()
# # 创建新线程
# thread1 = HandleThread(1,"Thread-1", 5000)
# thread2 = HandleThread(2,"Thread-2", 5000)
# thread3 = HandleThread(3,"Thread-3", 5000)
# thread4 = HandleThread(4,"Thread-4", 5000)
# thread5 = HandleThread(5,"Thread-5", 5000)
# thread6 = HandleThread(6,"Thread-6", 5000)
# thread7 = HandleThread(7,"Thread-7", 5000)
# thread8 = HandleThread(8,"Thread-8", 5000)
# thread9 = HandleThread(9,"Thread-9", 5000)
# thread10 = HandleThread(10,"Thread-10", 5000)

# # 开启新线程
# thread1.start()
# thread2.start()
# thread3.start()
# thread4.start()
# thread5.start()
# thread6.start()
# thread7.start()
# thread8.start()
# thread9.start()
# thread10.start()
# thread1.join()
# thread2.join()
# thread3.join()
# thread4.join()
# thread5.join()
# thread6.join()
# thread7.join()
# thread8.join()
# thread9.join()
# thread10.join()
# print ("退出主线程")
```