import React, {ChangeEvent, useState} from "react";
import style from './ModalWindowWith2Inputs.module.css'

type  ModalWindowWithTwoInputs={
    name:string
    placeholder:string
    cancelFunction:()=>void
    addItemFunction:(firstValue:string)=>void

}

const ModalWindowWithTwoInputs:React.FC<ModalWindowWithTwoInputs> = (props) => {


    const [firstValue, setFirstValue] = useState<string>('');
    const onChangeFirstInput = (e:ChangeEvent<HTMLInputElement>) => {
        setFirstValue(e.currentTarget.value)
    };


    const [secondValue, setSecondValue] = useState<string>('');
    const onChangeSecondInput = (e:ChangeEvent<HTMLInputElement>) => {
        setSecondValue(e.currentTarget.value)
    };


    return (
        <>
            <div className={style.backgroundStyle}>
            </div>
            <div className={style.main}>
                <input type="text" value={firstValue} placeholder={props.placeholder} onChange={onChangeFirstInput}/>
                <input type="text" value={secondValue} onChange={onChangeSecondInput}/>
                <div className={style.forButton}>
                    <button onClick={()=>props.addItemFunction(firstValue)}>{props.name}</button>
                    <button onClick={props.cancelFunction}>CANCEL</button>
                </div>

            </div>
        </>

    )
};
export default ModalWindowWithTwoInputs