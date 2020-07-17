import React from "react";
import {Route} from "react-router-dom";
import styles from "./Routes.module.css"
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import MainTable from "../TablePacks/TablePacks";
import Login from "../Login/Login";


export const PROFILE_PATH = "/profile";
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";
export const FORGOT_PASSWORD_PATH = "/forgot-password";
export const CARDS_TABLE = "/cards-table";

const Routes = () => {

    return (
        <div className={styles.routes}>
            <Route path={PROFILE_PATH} render={() => <Profile/>}/>
            <Route path={LOGIN_PATH} render={() => <Login/>}/>
            <Route path={REGISTER_PATH} render={() => <Register/>}/>
            <Route path={FORGOT_PASSWORD_PATH} render={() => <ForgotPassword/>}/>
            <Route path={CARDS_TABLE} render={() => <MainTable/>}/>
        </div>
    );
};

export default Routes;
