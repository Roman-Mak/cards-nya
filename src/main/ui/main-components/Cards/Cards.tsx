import React, {useEffect} from "react";
import MyTable, {TableModelType} from "../../common/Table/MyTable";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";
import {CardType} from "../../../dal/api-get-cards";
import {getCards} from "../../../bll/cards-reducer";
import Button from "../../common/Button/Button";
import styles from "./Cards.module.css"
import EditMenu from "../../common/Table/EditMenu";

type CardsPropsType = {
    id: string;
}

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

const Cards = () => {
    const cards = useSelector((state: AppStateType) => state.cards.cards);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getCards(props.id));
    // }, [props.id, dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.addButton}>
                <Button name={"Add Card"} onClickFunc={() => {
                }}/>
            </div>
            <MyTable columns={columns} items={cards}/>
        </div>
    )
};

export default Cards;