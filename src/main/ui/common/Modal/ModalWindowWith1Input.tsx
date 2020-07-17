import React, {ChangeEvent, useState} from "react";
import style from './ModalWindowWith2Inputs.module.css'

type  ModalWindowWithTwoInputs = {
    idItem: string
    name: string
    placeholder: string
    cancelFunction: () => void
    addItemFunction: (firstValue: string, idItem: string) => void

}

const ModalWindowWithOneInput: React.FC<ModalWindowWithTwoInputs> = (props) => {


    const [firstValue, setFirstValue] = useState<string>('');
    const onChangeFirstInput = (e: ChangeEvent<HTMLInputElement>) => {
        setFirstValue(e.currentTarget.value)
    };


    return (
        <>
            <div className={style.backgroundStyle}>
            </div>
            <div className={style.main}>
                <input type="text" value={firstValue} placeholder={props.placeholder} onChange={onChangeFirstInput}/>
                <div className={style.forButton}>
                    <button onClick={() => props.addItemFunction(firstValue, props.idItem)}>{props.name}</button>
                    <button onClick={props.cancelFunction}>CANCEL</button>
                </div>
            </div>
        </>

    )
};
export default ModalWindowWithOneInput