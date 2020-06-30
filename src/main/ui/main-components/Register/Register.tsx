import React, {useState, ChangeEvent} from "react";
import styles from "./Register.module.css"
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

const Register = () => {


    const [name, setName] = useState("");
    const changeName=(e: ChangeEvent<HTMLInputElement>)=>{
        setName(e.currentTarget.value)
    };

    const [password, setPassword] = useState("");
    const newPassword=(e: ChangeEvent<HTMLInputElement>):void=>{
        setPassword(e.currentTarget.value)
    };

    const [repeatPassword, setRepeatPassword] = useState("");
    const repeatMewPassword=(e: ChangeEvent<HTMLInputElement>):void=>{
        setRepeatPassword(e.currentTarget.value)
    };


    return (
        <div className={styles.register}>
            <Input type={"text"} placeholder={"Name"} value={name} changeData={changeName}/>
            <Input type={"password"} placeholder={"Password"} value={password} changeData={newPassword}/>
            <Input type={"password"} placeholder={"Repeat password"} value={repeatPassword} changeData={repeatMewPassword}/>
            <Button name={"Registration"} onClickFunc={() => {
            }}/>
        </div>
    );
};

export default Register;
