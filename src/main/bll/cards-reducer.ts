import {Dispatch} from "redux";
import {CardType, getCardsApi} from "../dal/api-get-cards";

const GET_CARDS = "GET-CARDS";

const initialState = {
    cards: [
        {answer: "yes", question: "yes?", grade: 1, _id: "6"},
        {answer: "yes", question: "yes?", grade: 1, _id: "7"},
        {answer: "yes", question: "yes?", grade: 1, _id: "8"}
    ]
};

type initialStateType = {
    cards: Array<CardType>;
};

const cardsReducer = (state: initialStateType = initialState, action: CardsActionType): initialStateType => {
    switch (action.type) {
        case GET_CARDS:
            return {...state, cards: action.cards};
        default:
            return state;
    }
};

type CardsActionType = GetCardsSuccessType;

type GetCardsSuccessType = { type: typeof GET_CARDS; cards: Array<CardType> }
export const getCardsSuccess = (cards: Array<CardType>): GetCardsSuccessType => ({type: GET_CARDS, cards});

export const getCards = (id: string) => (dispatch: Dispatch<GetCardsSuccessType>) => {
    getCardsApi.getCards(id)
        .then(res => {
            dispatch(getCardsSuccess(res.cards));
            document.cookie = `token=${res.token}`;
        })
        .catch(res => {
            console.log(res);
        })
};

export default cardsReducer;