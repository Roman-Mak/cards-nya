import React, {useCallback, useEffect, useState} from "react";
import Table, {TableModelType} from "../../common/Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";
import {CardType} from "../../../dal/api-cards";
import {addCard, getCards} from "../../../bll/cards-reducer";
import Button from "../../common/Button/Button";
import styles from "./Cards.module.css"
import EditMenu from "../../common/Table/EditMenu";
import {useParams} from "react-router-dom";
import ModalWindowWithTwoInputs from "../../common/Modal/ModalWindowWith2Input";

let columns: Array<TableModelType> = [
    {
        title: "Question",
        render(dataItem: CardType) {
            return <span>{dataItem.question}</span>
        }
    },
    {
        title: "Answer",
        render(dataItem: CardType) {
            return <span>{dataItem.answer}</span>
        }
    },
    {
        title: "Grade",
        render(dataItem: CardType) {
            return <span>{dataItem.grade}</span>
        },
    },
    {
        title: "Edit",
        render(dataItem: CardType) {
            return <EditMenu id={dataItem._id}/>
        },
    }
];

type RouteParamsType = {
    packId: string;
};

const Cards = () => {
    const [isAddModalHidden, setIsAddModalHidden] = useState<boolean>(true);
    const [isDeleteModalHidden, setIsDeleteModalHidden] = useState<boolean>(true);
    const cards = useSelector((state: AppStateType) => state.cards.cards);
    const dispatch = useDispatch();
    const packId = useParams<RouteParamsType>().packId;

    useEffect(() => {
        dispatch(getCards(packId));
    }, [packId, dispatch]);

    const onAddCardClick = useCallback((question) => {
        dispatch(addCard(packId, question, "blabla"));
        setIsAddModalHidden(true);
    }, [dispatch, packId]);

    const showAddModal = () => {
        setIsAddModalHidden(false);
    };

    const hideAddModal = () => {
        setIsAddModalHidden(true);
    };

    return (
        <div className={styles.container}>
            <div className={styles.addButton}>
                <Button name={"Add Card"} onClickFunc={showAddModal}/>
            </div>
            {!isAddModalHidden &&
            <ModalWindowWithTwoInputs name={"Add"} placeholder={"Question"}
                                      cancelFunction={hideAddModal}
                                      addItemFunction={onAddCardClick}/>}
            <Table columns={columns} items={cards}/>
        </div>
    )
};

export default Cards;