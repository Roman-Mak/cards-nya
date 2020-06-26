import React from "react";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import styles from "./Profile.module.css"

const Profile = () => {
    return (
        <div className={styles.profile}>
            <Button name={"Test"} onClickFunc={() => {}}/>
            <Input type={"text"} placeholder={"Test message"}/>
        </div>
    );
};

export default Profile;
