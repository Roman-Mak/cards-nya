import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Table} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {AddPackCard, ChangePackName, DeletePackCard, LoadingPacksCards} from "../../../bll/packs-reducer";
import {Pack} from '../../../dal/api-table-packs';
import {AppStateType} from "../../../bll/store";
import ModalWindowWithTwoInputs from "../../common/Modal/ModalWindowWith2Inputs";
import ModalWindowWithTwoButton from "../../common/Modal/ModalWindowWith2Buttons";
import ModalWindowWithOneInput from "../../common/Modal/ModalWindowWith1Input";
import {PACKS_TABLE} from "../Routes/Routes";
import { NavLink } from 'react-router-dom';


const MainTable: React.FC = () => {

    const [currentId, setCurrentId] = useState<string>(''); // текущий ID элемента на к-м произошел OnClick

    //State и функции для модального окна по смене названия колоды
    const [isHiddenForChangeNamePack, SetIsHiddenForChangeNamePack] = useState<boolean>(true);
    const changeNamePackStatusTrue = () => {
        SetIsHiddenForChangeNamePack(true)
    };
    const changeNamePackStatusFalse = (id: string) => {
        SetIsHiddenForChangeNamePack(false);
        setCurrentId(id)
    };


    //State и функции для модального окна по добавлению колоды
    const [isHiddenForAddPacks, setIsHiddenForAddPacks] = useState<boolean>(true);
    const changeForAddPacksStatusFalse = () => {
        setIsHiddenForAddPacks(false)
    };
    const changeForAddPacksStatusTrue = () => {
        setIsHiddenForAddPacks(true)
    };

    //State и функции для модального окна по удалению колоды
    const [isHiddenForDeletePacks, setIsHiddenForDeletePacks] = useState<boolean>(true);
    const changeForDeletePacksStatusFalse = (id: string) => {
        setIsHiddenForDeletePacks(false);
        setCurrentId(id)
    };
    const changeForDeletePacksStatusTrue = () => {
        setIsHiddenForDeletePacks(true)
    };


    // столбцы для таблицы
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
            title: 'ID',
            dataIndex: 'id',
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

    // удаление колоды
    const deletePack = (idPack: string): void => {
        dispatch(DeletePackCard(idPack));
        changeForDeletePacksStatusTrue()
    };
    // добавление колоды
    const addNewPack = (firstValue: string): void => {
        dispatch(AddPackCard(firstValue));
        changeForAddPacksStatusTrue()
    };
    // изменение имени колоды
    const changeName = (firstValue: string, currentId: string): void => {
        dispatch(ChangePackName(firstValue, currentId));
        changeNamePackStatusTrue()
    };

    // data для колоды
    const dataOfPacks = Packs.map((c: Pack) => {
        return {
            id: c._id,
            key: c._id,
            name: <NavLink to={`${PACKS_TABLE}/cards/${c._id}`}>{c.name}</NavLink>,
            created: c.created,
            update: c.updated,
            buttons: <div>
                <button onClick={() => changeNamePackStatusFalse(c._id)}>update</button>
                <button onClick={() => changeForDeletePacksStatusFalse(c._id)}>delete</button>
                <button><NavLink to={`/learn/${c._id}`}>learn</NavLink></button>
            </div>,
        }
    });


    return (
        <div>
            {dataOfPacks.map(pack => {                                           // модальное окно для удаления колоды
                if (!isHiddenForDeletePacks && pack.id === currentId) {
                    return <ModalWindowWithTwoButton key={pack.key}
                                                     cancelFunction={changeForDeletePacksStatusTrue}
                                                     nameItem={'pack'}
                                                     idItem={pack.id}
                                                     confirmFunction={deletePack}/>
                } else {
                    return null
                }
            })}

            {!isHiddenForAddPacks                                                       // окно для добавления колоды
                ? <ModalWindowWithTwoInputs name={'ADD'} placeholder={'namePack'}
                                            cancelFunction={changeForAddPacksStatusTrue}
                                            addItemFunction={addNewPack}
                />
                : null
            }

            {dataOfPacks.map(pack => {                                              // окно для изменения имени колоды
                if (!isHiddenForChangeNamePack && pack.id === currentId) {
                    return <ModalWindowWithOneInput name={'CHANGE'}
                                                    placeholder={'newNamePack'}
                                                    key={pack.key}
                                                    cancelFunction={changeNamePackStatusTrue}
                                                    idItem={pack.id}
                                                    addItemFunction={changeName}/>
                } else {
                    return null
                }
            })}

            <Table columns={columns} dataSource={dataOfPacks}   /* таблица с входными данными для отрисовки*//>
        </div>
    )
};


export default MainTable;


