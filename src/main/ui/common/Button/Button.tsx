import React from "react";
import styles from "./Button.module.css"

type PropsType = {
    name: string;
    onClickFunc: () => void;
};

const Button = (props: PropsType) => {
    return (
        <button className={styles.button} onClick={props.onClickFunc}>{props.name}</button>
    )
};

export default Button;