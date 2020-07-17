import {apiTablePacks, Pack} from "../dal/api-table-packs";
import {Dispatch} from "redux";
import {resolveAny} from "dns";

const LOADING_PACKS_OF_CARDS = "cards-nya/packs/LOADING_PACKS_OF_CARDS";
const ADD_NEW_PACK = "cards-nya/packs/ADD_NEW_PACK";
const DELETE_PACK = "cards-nya/packs/DELETE_PACK";
const CHANGE_PACK_NAME = "cards-nya/packs/CHANGE_PACK_NAME";


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

// reducer

const packsOfCardsReducer = (state: initialStateType = initialState, action: any): initialStateType => { //////исправить action!!!!
    switch (action.type) {
        case LOADING_PACKS_OF_CARDS: {
            return {
                ...state,
                cardPacks: action.allPacksCards
            }
        }
        case ADD_NEW_PACK: {
            return {
                ...state,
                cardPacks: [action.NewPack, ...state.cardPacks]
            }
        }
        case DELETE_PACK: {
            return {
                ...state,
                cardPacks: state.cardPacks.filter(p => p._id !== action.DeletedPack._id)
            }
        }
        case CHANGE_PACK_NAME: {
            return {
                ...state,
                cardPacks: state.cardPacks.map(p => {
                    if (action.updatedCardsPack._id !== p._id) {
                        return p
                    } else return {...p, name: action.updatedCardsPack.name}
                })
            }
        }

        default:
            return state;
    }
};


// ActionCreators

type LoadingTableCardsType = {
    type: string
    allPacksCards: Array<Pack>
}
type AddNewPackType = {
    type: string
    NewPack: Pack
}
type ChangePackNameType = {
    type: string
    updatedCardsPack: Pack
}
type DeletedPackType = {
    type: string
    DeletedPack: Pack
}


const loadingTableCardsAC = (allPacksCards: Array<Pack>): LoadingTableCardsType => ({
    type: LOADING_PACKS_OF_CARDS,
    allPacksCards
});

const changePackNameAC = (updatedCardsPack: Pack): ChangePackNameType => ({
    type: CHANGE_PACK_NAME,
    updatedCardsPack
});

const addNewPackAC = (NewPack: Pack): AddNewPackType => ({
    type: ADD_NEW_PACK,
    NewPack
});

const deletePackAC = (DeletedPack: Pack): DeletedPackType => ({
    type: DELETE_PACK,
    DeletedPack
});


// Thunk
export const LoadingPacksCards = () => (dispatch: Dispatch) => {
    return apiTablePacks.loadingCardsPack()
        .then(res => {
            dispatch(loadingTableCardsAC(res.data.cardPacks));
            document.cookie = `token=${res.data.token}`;
        })
};

export const AddPackCard = (newPack: string) => (dispatch: Dispatch) => {
    return apiTablePacks.addCardsPack(newPack)
        .then(res => {
            dispatch(addNewPackAC(res.data.newCardsPack));
            document.cookie = `token=${res.data.token}`;
        })
};

export const ChangePackName = (changedPackName: string, id: string) => (dispatch: Dispatch) => {
    return apiTablePacks.changeCardsPackName(changedPackName, id)
        .then(res => {
            dispatch(changePackNameAC(res.data.updatedCardsPack));
            document.cookie = `token=${res.data.token}`;
        })
};

export const DeletePackCard = (idPack: string) => (dispatch: Dispatch) => {
    return apiTablePacks.deleteCardsPack(idPack)
        .then(res => {
            dispatch(deletePackAC(res.data.deletedCardsPack));
            document.cookie = `token=${res.data.token}`;
        })
};


export default packsOfCardsReducer;