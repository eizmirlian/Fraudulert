import pandas as pd

df = pd.read_csv("credit_card_fraud.csv")
dict = {}
id = 1
for index, line in df.iterrows():
    curr = (line["job"], line["dob"])
    if not (curr in dict.keys()):
        dict[curr] = id
        id += 1
    df.at[index, "id"] = dict[curr]
df.to_csv("updated_credit.csv")
