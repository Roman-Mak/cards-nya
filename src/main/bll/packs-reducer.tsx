import {apiTablePacks, Pack} from "../dal/api-table-packs";
import {Dispatch} from "redux";

const LOADING_PACKS_OF_CARDS = "cards-nya/packs/LOADING_PACKS_OF_CARDS";
const ADD_NEW_PACK = "cards-nya/packs/ADD_NEW_PACK";


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

type CommonPacksType =
    LoadingTableCardsType
    | AddNewPackType


const packsOfCardsReducer = (state: initialStateType = initialState, action: any):initialStateType => { //////исправить action!!!!
    switch (action.type) {
        case LOADING_PACKS_OF_CARDS: {
            return {
                ...state,
                cardPacks: action.allPacksCards
            }
        }
        case ADD_NEW_PACK: {
            debugger
            return {
                ...state,
                cardPacks: [action.NewPack, ...state.cardPacks]
            }
        }

        default:
            return state;
    }
};

type LoadingTableCardsType = {
    type: string
    allPacksCards: Array<Pack>
}
type AddNewPackType = {
    type: string
    NewPack: Pack
}


const loadingTableCardsAC = (allPacksCards: Array<Pack>): LoadingTableCardsType => ({
    type: LOADING_PACKS_OF_CARDS,
    allPacksCards
});
const addNewPackAC = (NewPack: Pack): AddNewPackType => ({
    type: ADD_NEW_PACK,
    NewPack});


export const LoadingPacksCards = () => (dispatch: Dispatch) => {
    return apiTablePacks.loadingCardsPack()
        .then(res => {
            dispatch(loadingTableCardsAC(res.data.cardPacks));
            document.cookie = `token=${res.data.token}`;
        })
};
export const AddPacksCards = (newPack: string) => (dispatch: Dispatch) => {
    return apiTablePacks.addCardsPack(newPack)
        .then(res => {
            debugger
            dispatch(addNewPackAC(res.data.newCardsPack));
            document.cookie = `token=${res.data.token}`;
        })
};
export default packsOfCardsReducer;