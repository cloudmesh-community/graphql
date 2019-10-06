#!/usr/bin/env python3

from faker import Faker
import numpy as np


def unique_ip(range=None):
    fake = Faker()
    if (range):
        ip_string = ''
        for item in range.split('.'):
            if item[0] == "[":
                _from, _to = item[1:len(item) - 1].split('-')
                ip_string += str(
                    np.random.randint(low=int(_from), high=int(_to),
                                      size=1)[0])
            else:
                ip_string += item
            ip_string += "."
        return ip_string[:len(ip_string) - 1]
    else:
        return fake.ipv4()


def list(words):
    fake = Faker()
    return fake.word(ext_word_list=words)