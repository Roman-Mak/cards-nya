import React, {useEffect} from "react";
import Table, {TableModelType} from "../../common/Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";
import {CardType} from "../../../dal/api-get-cards";
import {getCards} from "../../../bll/cards-reducer";
import Button from "../../common/Button/Button";
import styles from "./Cards.module.css"
import EditMenu from "../../common/Table/EditMenu";
import { withRouter, RouteComponentProps } from "react-router-dom";

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

type PackIdType = {
    packId: string;
};
type CardsPropsType = RouteComponentProps<PackIdType>;

const Cards = (props: CardsPropsType) => {
    const cards = useSelector((state: AppStateType) => state.cards.cards);
    const packId = props.match.params.packId;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCards(packId));
    }, [packId, dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.addButton}>
                <Button name={"Add Card"} onClickFunc={() => {
                }}/>
            </div>
            <Table columns={columns} items={cards}/>
        </div>
    )
};

export default withRouter(Cards);