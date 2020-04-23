from string import ascii_lowercase as alpha

"""
    Pra cada letra na frase, 
    retorne a sua posição em _alpha_ + 3
"""

def encrypt(phrase: str) -> str:
    encrypt_phrase = []
    for word in phrase:
        encrypt_phrase.append(
            alpha[alpha.index(word) + 3]
        )
    return ''.join(encrypt_phrase)
        
