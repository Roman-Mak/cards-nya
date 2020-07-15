import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Table} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {AddPacksCards, LoadingPacksCards} from "../../../bll/packs-reducer";
import {Pack} from '../../../dal/api-table-packs';
import {AppStateType} from "../../../bll/store";
import ModalWindowWithTwoInputs from "../../common/Modal/ModalWindowWith2Input";
import ModalWindowWithTwoButton from "../../common/Modal/ModalWindowWith2Button";


const MainTable: React.FC = () => {
    const [isHiddenForAddPacks, setIsHiddenForAddPacks] = useState<boolean>(true);
    const changeForAddPacksStatusFalse = () => {
        setIsHiddenForAddPacks(false)
    };
    const changeForAddPacksStatusTrue = () => {
        setIsHiddenForAddPacks(true)
    };


    const [isHiddenForDeletePacks, setIsHiddenForDeletePacks] = useState<boolean>(true);
    const changeForDeletePacksStatusFalse = () => {
        setIsHiddenForDeletePacks(false)
    };
    const changeForDeletePacksStatusTrue = () => {
        setIsHiddenForDeletePacks(true)
    };


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Created',
            dataIndex: 'created',
        },
        {
            title: 'Updated',
            dataIndex: 'update',
        },
        {
            title: <button onClick={changeForAddPacksStatusFalse}>ADD</button>,
            dataIndex: 'buttons',
        },
    ];


    const Packs = useSelector((store: AppStateType) => store.packsOfCards.cardPacks);

    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(LoadingPacksCards())
        }, []
    );

    const deleteFunction = () => {
        alert('yoyo')
    };

    const addNewPack =(firstValue:string):void=>{
        dispatch (AddPacksCards(firstValue))
    };


    const dataOfPacks = Packs.map((c:Pack) => {
        return {
            key: c._id,
            name: <a>{c.name}</a>,
            created: c.created,
            update: c.updated,
            buttons: <div>
                <button>update</button>
                <button onClick={changeForDeletePacksStatusFalse}>delete</button>
            </div>
        }
    });

    return (
        <div>
            {!isHiddenForAddPacks
                ? <ModalWindowWithTwoInputs name={'ADD'} placeholder={'namePack'}
                                            cancelFunction={changeForAddPacksStatusTrue}
                                            addItemFunction={addNewPack}

                />
                : null
            }
            {!isHiddenForDeletePacks
                ? <ModalWindowWithTwoButton cancelFunction={changeForDeletePacksStatusTrue}
                                            confirmFunction={deleteFunction}/>
                : null
            }
            <Table columns={columns} dataSource={dataOfPacks}/>
        </div>
    )
};

export default MainTable;


