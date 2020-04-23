# thread
A thread principal transcorre do início do
_Thread.start_ até a _MainThread_ (ou seja, a thread principal)

<code>
Thread.start()

Thread.run()
// do stuff

"""
não finaliza a thread 
- só junta nova thread com a thread principal
"""
Thread.join() 
</code>

# queue.Queue

Compartilha dados entre Threads por fila

_full()_ -> Verifica se a fila está cheia
_empty()_ -> Verifica se a fila está vazia
_get()_ -> Retorna valores da fila
_put()_ -> insere novos valores na fila