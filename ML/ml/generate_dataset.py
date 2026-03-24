import random
import pandas as pd

rows = []

for _ in range(1500):

    rainfall = random.randint(0, 400)

    diarrhea = random.randint(0, 200)
    cholera = random.randint(0, 100)
    typhoid = random.randint(0, 150)

    population = random.randint(1000, 10000)

    month = random.randint(1, 12)
    year = random.randint(2020, 2025)

    total = diarrhea + cholera + typhoid

    score = 0

    # cases weight
    if total < 20:
        score += 0
    elif total < 80:
        score += 2
    else:
        score += 4

    # severe disease weight
    if cholera > 10:
        score += 2

    if typhoid > 20:
        score += 2

    # rainfall effect
    if rainfall > 250:
        score += 2
    elif rainfall > 150:
        score += 1

    # season effect (NE India monsoon)
    if month in [5,6,7,8,9]:
        score += 2

    # population ratio
    if total > population * 0.02:
        score += 2

    # final class
    if score >= 7:
        outbreak = 2
    elif score >= 3:
        outbreak = 1
    else:
        outbreak = 0

    rows.append([
        rainfall,
        diarrhea,
        cholera,
        typhoid,
        population,
        month,
        year,
        outbreak
    ])

df = pd.DataFrame(rows, columns=[
    "rainfall",
    "diarrhea",
    "cholera",
    "typhoid",
    "population",
    "month",
    "year",
    "outbreak"
])

df.to_csv("../dataset/ne_rural_dataset.csv", index=False)

print("dataset ready")