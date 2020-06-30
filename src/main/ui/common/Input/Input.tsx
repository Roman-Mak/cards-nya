import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react";
import styles from "./Input.module.css";

type InputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    & {onChangeFunc: (value: string) => void };

const Input = (props: InputPropsType) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeFunc(e.currentTarget.value);
    };

    return (
        <div className={styles.inputContainer}>
            <input type={props.type} placeholder={props.placeholder} value={props.value} onChange={onChange}/>
        </div>
    );
};

export default Input;