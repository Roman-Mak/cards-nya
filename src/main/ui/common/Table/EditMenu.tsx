import Button from "../Button/Button";
import React from "react";

type EditMenuPropsType = {
    id: string;
};

export const EditMenu = (props: EditMenuPropsType) => {
    return (
        <div style={{display: "flex", justifyContent: "space-around", width: "100%"}}>
            <Button name={"update"} onClickFunc={() => {
            }}/>
            <Button name={"delete"} onClickFunc={() => {
            }}/>
        </div>
    )
};

export default EditMenu;