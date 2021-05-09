##################
import pymongo


dbclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = dbclient["personnel"]

#dec all tables
dbusers = mydb["users"]
dbtodos = mydb["todos"]
dbpersonnel = mydb["personnel"]
dbdeplacer = mydb["deplacer"]
dbservice = mydb["service"]
dbpermission = mydb["permission"]
dbapp = mydb["app"]