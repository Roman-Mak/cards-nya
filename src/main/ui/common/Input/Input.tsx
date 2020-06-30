import React from "react";
import styles from "./Input.module.css"

const Input = (props: any) => {
    return (
        <div className={styles.inputContainer}>
            <input type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.changeData}/>
        </div>
    )
};

export default Input;