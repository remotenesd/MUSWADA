import session from "../../storage/localStorage";

class user {
    userID;
    name ;
    password;

    constructor(userID: string, name : string, password : string)
    {
        this.name = name;
        this.password = password;
        this.userID = userID;
    }
};

interface IState {
    user : session,
    registeringUser : user,
    usernameExist : boolean,
    registerSuccess : boolean,
    routing : string,
}

export type { IState};
export { user }

