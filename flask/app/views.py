from app import app
from flask import render_template, request,redirect,url_for
import os
import pymongo
from pymongo import MongoClient
import time
import urllib.request
import run
from bson.json_util import dumps
from pymongo.errors import ConfigurationError
from flask import jsonify
import dns.resolver
import datetime

try:
    client = pymongo.MongoClient("mongodb+srv://todd:O12345@cluster0.nloih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",serverSelectionTimeoutMS=10, connectTimeoutMS=20000)
except ConfigurationError:
    print("Data Base Connection failed. Error")
    exit()

if not client:
    print("no client")
    exit()

db = client["cext"]
if not db:
    print("no db")
    exit()
    
collection = db["1"]
if not collection:
    print("no collection")
    exit()

# Websites {
#  "_id": 4f0b2f55096f7622f6000000,
#  "type": 0,
#  "URL": "www.google.com",
#  "ratings": [123,24],
# }

def client_exist():
    connection = MongoClient("mongodb+srv://todd:O12345@cluster0.nloih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    try:
        connection.database_names()
        # print('Data Base Connection Established........')
    except OperationFailure as err:
        print(f"Data Base Connection failed. Error: {err}")
        return False
    if not client or not db or not collection:
        print("no connection")
        return False
    return True

def set_website(URL, ratings):

    website = get_website(URL)
    if not website:
        collection.insert_one({"url": URL, "ratings": ratings})
    else:
        collection.update_one({"url": URL}, {"$set": {"ratings": [website["ratings"][0] + ratings[0], 
                                                                  website["ratings"][1] + ratings[1]
                                                                 ]}})
    return dumps(website)

def get_website(URL):
    # print("get_website: " + URL)
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

def set_comments(website, user, text, date):
    if date == "":
        date = datetime.datetime.now()
    collection.insert_one({"type": 1, "website": website, "user": user, 
                            "text": text, "date":date})
    return get_comments("website",website,user)
    # return comment

def get_comments(method, website, user):
    if method == "website":
        # print(website)
        comments = list(collection.find({"type":1}))
        print("found :")
        # print(comments)
        # res = []
        for comment in comments:
            # print (comment)
            if '_id' in comment:
                comment['_id'] = str(comment['_id'])
            
            user = get_user("email",comment["user"],"","")
            comment["image"] = user["image"]
            comment["first_name"] = user["first_name"]
            comment["last_name"] = user["last_name"]

            # res.append(jsonify(comment))
        print(jsonify(comments))
        return jsonify(comments)
    elif method == "user":
        return collection.find({"user.$id": user}) 
    elif memthod == "both":
        return collection.find_one({"user.$id": user}, {"website.$id": website}) 
    else:
        print("get_comments: incorrect method")
    return ''
        
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

def set_user(method, email, last_name, first_name, image):
    user = get_user(method, email, last_name, first_name)
    if not user:
        user2 = collection.insert_one({"email": email, "last_name": last_name, 
                            "first_name": first_name, "image":image})
        if '_id' in user2:
            user2['_id'] = str(user2['_id'])
        return jsonify(user2)   
    else:
        # print("user already exists")
        if '_id' in user:
            user['_id'] = str(user['_id'])
        return jsonify(user)
        # collection.update_one
        return {}

def get_user(method, email, last_name, first_name):
    if method == "email":
        return collection.find_one({"email": email}) 
    elif method == "name":
        return collection.find({"last_name": last_name, "first_name": first_name}) 
    return {}

@app.route("/set", methods=["POST","GET"])
def set():
    if not client_exist():
        return

    if request.method == "POST":
        content = request.json

        # print("set :", end='')
        print(content)
        
        if content["type"] == 0:
            result = set_website(content["url"], content["ratings"])
        elif content["type"] == 1:
            result = set_comments(content["website"], content["user"], content["text"], content["date"])
        elif content["type"] == 2:
            result = set_likes(content["method"], content["character"], content["website"], content["user"], content["comment"])
        elif content["type"] == 3:
            result = set_user(content["method"], content["email"], content["last_name"], content["first_name"], content["image"])
        else:
            result = {}

        # print("result :", end='')
        # print(result)

        return result
    return {}

@app.route("/get", methods=["POST","GET"])
def get():
    if not client_exist():
        return

    if request.method == "POST":
        content = request.json

        # print("get :", end='')
        # print(content)

        if content["type"] == 0:
            result = get_website(content["url"], content["ratings"])
        elif content["type"] == 1:
            result = get_comments(content["method"], content["website"], content["user"])
            # print("get_comments:")
        elif content["type"] == 2:
            result = get_likes(content["method"], content["character"], content["website"], content["user"], content["comment"])
        elif content["type"] == 3:
            result = get_user(content["method"], content["email"], content["last_name"], content["first_name"], content["image"])
        else:
            result = {}
            
        # print("result :", end='')
        # print(list(result))
        # if len(list(result)) == 0:
        #     return ''

        return result
    return {}