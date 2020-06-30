import React, {ChangeEvent, useState} from "react";
import styles from "./Login.module.css"
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import {userLogin} from "../../../bll/login-reducer";

const Login = () => {
    const [email, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const onRememberMeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked);
    };

    const setData = () => {
        console.log({email, password, rememberMe});
        userLogin({email, password, rememberMe});
    };

    return (
        <div className={styles.login}>
            <div>Sign In</div>
                <Input type={"email"} placeholder={"Login"} onChangeFunc={setLogin} value={email}/>
                <Input type={"password"} placeholder={"Password"} onChangeFunc={setPassword} value={password}/>
            <div className={styles.rememberMe}>
                <input type={"checkbox"} onChange={onRememberMeChange} checked={rememberMe}/>
                <span>remember me</span>
            </div>
            <Button name={"Login"} onClickFunc={setData}/>
        </div>
    );
};

export default Login;
