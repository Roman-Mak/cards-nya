import React, {useEffect, useState} from "react";
import styles from "./Learn.module.css"
import {CardType} from "../../../dal/api-cards";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";
import Button from "../../common/Button/Button";
import {getCards} from "../../../bll/cards-reducer";
import {setGrade} from "../../../bll/learn-reducer";
import { useParams } from "react-router-dom";

const getCard = (cards: Array<CardType>) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    return cards[res.id + 1];
};

type RouteParamsType = {
    packId: string;
};

const Learn = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const cards = useSelector((state: AppStateType) => state.cards.cards);
    const setGradeSuccess = useSelector((state: AppStateType) => state.learn.updateGradeSuccess);
    const packId = useParams<RouteParamsType>().packId;
    const cardToShow = getCard(cards);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCards(packId));
    }, [packId, dispatch]);

    const onSetGradeClick = (grade: number) => {
        dispatch(setGrade(cardToShow._id, grade));
    };

    if (cards.length < 1) {
        return null
    }

    return (
        <div className={styles.container}>
            <span>Question: {cardToShow.question}</span>
            {
                !isChecked
                    ? <Button name={"check answer"} onClickFunc={() => setIsChecked(true)}/>
                    : <div className={styles.answer}>
                        <span>Answer: {cardToShow.answer}</span>
                        <div>
                            <button onClick={() => onSetGradeClick(1)}>didn't know</button>
                            <button onClick={() => onSetGradeClick(2)}>forgot</button>
                            <button onClick={() => onSetGradeClick(3)}>thought slowly</button>
                            <button onClick={() => onSetGradeClick(4)}>knew good</button>
                            <button onClick={() => onSetGradeClick(5)}>knew well</button>
                        </div>
                        {setGradeSuccess && <span style={{backgroundColor: "green"}}>Answer saved</span>}
                        <button>Next card</button>
                    </div>
            }
        </div>
    );
};

export default Learn;