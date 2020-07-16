import React from "react";
import {Route} from "react-router-dom";
import styles from "./Routes.module.css"
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import MainTable from "../Table/TablePacks";
import Cards from "../Cards/Cards";
import Learn from "../Learn/Learn";

export const PROFILE_PATH = "/profile";
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";
export const FORGOT_PASSWORD_PATH = "/forgot-password";
export const PACKS_TABLE = "/packs-table";
export const CARDS_TABLE = `${PACKS_TABLE}/cards/:packId?`;
export const LEARN_CARD = "/learn/:cardId";

const Routes = () => {

    return (
        <div className={styles.routes}>
            <Route path={PROFILE_PATH} render={() => <Profile/>}/>
            <Route path={LOGIN_PATH} render={() => <Login/>}/>
            <Route path={REGISTER_PATH} render={() => <Register/>}/>
            <Route path={FORGOT_PASSWORD_PATH} render={() => <ForgotPassword/>}/>
            <Route exact path={PACKS_TABLE} render={() => <MainTable/>}/>
            <Route path={CARDS_TABLE} render={() => <Cards/>}/>
            <Route path={LEARN_CARD} render={() => <Learn/>}/>
        </div>
    );
};

export default Routes;
