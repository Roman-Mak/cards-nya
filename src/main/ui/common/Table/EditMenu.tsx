import Button from "../Button/Button";
import React from "react";

type EditMenuPropsType = {
    id: string;
    updateButtonCallback: () => void;
    deleteButtonCallback: () => void;
};

export const EditMenu = (props: EditMenuPropsType) => {
    return (
        <div style={{display: "flex", justifyContent: "space-around", width: "100%"}}>
            <Button name={"update"} onClickFunc={props.updateButtonCallback}/>
            <Button name={"delete"} onClickFunc={props.deleteButtonCallback}/>
        </div>
    )
};

export default EditMenu;