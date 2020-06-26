import React from "react";
import Button from "../Button/Button";

const Input = (props: any) => {

    return (
        <div>
            <input type={"text"} placeholder={"Test"}/>
            <Button name={"Test"} onClickFunc={() => {}}/>
        </div>
    )
};

export default Input;