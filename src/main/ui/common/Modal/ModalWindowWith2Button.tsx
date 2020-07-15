import React, {useState} from "react";
import style from './ModalWindowWith2Button.module.css'
 type ModalWindowWith2ButtonTypes={
     confirmFunction:()=>void
     cancelFunction:()=> void
 }

const ModalWindowWithTwoButton:React.FC<ModalWindowWith2ButtonTypes> = (props) => {

    return (
        <>
            <div className={style.backgroundStyle}>
            </div>
            <div className={style.main}>
                <span>Delete Item?</span>
                <div>
                    <button onClick={props.confirmFunction}>Yes</button>
                    <button onClick={props.cancelFunction}>No</button>
                </div>

            </div>

        </>

    )

};
export default ModalWindowWithTwoButton