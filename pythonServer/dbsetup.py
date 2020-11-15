##################
import pymongo


dbclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = dbclient["muswada"]

#dec all tables
dbusers = mydb["users"]
dbblocks = mydb["blocks"]
dbtransactions = mydb["transactions"]
dbtodos = mydb["todos"]