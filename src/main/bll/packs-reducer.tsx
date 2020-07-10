import {apiTableCards, Pack} from "../dal/api-table-cards";
import {Dispatch} from "redux";

const LOADING_PACKS_OF_CARDS = "cards-nya/auth/LOADING_PACKS_OF_CARDS";



const initialState = {
    cardPacks: [
    ],
};
type initialStateType = typeof initialState;

const packsOfCardsReducer = (state: initialStateType = initialState, action:loadingTableCards) => {
    switch (action.type) {
        case LOADING_PACKS_OF_CARDS: {
            return {
                ...state,
                cardPacks: action.allPacksCards
            }
        }
        default:
            return state;
    }
};

type loadingTableCards ={
   type:string
    allPacksCards: Array<Pack>
}

const loadingTableCardsAC = (allPacksCards:Array<Pack>): loadingTableCards => ({type: LOADING_PACKS_OF_CARDS, allPacksCards});

export const LoadingPacksCards = () => (dispatch:Dispatch) => {
    return apiTableCards.loadingCardsPack()
        .then(res => {
            dispatch(loadingTableCardsAC(res.data.cardPacks));
            document.cookie = `token=${res.data.token}`;
        })
};
export default packsOfCardsReducer;