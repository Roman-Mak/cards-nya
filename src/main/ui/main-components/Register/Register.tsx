import React, {useState} from "react";
import styles from "./Register.module.css"
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import {NewUser} from "../../../bll/register-reducer";

const Register = () => {

    const [newEmail, setNewEmail] = useState<string>("");

    const [password, setPassword] = useState<string>("");

    const [repeatPassword, onChangeFunc] = useState<string>("");

     const setNewUserData=():void=>{
         if (password === repeatPassword) {
             NewUser({newEmail,repeatPassword})
         } else { alert("Пароли не совпадают")}
    };

    return (
        <div className={styles.register}>
            <Input type={"text"} placeholder={"e-mail"} value={newEmail} onChangeFunc={setNewEmail}/>
            <Input type={"password"} placeholder={"Password"} value={password} onChangeFunc={setPassword}/>
            <Input type={"password"} placeholder={"Repeat password"} value={repeatPassword} onChangeFunc={onChangeFunc}/>
            <Button name={"Register"} onClickFunc={setNewUserData}/>
        </div>
    );
};

export default Register;
