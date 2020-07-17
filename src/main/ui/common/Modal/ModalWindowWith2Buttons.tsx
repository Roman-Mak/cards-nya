import React, {useState} from "react";
import style from './ModalWindowWith2Buttons.module.css'
 type ModalWindowWith2ButtonTypes={
     confirmFunction:(idItem:string)=>void
     cancelFunction:()=> void
     nameItem:string
     idItem:string

 }

const ModalWindowWithTwoButton:React.FC<ModalWindowWith2ButtonTypes> = (props) => {

    return (
        <>
            <div className={style.backgroundStyle}>
            </div>
            <div className={style.main}>
                <span> {`Delete ${props.nameItem }?`} </span>
                <div>
                    <button onClick={()=>props.confirmFunction(props.idItem)}>Yes</button>
                    <button onClick={props.cancelFunction}>No</button>
                </div>
            </div>
        </>
    )
};
export default ModalWindowWithTwoButton