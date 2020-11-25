from hashlib import sha256

class user:
    def __init__(self, name, email, password, id = -2):
        self.name = name;
        self.email = email;
        self.password = password;
        self.id = id;
    
    def getPort(self):
        PORT_BRUTE = sha256(self.name.encode('utf-8')).hexdigest() + '9' + sha256(self.email.encode('utf-8')).hexdigest()
        PORT = ''
        for character in PORT_BRUTE:
            if character.isnumeric():
                PORT += character
        # print(PORT[0:4])
        return int(PORT[0:4])