from threading import Thread
from queue import Queue
from time import sleep

_queue = Queue(maxsize=2)

matriz = [ [2, 9], [-1, 6] ]

def primary(matz):
    sleep(10)
    _queue.put(matz[0][0] * matz[1][1])
def secundary(matz):
    count = 0
    while _queue.empty():
        count += 1

    print (f'{count} ciclos até aqui')
    _queue.put(matz[1][0] * matz[0][1])


thread_p = Thread(target=primary, kwargs={'matz': matriz}, name="Principal")
thread_p.start()
thread_s = Thread(target=secundary, kwargs={'matz': matriz}, name="Secundaria")
thread_s.start()

thread_s.join()

val_p = _queue.queue[0]
val_s = _queue.queue[1]

print (val_p - val_s)

print (_queue.queue)