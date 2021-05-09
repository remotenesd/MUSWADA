from hashlib import sha256

class user:
    def __init__(self, name, email, password, fonction, lirePersonnel, ecrirePersonnel, lirePermissions, ecrirePermissions,id = -2):
        self.name = name;
        self.email = email;
        self.password = password;
        self.id = id;
        self.fonction = fonction;
        self.lirePermissions = lirePermissions;
        self.ecrirePermissions = ecrirePermissions;
        self.lirePersonnel = lirePersonnel;
        self.ecrirePersonnel = ecrirePersonnel;
    
    def getPort(self):
        PORT_BRUTE = sha256(self.name.encode('utf-8')).hexdigest() + '9' + sha256(self.email.encode('utf-8')).hexdigest()
        PORT = ''
        for character in PORT_BRUTE:
            if character.isnumeric():
                PORT += character
        # print(PORT[0:4])
        return int(PORT[0:4])

class deplacer:
    def __init__(self, personID, date, fromTime, toTime,motif):
        self.personID = personID;
        self.date = date;
        self.fromTime = fromTime;
        self.toTime = toTime;
        self.motif = motif;


class permission:
    def __init__(self, personID, fromDate, toDate,addresse):
        self.personID = personID;
        self.fromDate = fromDate;
        self.toDate = toDate;
        self.addresse = addresse;

class initData:
    def __init__(self, commandant, batiment, batimentClass):
        self.commandant = commandant;
        self.batiment = batiment;
        self.batimentClass = batimentClass;
        self.firstUsage = False;
