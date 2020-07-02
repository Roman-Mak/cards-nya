import React, {useState} from "react";
import styles from "./Register.module.css"
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import {NewUser} from "../../../bll/register-reducer";
import {useDispatch} from "react-redux";


const Register = () => {

    const [email, setNewEmail] = useState<string>("");

    const [password, setPassword] = useState<string>("");

    const [repeatPassword, setRepeatPassword] = useState<string>("");

    const dispatch = useDispatch();

    const setNewUserData = (): void => {
        if (password === repeatPassword) {
            dispatch(NewUser({email, password}));
            setNewEmail("");
            setPassword("");
            setRepeatPassword("")
        } else {
            alert("Пароли не совпадают")
        }
    };

    return (
        <div className={styles.register}>
            <Input type={"text"} placeholder={"e-mail"} value={email} onChangeFunc={setNewEmail}/>
            <Input type={"password"} placeholder={"Password"} value={password} onChangeFunc={setPassword}/>
            <Input type={"password"} placeholder={"Repeat password"} value={repeatPassword}
                   onChangeFunc={setRepeatPassword}/>
            <Button name={"Register"} onClickFunc={setNewUserData}/>
        </div>
    );
};

export default Register;
