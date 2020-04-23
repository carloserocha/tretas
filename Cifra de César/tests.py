from unittest import TestCase, main
from app import encrypt

"""
    a -> d
    b -> e
    c -> f
"""

class TestCifra(TestCase):
    def test_encrypt(self):
        input = 'abc'
        expected = 'def'
        self.assertEqual(encrypt(input), expected)

main()