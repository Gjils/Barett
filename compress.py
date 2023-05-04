import os
from PIL import Image

import json

import urllib.request as urllib

import codecs


with open ("data/items.json") as f:
  items = json.load(f)

with open ("data/items.json") as f:
  new_items = json.load(f)

for category in items:
  try:
    os.mkdir(f"img/items/{category}")
  except Exception:
      pass
  for item in items[category]:
    try:
      os.mkdir(f"img/items/{category}/{item['id']}")
    except Exception:
      pass
    for i, image_url in enumerate(item["images"]):
      try:
        os.mkdir(f"img/items/{category}/{item['id']}/{i}")
      except Exception:
        pass
      image = urllib.urlopen(image_url).read()
      tmp = open("tmp.jpg", "wb")
      tmp.write(image)
      tmp.close
      image = Image.open("tmp.jpg")
      image = image.convert("RGB")
      if image.size[0] > image.size[1]:
        old_img = image
        image = Image.new(image.mode, (image.size[0], image.size[0]), "white")
        image.paste(old_img, (0, (old_img.size[0] - old_img.size[1]) // 2))
      else:
        old_img = image
        image = Image.new(image.mode, (image.size[1], image.size[1]), "white")
        image.paste(old_img, ((old_img.size[1] - old_img.size[0]) // 2, 0))
        
      ind_path = f"img/items/{category}/{item['id']}/{i}/ind.jpg"
      prev_path = f"img/items/{category}/{item['id']}/{i}/preview.jpg"
      pcCard_path = f"img/items/{category}/{item['id']}/{i}/pcCard.jpg"
      mobCard_path = f"img/items/{category}/{item['id']}/{i}/mobCard.jpg"
      
      image.resize((80, 80)).save(ind_path)
      image.resize((400, 400)).save(prev_path)
      image.resize((300, 300)).save(pcCard_path)
      image.resize((150, 150)).save(mobCard_path)
      new_items[category][item['id']]["images"][i] = {
        "ind": "/" + ind_path,
        "preview": "/" + prev_path,
        "pcCard": "/" + pcCard_path,
        "mobCard": "/" + mobCard_path
      }

with open('data/items1.json', 'w') as f:
    json.dump(new_items, f, indent=1, ensure_ascii=False)

# for item in items[category][:1]:
#   for image_url in item["images"]:
#     image = urllib.urlopen(image_url).read()
#     tmp = open("tmp.jpg", "wb")
#     tmp.write(image)
#     tmp.close
#     image = Image.open("tmp.jpg")
#     if image.size[0] > image.size[1]:
#       old_img = image
#       image = Image.new(image.mode, (image.size[0], image.size[0]), "white")
#       image.paste(old_img, (0, (old_img.size[0] - old_img.size[1]) // 2))
#     else:
#       old_img = image
#       image = Image.new(image.mode, (image.size[1], image.size[1]), "white")
#       image.paste(old_img, ((old_img.size[1] - old_img.size[0]) // 2), 0)   
      
#     image.resize((80, 80)).save(f"img/items/{category}/{item['id']}/ind.jpg")
#     image.resize((400, 400)).save(f"img/items/{category}/{item['id']}/preview.jpg")
#     image.resize((300, 300)).save(f"img/items/{category}/{item['id']}/pcCard.jpg")
#     image.resize((150, 150)).save(f"img/items/{category}/{item['id']}/mobCard.jpg")
#     image_url = {
#       "ind": f"img/items/{category}/{item.id}/ind.jpg",
#       "preview": f"img/items/{category}/{item.id}/preview.jpg",
#       "pcCard": f"img/items/{category}/{item.id}/pcCard.jpg",
#       "mobCard": f"img/items/{category}/{item.id}/mobCard.jpg"
#     }
# print(items["{category}"][0]["images"])
# try:
#   os.mkdir("img/items/{category}")
# except Exception:
#     pass
# for item in items["{category}"][:1]:
#   try:
#     os.mkdir(f"img/items/{category}/{item['id']}")
#   except Exception:
#     pass
#   for image_url in item["images"]:
#     image = urllib.urlopen(image_url).read()
#     tmp = open("tmp.jpg", "wb")
#     tmp.write(image)
#     tmp.close
#     image = Image.open("tmp.jpg")
#     if image.size[0] > image.size[1]:
#       old_img = image
#       image = Image.new(image.mode, (image.size[0], image.size[0]), "white")
#       image.paste(old_img, (0, (old_img.size[0] - old_img.size[1]) // 2))
#     else:
#       old_img = image
#       image = Image.new(image.mode, (image.size[1], image.size[1]), "white")
#       image.paste(old_img, ((old_img.size[1] - old_img.size[0]) // 2), 0)   
      
#     ind_path = f"img/items/{category}/{item['id']}/ind.jpg"
#     prev_path = f"img/items/{category}/{item['id']}/preview.jpg"
#     pcCard_path = f"img/items/{category}/{item['id']}/pcCard.jpg"
#     mobCard_path = f"img/items/{category}/{item['id']}/mobCard.jpg"

#     image.resize((80, 80)).save(ind_path)
#     image.resize((400, 400)).save(prev_path)
#     image.resize((300, 300)).save(pcCard_path)
#     image.resize((150, 150)).save(mobCard_path)
#     image_url = {
#       "ind": ind_path,
#       "preview": prev_path,
#       "pcCard": pcCard_path,
#       "mobCard": mobCard_path
#     }
# print(items["{category}"][0]["images"])