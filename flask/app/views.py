from app import app
from flask import render_template, request,redirect,url_for
import os
import pymongo
from pymongo import MongoClient
import time
import urllib.request
import run

@app.route("/", methods=["POST","GET"])
def index():
    if request.method == "POST":
        return url_lookup(request.form["search"]);
    return render_template("index.html")

    # Use os.getenv("key") to get environment variables
    # app_name = os.getenv("APP_NAME")

    # if app_name:
    #     return f"Hello from {app_name} running in a Docker container behind Nginx!"

    # return "Hello from Flask"

@app.route("/<url>", methods=["POST","GET"])
def website(url):
    if request.method == "POST":
        return url_lookup(request.form["search"]);
    return render_template("index.html", current_url = url)


def url_lookup(target_url):
    print(target_url)
    result = run.collection.find_one({"url":target_url})
    print(result)

    return redirect(url_for("website",url=target_url))