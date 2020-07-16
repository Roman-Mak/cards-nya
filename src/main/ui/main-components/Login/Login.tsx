import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import styles from "./Login.module.css"
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import {setIsAuth, userLogin} from "../../../bll/login-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";
import {Redirect} from "react-router-dom";

const Login = () => {
    const [email, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const dispatch = useDispatch();
    const error = useSelector((store: AppStateType) => store.login.error);
    const isAuth = useSelector((store: AppStateType) => store.login.isAuth);

    const token = document.cookie;
    useEffect(
        () => {
            if (token) {
                dispatch(setIsAuth(true));
            }
        }, [token, dispatch]);

    const onRememberMeChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setRememberMe(e.currentTarget.checked);
        },
        [setRememberMe]
    );

    const setData = useCallback(
        () => {
            console.log({email, password, rememberMe});
            dispatch(userLogin({email, password, rememberMe}));
        },
        [email, password, rememberMe, dispatch]
    );

    if (isAuth) return <Redirect to={"/profile"}/>;

    return (

        <div className={styles.login}>
            <div>Sign In</div>
            <Input type={"email"} placeholder={"Login"} onChangeFunc={setLogin} value={email}/>
            <Input type={"password"} placeholder={"Password"} onChangeFunc={setPassword} value={password}/>
            {
                error && <span className={styles.error}>{error}</span>
            }
            <div className={styles.rememberMe}>
                <input type={"checkbox"} onChange={onRememberMeChange} checked={rememberMe}/>
                <span>remember me</span>
            </div>
            <Button name={"Login"} onClickFunc={setData}/>
        </div>
    );
};

export default Login;
