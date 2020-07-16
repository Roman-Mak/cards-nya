import {Dispatch} from "redux";
import {CardType, cardsApi} from "../dal/api-cards";

const GET_CARDS = "GET-CARDS";
const ADD_CARD = "ADD-CARD";

const initialState = {
    cards: [] as Array<CardType>
};

type initialStateType = typeof initialState;

const cardsReducer = (state: initialStateType = initialState, action: CardsActionType): initialStateType => {
    switch (action.type) {
        case GET_CARDS:
            return {...state, cards: action.cards};
        case ADD_CARD:
            return {...state, cards: [action.card, ...state.cards]};
        default:
            return state;
    }
};

type CardsActionType = GetCardsSuccessType | AddCardSuccessType;

type GetCardsSuccessType = { type: typeof GET_CARDS; cards: Array<CardType> };
export const getCardsSuccess = (cards: Array<CardType>): GetCardsSuccessType => ({type: GET_CARDS, cards});

type AddCardSuccessType = {type: typeof ADD_CARD, card: CardType};
const addCardsSuccess = (card: CardType): AddCardSuccessType => ({type: ADD_CARD, card});

export const getCards = (id: string) => (dispatch: Dispatch<GetCardsSuccessType>) => {
    cardsApi.getCards(id)
        .then(res => {
            dispatch(getCardsSuccess(res.cards));
            document.cookie = `token=${res.token}`;
        })
        .catch(res => {
            console.log(res);
        })
};

export const addCard = (packId: string, question: string, answer: string) =>
    (dispatch: Dispatch<AddCardSuccessType>) => {
    cardsApi.addCard(packId, question, answer)
        .then(res => {
            dispatch(addCardsSuccess(res.newCard));
            document.cookie = `token=${res.token}`;
        })
        .catch(res => {
            console.log(res);
        })
};

export default cardsReducer;