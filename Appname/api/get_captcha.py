import requests
import re


response = requests.post("https://asan.shaparak.ir/", data={"RefId": "aa18b5af3129cc3c4", "mobileap": None})

if response.status_code == 200:
    print(response.text)
