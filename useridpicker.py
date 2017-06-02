import requests
from splinter import Browser

browser = Browser('phantomjs')

def get_url_list():
    d = open('ids.txt', 'w')
    r = requests.get('https://raw.githubusercontent.com/anonmonogatari/eksiengelle/master/yazarlist.txt')
    d.write(r.text)
    r = open('ids.txt', 'r')
    return r


def extract_ids(ls):
    y = open('new.txt', 'a')
    lines = ls.readlines()
    c = 0
    for line in lines:
        browser.visit(line)
        c += 1
        try:
            od = browser.evaluate_script("a = document.getElementsByClassName('menu-attached')[0].getAttribute('data-author-id')")
        except:
            pass

        print(c, od)
        y.write(od + '\n')

extract_ids(get_url_list())
