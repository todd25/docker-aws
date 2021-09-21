import pymongo
from pymongo import MongoClient

client = pymongo.MongoClient("mongodb+srv://todd:O12345@cluster0.nloih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client["cext"]
collection = db["1"]

post = {"_id": 5, "name":"bill"}
post2 = {"_id": 6, "name":"bill"}
# collection.insert_one(post)

results = collection.find({"name":"bill"})
for result in results:
    print(result)
