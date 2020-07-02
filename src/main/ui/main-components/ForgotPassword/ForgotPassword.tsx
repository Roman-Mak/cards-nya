import React, {useState} from "react";
import styles from "./ForgotPassword.module.css"
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    return (
        <div className={styles.container}>
            <Input onChangeFunc={setEmail} value={email} type={"email"} placeholder={"your E-mail"}/>
            <Button name={"Send"} onClickFunc={() => {}}/>
        </div>
    );
};

export default ForgotPassword;
