import pandas as pd
import pymongo
myclient = pymongo.MongoClient('localhost', 27017)
database = myclient["FraudulertDB"]
collection1 = database["Transactions"]
collection2 = database["Users"]
csv = pd.read_csv("updated_credit.csv")
dict = {}
for index, row in csv.iterrows():
     if int(row["id"]) <= 10:
        collection1.insert_one({"id" : row["id"], "trans_date_trans_time" :
                               row["trans_date_trans_time"], "merchant": 
                                row["merchant"], "category" : row["category"],
                                 "amt": row["amt"], "city": row["city"],
                                  "state": row["state"], "lat": row["lat"],
                                   "long": row["long"], "city_pop": row["city_pop"],
                                     "trans_num": row["trans_num"], "merch_lat": row["merch_lat"],
                                      "merch_long": row["merch_long"], "is_fraud": row["is_fraud"]})
        if not (int(row["id"]) in dict.keys()):
            dict[int(row["id"])] = [row["dob"], row["job"]]
for a in range(1, 11):
    collection2.insert_one({"id" : a, "dob": dict[a][0], "job": dict[a][1],
                            "username": "user" + str(a), "password": "password" + str(a)})