from app import app
import pymongo
from pymongo import MongoClient


print("started!!!")

def connect(host='https://google.com'):
    try:
        urllib.request.urlopen(host) #Python 3.x
        return True
    except:
        return False

if __name__ == "__main__":
    print( "connected" if connect() else "no internet!" )

    # print(client)
    
    app.run(debug=True)