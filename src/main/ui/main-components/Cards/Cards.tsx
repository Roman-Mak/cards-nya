import React, {useCallback, useEffect, useState} from "react";
import Table, {TableModelType} from "../../common/Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";
import {CardType} from "../../../dal/api-cards";
import {addCard, deleteCard, getCards, updateCard} from "../../../bll/cards-reducer";
import Button from "../../common/Button/Button";
import styles from "./Cards.module.css"
import EditMenu from "../../common/Table/EditMenu";
import {useParams, NavLink} from "react-router-dom";
import ModalWindowWithTwoInputs from "../../common/Modal/ModalWindowWith2Input";
import ModalWindowWithTwoButton from "../../common/Modal/ModalWindowWith2Button";
import Learn from "../Learn/Learn";
import {LEARN_CARD} from "../Routes/Routes";

type RouteParamsType = {
    packId: string;
};

const Cards = () => {
    const columns: Array<TableModelType> = [
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
                return <EditMenu id={dataItem._id}
                                 deleteButtonCallback={() => {
                                     setIsDeleteModalHidden(false);
                                     setCardId(dataItem._id);
                                 }}
                                 updateButtonCallback={() => {
                                     setIsUpdateModalHidden(false);
                                     setCardId(dataItem._id);
                                 }}
                />
            },
        }
    ];

    const [isAddModalHidden, setIsAddModalHidden] = useState<boolean>(true);
    const [isUpdateModalHidden, setIsUpdateModalHidden] = useState<boolean>(true);
    const [isDeleteModalHidden, setIsDeleteModalHidden] = useState<boolean>(true);
    const [cardId, setCardId] = useState<string>("");
    const cards = useSelector((state: AppStateType) => state.cards.cards);
    const dispatch = useDispatch();
    const packId = useParams<RouteParamsType>().packId;

    useEffect(() => {
        dispatch(getCards(packId));
    }, [packId, dispatch]);

    const onAddCardClick = useCallback((question: string) => {
        dispatch(addCard(packId, question, "blabla"));
        setIsAddModalHidden(true);
    }, [dispatch, packId]);

    const onDeleteCardClick = useCallback((id: string) => {
        dispatch(deleteCard(id));
        setIsDeleteModalHidden(true);
    }, [dispatch]);

    const onUpdateCardClick = useCallback((cardId: string, question: string) => {
        dispatch(updateCard(cardId, question, "blabla222"));
        setIsUpdateModalHidden(true)
    }, [dispatch]);

    return (
        <div className={styles.container}>
            {!isAddModalHidden &&
            <ModalWindowWithTwoInputs name={"Add"} placeholder={"Question"}
                                      cancelFunction={() => setIsAddModalHidden(true)}
                                      addItemFunction={onAddCardClick}/>}
            {cards.map(card => {
                if (!isDeleteModalHidden && cardId === card._id) {
                    return <ModalWindowWithTwoButton key={card._id}
                                                     confirmFunction={() => onDeleteCardClick(card._id)}
                                                     cancelFunction={() => setIsDeleteModalHidden(true)}/>
                } else if (!isUpdateModalHidden && cardId === card._id) {
                    return <ModalWindowWithTwoInputs
                        name={"Update"} placeholder={"Question"} key={card._id}
                        cancelFunction={() => setIsUpdateModalHidden(true)}
                        addItemFunction={(question) => onUpdateCardClick(card._id, question)}/>
                } else {
                    return null;
                }
            })}
            <div className={styles.addButton}>
                <Button name={"Add Card"} onClickFunc={() => setIsAddModalHidden(false)}/>
            </div>
            <Table columns={columns} items={cards}/>
            <NavLink to={`${LEARN_CARD}/${packId}`}>LEARN</NavLink>
        </div>
    )
};

export default Cards;