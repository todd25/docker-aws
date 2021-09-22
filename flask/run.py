from app import app
import pymongo
from pymongo import MongoClient

client = pymongo.MongoClient("mongodb+srv://todd:O12345@cluster0.nloih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client["cext"]
collection = db["1"]

def connect(host='http://google.com'):
    try:
        urllib.request.urlopen(host) #Python 3.x
        return True
    except:
        return False

if __name__ == "__main__":
    print( "connected" if connect() else "no internet!" )

    print(client)
    
    app.run(debug=True)