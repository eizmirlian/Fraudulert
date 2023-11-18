import pandas as pd
import pymongo
import json
myclient = pymongo.MongoClient('localhost', 27017)
database = myclient["FraudulertDB"]
collection = database["Transactions"]
csv = pd.read_csv("updated_credit.csv")
for index, row in csv.iterrows():
     if int(row["id"]) <= 10:
        collection.insert_one({"id" : row["id"], "trans_date_trans_time" :
                               row["trans_date_trans_time"], "merchant": 
                                row["merchant"], "category" : row["category"],
                                 "amt": row["amt"], "city": row["city"],
                                  "state": row["state"], "lat": row["lat"],
                                   "long": row["long"], "city_pop": row["city_pop"],
                                    "job": row["job"], "dob": row["dob"], "trans_num":
                                     row["trans_num"], "merch_lat": row["merch_lat"],
                                      "merch_long": row["merch_long"], "is_fraud":
                                       row["is_fraud"]})

