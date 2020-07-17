import {Dispatch} from "redux";
import {CardType, cardsApi} from "../dal/api-cards";

const GET_CARDS = "GET-CARDS";
const ADD_CARD = "ADD-CARD";
const DELETE_CARD = "DELETE-CARD";
const UPDATE_CARD = "UPDATE-CARD";

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
        case DELETE_CARD:
            return {...state, cards: state.cards.filter(card => action.cardId !== card._id)};
        case UPDATE_CARD:
            return {
                ...state, cards: state.cards.map(card => {
                    if (action.card._id === card._id) {
                        return action.card
                    } else {
                        return card;
                    }
                })
            };
        default:
            return state;
    }
};

type CardsActionType = GetCardsSuccessType | AddCardSuccessType
    | DeleteCardSuccessType | UpdateCardSuccessType;

type GetCardsSuccessType = { type: typeof GET_CARDS; cards: Array<CardType> };
export const getCardsSuccess = (cards: Array<CardType>): GetCardsSuccessType => ({type: GET_CARDS, cards});

type AddCardSuccessType = { type: typeof ADD_CARD, card: CardType };
const addCardsSuccess = (card: CardType): AddCardSuccessType => ({type: ADD_CARD, card});

type DeleteCardSuccessType = { type: typeof DELETE_CARD, cardId: string };
const deleteCardsSuccess = (cardId: string): DeleteCardSuccessType => ({type: DELETE_CARD, cardId});

type UpdateCardSuccessType = { type: typeof UPDATE_CARD, card: CardType };
const updateCardsSuccess = (card: CardType): UpdateCardSuccessType => ({type: UPDATE_CARD, card});

export const getCards = (id: string) => (dispatch: Dispatch<CardsActionType>) => {
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
    (dispatch: Dispatch<CardsActionType>) => {
        cardsApi.addCard(packId, question, answer)
            .then(res => {
                if (res.success) {
                    dispatch(addCardsSuccess(res.newCard));
                    document.cookie = `token=${res.token}`;
                }
            })
            .catch(res => {
                console.log(res);
            })
    };

export const deleteCard = (cardId: string) => (dispatch: Dispatch<CardsActionType>) => {
    cardsApi.deleteCard(cardId)
        .then(res => {
            if (res.success) {
                dispatch(deleteCardsSuccess(cardId));
                document.cookie = `token=${res.token}`;
            }
        })
        .catch(res => {
            console.log(res);
        })
};

export const updateCard = (cardId: string, question: string, answer: string) =>
    (dispatch: Dispatch<CardsActionType>) => {
        cardsApi.updateCard(cardId, question, answer)
            .then(res => {
                if (res.success) {
                    dispatch(updateCardsSuccess(res.updatedCard));
                    document.cookie = `token=${res.token}`;
                }
            })
            .catch(res => {
                console.log(res);
            })
    };

export default cardsReducer;