from app import app
from flask import render_template, request,redirect,url_for
import os
import pymongo
from pymongo import MongoClient
import time
import urllib.request
import run


@app.route("/", methods=["POST","GET"])
def index(one = 0, two = 0, three = 0):
    if request.method == "POST":
        if "search" in request.form:
            new_url = request.form["search"]
            return redirect(url_for("website", url = new_url))
    return render_template("index.html", one_star = one, two_star = two, three_star = three, total = one+two+three)

    # Use os.getenv("key") to get environment variables
    # app_name = os.getenv("APP_NAME")

    # if app_name:
    #     return f"Hello from {app_name} running in a Docker container behind Nginx!"

    # return "Hello from Flask"

@app.route("/<url>", methods=["POST","GET"])
def website(url):
    if request.method == "POST":
        if "search" in request.form:
            new_url = request.form["search"]
            result = url_lookup(new_url)
            print(result)
            return redirect(url_for("website", url = new_url))
        elif "rate" in request.form:
            update_rating(url, request.form["rate"])
    result = url_lookup(url)
    return render_template("index.html", current_url = url, one_star = result[0], two_star = result[1], three_star = result[2], total = result[3])


def url_lookup(target_url):
    print(target_url)
    client = pymongo.MongoClient("mongodb+srv://todd:O12345@cluster0.nloih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    db = client["cext"]
    collection = db["1"]
    result = collection.find_one({"url":target_url})
    print("result "+str(result))
    if (result):
        one = result["one"]
        two = result["two"]
        three = result['three']
        print(three)
        return [one,two,three,one+two+three]
        # return redirect(url_for("website",url=target_url))
    else:
        # return redirect(url_for("website",url=target_url))
        return [0,0,0,0]


def update_rating(target_url, rating):
    print("rating")
    client = pymongo.MongoClient("mongodb+srv://todd:O12345@cluster0.nloih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    db = client["cext"]
    collection = db["1"]
    print(rating)
    result = collection.find_one({"url":target_url})
    if not result:
        collection.insert_one({"url":target_url,"one": 1 if rating == 1 else 0,"two": 1 if rating == 2 else 0,"three": 1 if rating == 3 else 0})
    else:
        if int(rating) == 1:
            newvalues = {"$set": {'one': result["one"] + 1}}
        elif int(rating) == 2:
            newvalues = {"$set": {'two': result["two"] + 1}}
        else:
            newvalues = {"$set": {'three': result["three"] + 1}}
        collection.update_one({"url":target_url},newvalues)