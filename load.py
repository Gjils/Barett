from requests_html import HTMLSession
from fake_useragent import UserAgent
import json
import codecs

session = HTMLSession()

def updateJSON(url):
  res = session.get(url, headers={"User-Agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'})

  info = res.html.find('[type="application/ld+json"]', first=True).text

  info = json.loads(info)
  name = info["name"]
  desc = info["description"]
  price = info["offers"]["price"]
  images = info["image"]

  with open("info.json") as f:
    decoded_data=codecs.decode(f.read().encode(), 'utf-8-sig')
    data = json.loads(decoded_data)

  data["ench"].append({
    "id": len(data["ench"]),
    "type": "amplifier",
    "typeName": "Усилитель для гитар",
    "name": name,
    "desc": desc,
    "price": price,
    "images": images
  })

  with open("info.json", "w") as f:
    json.dump(data, f, indent=1, ensure_ascii=False)

  f.close()
  
for i in range(21):
  updateJSON(input())