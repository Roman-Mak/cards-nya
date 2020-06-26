import React from "react";
import Button from "../Button/Button";
import styles from "./Input.module.css"

const Input = (props: any) => {

    return (
        <div className={styles.inputContainer}>
            <input type={props.type} placeholder={props.placeholder}/>
            <Button name={"Test"} onClickFunc={() => {}}/>
        </div>
    )
};

export default Input;