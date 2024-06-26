import requests

def get_word_meaning(word):
    url = f'https://subhash.net.np/dict/en/search/{word}'
    headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'origin': 'https://www.nepalbhasa.org',
        'priority': 'u=1, i',
        'referer': 'https://www.nepalbhasa.org/',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Brave";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'sec-gpc': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
    }

    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return None

loop=True
while loop:
    word = input('Enter an English word to get its Newari translation: ')
    result = get_word_meaning(word)

    if result:
        print(f"\nWord: {result['word']}")
        for meaning in result['meanings']:
            print(f"Meaning in English: {meaning['meaning_en']}")
            print(f"Meaning in Newari: {meaning['meaning_nb']}")
            print(f"Transliteration (Latin): {meaning['transliterations']['latn']}\n")
    else:
        print("Error fetching data")
    
    again=input('Go again?: (y/n) ')
    if again=='n':
        loop=False


    


