import React, {useEffect, useState} from "react";
import styles from "./Learn.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";
import Button from "../../common/Button/Button";
import {
    setGrade,
    setGradeSuccess,
    setGradeError,
    getCardToShowSuccess
} from "../../../bll/learn-reducer";
import {useParams} from "react-router-dom";
import {CardType} from "../../../dal/api-cards";
import {getCards} from "../../../bll/cards-reducer";

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
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
    const allCards = useSelector((state: AppStateType) => state.cards.cards);
    const cardToShow = useSelector((state: AppStateType) => state.learn.cardToShow);
    const gradeSuccess = useSelector((state: AppStateType) => state.learn.updateGradeSuccess);
    const gradeError = useSelector((state: AppStateType) => state.learn.isError);
    const {packId} = useParams<RouteParamsType>();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("use effect")
        if (isFirstRender) {
            dispatch(getCards(packId));
            setIsFirstRender(false);
            console.log("first")
        }
        if (allCards.length > 0) {
            dispatch(getCardToShowSuccess(getCard(allCards)));
            console.log("get card")
        }
    }, [isFirstRender, packId, allCards, dispatch]);

    const onSetGradeClick = (grade: number) => {
        dispatch(setGrade(cardToShow._id, grade));
    };

    const showNextCard = () => {
        dispatch(getCardToShowSuccess(getCard(allCards)));
        setIsChecked(false);
        dispatch(setGradeSuccess(false));
        dispatch(setGradeError(false));
    };

    if (allCards.length === 0) {
        return null;
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
                            <Button name={"didn't know"} onClickFunc={() => onSetGradeClick(1)}/>
                            <Button name={"forgot"} onClickFunc={() => onSetGradeClick(2)}/>
                            <Button name={"thought slowly"} onClickFunc={() => onSetGradeClick(3)}/>
                            <Button name={"knew good"} onClickFunc={() => onSetGradeClick(4)}/>
                            <Button name={"knew well"} onClickFunc={() => onSetGradeClick(5)}/>
                        </div>
                        {gradeSuccess && <span style={{color: "green"}}>answer saved</span>}
                        {gradeError && <span style={{color: "red"}}>some error</span>}
                        <Button name={"Next card"} onClickFunc={showNextCard}/>
                    </div>
            }
        </div>
    );
};

export default Learn;