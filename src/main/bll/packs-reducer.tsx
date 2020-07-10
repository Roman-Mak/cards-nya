import {apiTableCards, Pack} from "../dal/api-table-cards";
import {Dispatch} from "redux";

const LOADING_PACKS_OF_CARDS = "cards-nya/auth/LOADING_PACKS_OF_CARDS";



const initialState = {
    cardPacks: [
        // {
        //     _id: "333",
        //     user_id: "5eb543f6bea3ad21480f1ee7",
        //     name: "no Name",
        //     path: "/def", // папка
        //     grade: 0, // средняя оценка карточек
        //     shots: 0,// количество попыток
        //     rating: 0, // лайки
        //     type: "pack",// ещё будет "folder" (папка)
        //     created: "2020-05-09T15:40:40.339Z",
        //     updated: "2020-05-09T15:40:40.339B",
        //     __v: 0
        // },
        // {
        //     _id: "334",
        //     user_id: "5eb543f6bea3ad21480f1ee7",
        //     name: "no Name",
        //     path: "/def", // папка
        //     grade: 0, // средняя оценка карточек
        //     shots: 0,// количество попыток
        //     rating: 0, // лайки
        //     type: "pack",// ещё будет "folder" (папка)
        //     created: "2020-05-09T15:40:40.339Z",
        //     updated: "2020-05-09T15:40:40.339A",
        //     __v: 0
        // }
    ] as Array<Pack>
    // cardPacksTotalCount: 14, // количество колод
    // maxGrade: 4.824320858778307,
    // minGrade: 0,
    // page: 1, // выбранная страница
    // pageCount: 4 ,// количество элементов на странице
    // token: "572e99e0-9439-11ea-a15d-c9ae497710ee",
    // tokenDeathTime: 1589289258495
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