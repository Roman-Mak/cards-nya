import React from "react";
import {Route} from "react-router-dom";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";

export const PROFILE_PATH = "/profile";
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";

const Routes = () => {
    return (
        <div className="Routes">
            <Route path={PROFILE_PATH} render={() => <Profile/>}/>
            <Route path={LOGIN_PATH} render={() => <Login/>}/>
            <Route path={REGISTER_PATH} render={() => <Register/>}/>
        </div>
    );
};

export default Routes;
