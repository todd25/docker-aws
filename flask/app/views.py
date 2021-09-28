from app import app
from flask import render_template, request,redirect,url_for
import os
import pymongo
from pymongo import MongoClient
import time
import urllib.request
import run

# static_page_list = ['members', 'set']

# @app.route("/", methods=["POST","GET"])
# def index(one = 0, two = 0, three = 0):
#     print("!")
#     if request.method == "POST":
#         if "search" in request.form:
#             new_url = request.form["search"]
#             result = url_lookup(new_url)
#             return redirect(url_for("website", url = new_url))
#     return render_template("index.html", one_star = one, two_star = two, three_star = three, total = one+two+three)

    # Use os.getenv("key") to get environment variables
    # app_name = os.getenv("APP_NAME")

    # if app_name:
    #     return f"Hello from {app_name} running in a Docker container behind Nginx!"

    # return "Hello from Flask"

# @app.route("/members")
# def members():
#     return {"members": ["member1","member2","member3"]}



# @app.route("/<url>", methods=["POST","GET"])
# def website(url):
#     print("!!!!!!")
#     if url in static_page_list:
#         return {"members": ["member1","member2","member3"]}
#     if request.method == "POST":
#         if "search" in request.form:
#             new_url = request.form["search"]
#             result = url_lookup(new_url)
#             print(result)
#             return redirect(url_for("website", url = new_url))
#         elif "rate" in request.form:
#             update_rating(url, request.form["rate"])
#     result = url_lookup(url)
#     return render_template("index.html", current_url = url, one_star = result[0], two_star = result[1], three_star = result[2], total = result[3])


# def url_lookup(target_url):
#     print(target_url)
#     client = pymongo.MongoClient("mongodb+srv://todd:O12345@cluster0.nloih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
#     db = client["cext"]
#     collection = db["1"]
#     result = collection.find_one({"url":target_url})
#     print("result "+str(result))
#     if (result):
#         one = result["one"]
#         two = result["two"]
#         three = result['three']
#         print(three)
#         return [one,two,three,one+two+three]
#         # return redirect(url_for("website",url=target_url))
#     else:
#         # return redirect(url_for("website",url=target_url))
#         return [0,0,0,0]


# def update_rating(target_url, rating):
#     print("rating")
#     client = pymongo.MongoClient("mongodb+srv://todd:O12345@cluster0.nloih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
#     db = client["cext"]
#     collection = db["1"]
#     print(rating)
#     result = collection.find_one({"url":target_url})
#     if not result:
#         collection.insert_one({"url":target_url,"one": 1 if rating == 1 else 0,"two": 1 if rating == 2 else 0,"three": 1 if rating == 3 else 0})
#     else:
#         if int(rating) == 1:
#             newvalues = {"$set": {'one': result["one"] + 1}}
#         elif int(rating) == 2:
#             newvalues = {"$set": {'two': result["two"] + 1}}
#         else:
#             newvalues = {"$set": {'three': result["three"] + 1}}
#         collection.update_one({"url":target_url},newvalues)







client = pymongo.MongoClient("mongodb+srv://todd:O12345@cluster0.nloih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client["cext"]
collection = db["1"]

# Websites {
#  "_id": 4f0b2f55096f7622f6000000,
#  "type": 0,
#  "URL": "www.google.com",
#  "ratings": [123,24],
# }

def set_website(URL, ratings):
    website = get_website(URL)
    if not website:
        collection.insert_one({"url": URL, "ratings": ratings})
    else:
        collection.update_one({"url": URL}, {"$set": {"ratings": [website["ratings"][0] + ratings[0], 
                                                                  website["ratings"][1] + ratings[1]
                                                                 ]}})
    return website

def get_website(URL):
    return collection.find_one({"url":URL})

# comments {
#     "_id": xf0b2f55096f7622f6000000,
#     "type": 1,
#     "website": (obj 4f0b2f55096f7622f6000000),
#     "user": (obj 4f0b2f55096f7622f6000000),
#     "text": "this is a comment",
#     "ratings": [12,23],
#     "date":"asdasddsa",
#     "img":[
#         "jksahfdkjhquionq123213"
#         "jksahfdkjhquionq123213"
#         "jksahfdkjhquionq123213"
#     ],
# }

def set_comments(method, website, user, text, ratings, date):
    comment = get_comments(method, value)
    if not comment:
        collection.insert_one({"website": {"$id": website}, 
                               "user": {"$id": user}, 
                               "text": text, 
                               "ratings": ratings, 
                               "date": date,
                            #    "img": img
                               })
    else:
        if method == "both":
            collection.update_one()
    return comment

def get_comments(method, website, user):
    if method == "website":
        return collection.find({"website.$id": website}) 
    elif method == "user":
        return collection.find({"user.$id": user}) 
    elif emthod == "both":
        return collection.find_one({"user.$id": user}, {"website.$id": website}) 
    return {}
        
# Likes {
#     "_id:"lf0b2f55096f7622f6000000,
#     "type:"2,
#     "character": [0,0]  //0 = like, 1 = dislike, 0 = websites, 1 = comments
#     "website": (obj 4f0b2f55096f7622f6000000),
#     "user": (obj 4f0b2f55096f7622f6000000)
#     "comment": (obj 4f0b2f55096f7622f6000000)
# }

def set_likes(method, character, website, user, comment):
    website = get_likes(method, character, website, user, comment)
    if not website:
        collection.insert_one({"character": character, 
                               "website": {"$id", website},
                               "user": {"$id", website},
                               "comment": {"$id", website}
                               })
    else:
        if method == "all":
            collection.update_one()
    return website

def get_likes(method, character, website, user, comment):
    if method == "website":
        return collection.find({"website.$id": website}) 
    elif method == "user":
        return collection.find({"user.$id": user}) 
    elif method == "comment":
        return collection.find({"comment.$id": comment}) 
    elif memthod == "all":
        return collection.find_one({{"user.$id": user}, {"website.$id": website}, {"comment.$id": comment}})
    return {}

#  Users {
#           "type": 3
#           "user": lf0b2f55096f7622f6000000
#           "email": "li.zhengtao5@gmail.com", 
#           "last_name": "Li", 
#           "first_name": "Zhengtao", 
#           "img":"jksahfdkjhquionq123213"
#  }

def set_user(method, email, last_name, first_name):
    user = get_user(method, email, last_name, first_name)
    if not website:
        collection.insert_one({"url": URL, "ratings": ratings})
    else:
        collection.update_one({"url": URL}, {"$set": {"ratings": [website["ratings"][0] + ratings[0], 
                                                                  website["ratings"][1] + ratings[1]
                                                                 ]}})
    return website

def get_user(method, email, last_name, first_name):
    if method == "email":
        return collection.find_one({"website.$id": website}) 
    elif method == "name":
        return collection.find({"last_name": last_name, "first_name": first_name}) 
    return {}

@app.route("/set", methods=["POST","GET"])
def set():
    if request.method == "POST":
        content = request.json
        print("got info: " + content)
        if content["type"] == 0:
            result = set_website(content["url"], content["ratings"])
        elif content["type"] == 1:
            result = set_comments(content["method"], content["website"], content["user"], content["text"], content["ratings"], content["date"])
        elif content["type"] == 2:
            result = set_likes(content["method"], content["character"], content["website"], content["user"], content["comment"])
        elif content["type"] == 3:
            result = set_user(content["method"], content["email"], content["last_name"], content["first_name"])
        else:
            result = {}
        print(result)
        return result
    return {}

@app.route("/get", methods=["POST","GET"])
def get():
    if request.method == "POST":
        content = request.json
        print("get info: " + content)
        if content["type"] == 0:
            result = get_website(content["url"], content["ratings"])
        elif content["type"] == 1:
            result = get_comments(content["method"], content["website"], content["user"])
        elif content["type"] == 2:
            result = get_likes(content["method"], content["character"], content["website"], content["user"], content["comment"])
        elif content["type"] == 3:
            result = get_user(content["method"], content["email"], content["last_name"], content["first_name"])
        else:
            result = {}
        print(result)
        return result
    return {}