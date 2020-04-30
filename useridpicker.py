import requests
import time

def main():
    while True:
        source = input("Yazar listesi kaynağını seçin (github/local): ")
        profile_list = None
        if source == "github":
            profile_list = get_profile_list_github()
        elif source == "local":
            profile_list = get_profile_list_local()
        else:
            continue
        counter = 1
        with open("id_list.txt", "w") as file:
            for link in profile_list:
                author_id = fetch_author_id(link)
                counter += 1
                if author_id:
                    file.write(author_id + "\n")
                    print(link + " - id: " + author_id)
                else:
                    print(link + " - id: None")
                time.sleep(0.3)
        break

def get_profile_list_local():
    f = open('profile_list.txt', 'r')
    trimmed_links = [l[:-1] for l in f.readlines()]
    return trimmed_links


def get_profile_list_github():
    r = requests.get('https://raw.githubusercontent.com/anonmonogatari/eksiengelle/master/profile_list.txt')
    return r.text.splitlines()


def fetch_author_id(profile_link):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:74.0) Gecko/20100101 Firefox/74.0",
        "X-Requested-With": "XMLHttpRequest"
    }
    nickname = profile_link[profile_link.rindex("/") + 1:]
    r = requests.get("https://eksisozluk.com/son-entryleri?nick=" + nickname, headers=headers)
    content = r.text
    a = content.find("data-author-id")+16
    b = content.find('"', a)
    author_id = content[a:b]
    if a == 15 or r.status_code != 200:
        return None
    return author_id

main()

