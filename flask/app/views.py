from app import app
from flask import render_template, request
import os
import pymongo
from pymongo import MongoClient
import time
import urllib.request



def connect(host='http://google.com'):
    try:
        urllib.request.urlopen(host) #Python 3.x
        return True
    except:
        return False

@app.route("/")
def index():
    
    print( "connected" if connect() else "no internet!" )

    client = pymongo.MongoClient("mongodb+srv://todd:O12345@cluster0.nloih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    db = client["cext"]
    collection = db["1"]
    print(client)
    results = collection.find({"name":"bill"})
    for result in results:
        print(result)

    args = None
    if request.args:
        args = request.args
        return render_template("index.html",args = args)
    return render_template("index.html",args = args)

    # Use os.getenv("key") to get environment variables
    # app_name = os.getenv("APP_NAME")

    # if app_name:
    #     return f"Hello from {app_name} running in a Docker container behind Nginx!"

    # return "Hello from Flask"