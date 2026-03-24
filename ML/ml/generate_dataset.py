import pandas as pd
import random
import os

villages = [
    ("Majuli","Assam",12000),
    ("Dhemaji","Assam",15000),
    ("Pasighat","Arunachal",8000),
    ("Ziro","Arunachal",6000),
    ("ShillongRural","Meghalaya",9000),
    ("Tura","Meghalaya",9500),
    ("Lunglei","Mizoram",7000),
    ("Champhai","Mizoram",6500),
]

data = []

for year in range(2019,2024):
    for month in range(1,13):
        for v in villages:

            village,state,pop = v

            # seasonal pattern
            if month in [6,7,8]:
                rainfall = random.randint(180,350)
                diarrhea = random.randint(100,250)
                cholera = random.randint(5,15)
                typhoid = random.randint(20,50)

            elif month in [4,5,9]:
                rainfall = random.randint(100,180)
                diarrhea = random.randint(60,120)
                cholera = random.randint(3,8)
                typhoid = random.randint(15,30)

            else:
                rainfall = random.randint(40,100)
                diarrhea = random.randint(10,50)
                cholera = random.randint(0,3)
                typhoid = random.randint(5,15)

            outbreak = 0

            if cholera >= 8:
                outbreak = 1
            elif rainfall >= 180 and diarrhea >= 120:
                outbreak = 1
            elif diarrhea >= 100 and typhoid >= 25:
                outbreak = 1

            data.append([
                village,state,year,month,
                rainfall,diarrhea,cholera,typhoid,
                pop,outbreak
            ])

df = pd.DataFrame(data, columns=[
    "village","state","year","month",
    "rainfall","diarrhea","cholera","typhoid",
    "population","outbreak"
])

# dynamic path
base_dir = os.path.dirname(__file__)
dataset_dir = os.path.join(base_dir, "../dataset")

os.makedirs(dataset_dir, exist_ok=True)

file_path = os.path.join(dataset_dir, "ne_rural_dataset.csv")

df.to_csv(file_path, index=False)

print("Dataset saved at:", file_path)