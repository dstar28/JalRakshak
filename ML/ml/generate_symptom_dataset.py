import random
import pandas as pd

rows = []

def rand_bool(p=0.5):
    return 1 if random.random() < p else 0


for _ in range(500):

    disease = random.choice([
        "Cholera",
        "Typhoid",
        "Diarrhea",
        "FoodPoisoning"
    ])

    # -------------------------
    # CHOLERA
    # WHO: severe diarrhea + dehydration + unsafe water
    # -------------------------
    if disease == "Cholera":

        diarrhea = 1
        vomiting = rand_bool(0.7)
        fever = rand_bool(0.3)
        stomachPain = rand_bool(0.5)
        dehydration = 1
        weakness = 1
        unsafeWater = 1
        othersSick = rand_bool(0.6)
        days = random.randint(2, 5)
        villageRisk = random.randint(70, 100)


    # -------------------------
    # TYPHOID
    # WHO: fever + stomach pain + longer duration
    # -------------------------
    elif disease == "Typhoid":

        diarrhea = rand_bool(0.4)
        vomiting = rand_bool(0.4)
        fever = 1
        stomachPain = 1
        dehydration = rand_bool(0.4)
        weakness = 1
        unsafeWater = rand_bool(0.7)
        othersSick = rand_bool(0.3)
        days = random.randint(3, 7)
        villageRisk = random.randint(40, 80)


    # -------------------------
    # DIARRHEA
    # WHO: mild diarrhea, short duration
    # -------------------------
    elif disease == "Diarrhea":

        diarrhea = 1
        vomiting = rand_bool(0.3)
        fever = rand_bool(0.2)
        stomachPain = rand_bool(0.4)
        dehydration = rand_bool(0.3)
        weakness = rand_bool(0.3)
        unsafeWater = rand_bool(0.4)
        othersSick = rand_bool(0.2)
        days = random.randint(1, 3)
        villageRisk = random.randint(20, 60)


    # -------------------------
    # FOOD POISONING
    # WHO: vomiting + stomach pain + short duration
    # -------------------------
    else:

        diarrhea = rand_bool(0.6)
        vomiting = 1
        fever = rand_bool(0.3)
        stomachPain = 1
        dehydration = rand_bool(0.4)
        weakness = rand_bool(0.4)
        unsafeWater = rand_bool(0.3)
        othersSick = rand_bool(0.5)
        days = random.randint(1, 2)
        villageRisk = random.randint(20, 50)


    rows.append([
        diarrhea,
        vomiting,
        fever,
        stomachPain,
        dehydration,
        weakness,
        unsafeWater,
        othersSick,
        days,
        villageRisk,
        disease
    ])


columns = [
    "diarrhea",
    "vomiting",
    "fever",
    "stomachPain",
    "dehydration",
    "weakness",
    "unsafeWater",
    "othersSick",
    "days",
    "villageRisk",
    "disease"
]


df = pd.DataFrame(rows, columns=columns)

df.to_csv("../dataset/symptom_dataset.csv", index=False)

print("Symptom dataset generated")
print(df.head())