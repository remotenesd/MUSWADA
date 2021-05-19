import type { user as usr } from "../store/core/core";
import {user as usr_} from "../store/core/core";
import Axios, { AxiosResponse } from "axios";
import  {globals} from "../helpers/globals";
import { fakeDispatch } from '../store/Actions/actionCreator'
import { store } from "../store/store";

class session {
  user: usr;
  isLoggedIn: boolean;

  constructor(checkLS = true) {
    this.user = new usr_("", "", "");

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

    const idd = localStorage.getItem("userID");

    if (idd != null) {
      const cr = String(localStorage.getItem("name") ?? "");
      const ex = String(localStorage.getItem("password") ?? "");
      if (cr !== "") {
        this.login(idd, cr, ex);
      } else {
        this.genNoLoginData();
      }
    }
  }

  customLS() : Promise<AxiosResponse<any> | null>
  {
    console.log("[FREELANCE] CHECKING LOCAL STORAGE [**] " ,  this.isLoggedIn)

    const idd = localStorage.getItem("userID");

    if (idd != null) {
      const cr = String(localStorage.getItem("name") ?? "");
      const ex = String(localStorage.getItem("password") ?? "");
      console.log("[FREELANCE] " + cr);
      if (cr !== "") {
        return this.customLogin(idd, cr, ex);
      }
    }
    return new Promise<null>(() => {return null});
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
    const user = {
      userID: id,
      name: name,
      password: password,
    };

    // console.log(user)
    
    // user.password = CryptoJS.SHA256(user.password).toString(
    //   CryptoJS.enc.Hex
    // );
      
    // console.log(user);
    
    const resPromise = Axios.post(globals.baseURL + "/" + globals.userURL + "/login", user)
    return resPromise;
    
  }

  customLogin(id: string, name: string, password: string) : Promise<AxiosResponse<any>> {
    // console.log('[LOgIN] port ', globals.apiPort, ' with name ', name)
    // let user = {
    //   userID: id,
    //   name: name,
    //   password: password,
    // };

    this.user = new usr_(id, name, password);

    // login using API
    // todo
    return this.loginAPI(id, name, password)
  }

  login(id: string, name: string, password: string) {
    // console.log('[LOgIN] port ', globals.apiPort, ' with name ', name)
    const user = {
      userID: id,
      name: name,
      password: password,
    };

    // login using API
    // todo
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
      console.log("[CONNECT] ****** MODIFICATION OF LOCAL STORAGE ********")
      console.log(this.user.name.toString())
      localStorage.setItem("userID", this.user.userID.toString());
      localStorage.setItem("name", this.user.name.toString());
      localStorage.setItem("password", this.user.password.toString());
    }

    console.log("YOU ARE LOGGED IN /// " ,  this.isLoggedIn)

    // let the store refresh -> and all dependent subscribers
    store.dispatch(fakeDispatch())
  }

  genNoLoginData() {
    this.user = new usr_("", "loginError", "");
    this.isLoggedIn = false;
  }
}



export default session;
