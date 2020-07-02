import React, {useCallback, useState} from "react";
import styles from "./ForgotPassword.module.css"
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword} from "../../../bll/forgot-password-reducer";
import {AppStateType} from "../../../bll/store";
import { Redirect } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");

    const dispatch = useDispatch();
    const error = useSelector((store: AppStateType) => store.forgotPassword.error);
    const resetSuccess = useSelector((store: AppStateType) => store.forgotPassword.success);

    const resetPass = useCallback(
        () => {
            dispatch(resetPassword(email))
        }, [email, dispatch]
    );

    if (resetSuccess) return <Redirect to={"/set-new-password"}/>;

    return (
        <div className={styles.container}>
            <div>Forgot Password</div>
            <Input onChangeFunc={setEmail} value={email} type={"email"} placeholder={"your e-mail"}/>
            {
                error && <span className={styles.error}>{error}</span>
            }
            <Button name={"Send"} onClickFunc={resetPass}/>
        </div>
    );
};

export default ForgotPassword;
