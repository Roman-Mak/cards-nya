import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import {Table} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {LoadingPacksCards} from "../../../bll/packs-reducer";
import { Pack } from '../../../dal/api-table-cards';
import {AppStateType} from "../../../bll/store";


const MainTable = () => {

    const Packs =  useSelector((store:AppStateType)=> store.packsOfCards.cardPacks);

    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(LoadingPacksCards())
        }, []
    );

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
            title: <button>ADD</button>,
            dataIndex: 'buttons',
        },
    ];

    const dataOfPacks = Packs.map((c:Pack) => {
        return {
            key: c._id,
            name: <a>{c.name}</a>,
            created: c.created,
            update: c.updated,
            buttons: <div>
                <button>update</button>
                <button>delete</button>
                </div>
        }
    });

    return (
        <>
            <Table columns={columns} dataSource={dataOfPacks}/>
        </>
    )
};

export default MainTable;


