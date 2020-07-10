import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./Header.module.css"
import {PACKS_TABLE, FORGOT_PASSWORD_PATH, LOGIN_PATH, PROFILE_PATH, REGISTER_PATH} from "../Routes/Routes";

const Header = () => {
    return (
        <div className={styles.header}>
            <NavLink to={PROFILE_PATH}>Profile</NavLink>
            <NavLink to={LOGIN_PATH}>Login</NavLink>
            <NavLink to={REGISTER_PATH}>Register</NavLink>
            <NavLink to={FORGOT_PASSWORD_PATH}>Forgot Password</NavLink>
            <NavLink to={PACKS_TABLE}>Cards Table</NavLink>
        </div>
    );
};

export default Header;