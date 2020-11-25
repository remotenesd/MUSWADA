import type { user as usr } from "../store/core/core";
import CryptoJS from "crypto-js";
import Axios, { AxiosResponse } from "axios";
import { globals } from "../helpers/globals";
import { fakeDispatch } from '../store/Actions/actionCreator'
import { store } from "../store/store";

class session {
  user: usr;
  isLoggedIn: boolean;

  constructor(checkLS = true) {
    this.user = {
      userID: "",
      name: "",
      password: "",
    };

    // initially, we are NOT logged IN.
    this.isLoggedIn = false;

    if (checkLS)
    {
      //
      this.checkLS();
    }
  }

  checkLS() {
    console.log("CHECKING LOCAL STORAGE [**] " ,  this.isLoggedIn)

    var idd = localStorage.getItem("userID");

    if (idd != null) {
      var cr = String(localStorage.getItem("name") ?? "");
      var ex = String(localStorage.getItem("password") ?? "");
      if (cr !== "") {
        this.login(idd, cr, ex);
      } else {
        this.genNoLoginData();
      }
    }
  }

  isLoggedInFunc = () => {
    return this.isLoggedIn;
  };

  signOut() {
    this.isLoggedIn = false;

    this.user.userID = "";
    this.user.name = "";
    this.user.password = "";

    localStorage.setItem("userID", "");
    localStorage.setItem("name", "");
    localStorage.setItem("password", "");
    
    console.log("YOU ARE LOGGED OUT \\\\ " ,  this.isLoggedIn)
  }

  loginAPI(id: string, name: string, password: string)
  {
    let user = {
      userID: id,
      name: name,
      password: password,
    };

    // console.log(user)
    
    // user.password = CryptoJS.SHA256(user.password).toString(
    //   CryptoJS.enc.Hex
    // );
      
    // console.log(user);
    
    let resPromise = Axios.post(globals.baseURL + "/" + globals.userURL + "/login", user)
    return resPromise;
    
  }

  login(id: string, name: string, password: string) {
    console.log('[LOgIN] port ', globals.apiPort, ' with name ', name)
    let user = {
      userID: id,
      name: name,
      password: password,
    };

    // login using API
    // todo
    if (globals.apiPort === 5001)
    {
      this.genNoLoginData()
      return;
    }
    this.loginAPI(id, name, password).then( (res: AxiosResponse) => {
      console.log(res.status);
      if (res.status === 200) {
        // successful login from middleware,
        // engage in session creation
        this.createSession(user)
        return;
      }
      if (res.status === 430) {
        this.genNoLoginData();
      }
    })
    .catch((error) => {
      console.log(error)
      this.genNoLoginData();
      // todo add error handling
    });
    
  }

  createSession(user)
  {
    this.user = user;
    
    if (this.user.name.length > 0) {
      this.isLoggedIn = true;
    }
    //todo enable option
    // persist ?
    if (true) {
      // sometimes user does not wish to persist #TODO
      localStorage.setItem("userID", this.user.userID.toString());
      localStorage.setItem("name", this.user.name.toString());
      localStorage.setItem("password", this.user.password.toString());
    }

    console.log("YOU ARE LOGGED IN /// " ,  this.isLoggedIn)

    // let the store refresh -> and all dependent subscribers
    store.dispatch(fakeDispatch())
  }

  genNoLoginData() {
    this.user = { userID: "", name: "loginError", password: "" };
    this.isLoggedIn = false;
  }
}



export default session;
