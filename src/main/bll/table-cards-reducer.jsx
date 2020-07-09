import {apiTableCards} from "../dal/api-table-cardsr";

const LOADING_DECK_OF_CARDS = "cards-nya/auth/LOADING_DECK_OF_CARDS";

const initialState={
    cardPacks: [
        {
            _id: "5eb6cef840b7bf1cf0d8122d",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "no Name",
            path: "/def", // папка
            grade: 0, // средняя оценка карточек
            shots: 0,// количество попыток
            rating: 0, // лайки
            type: "pack",// ещё будет "folder" (папка)
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339B",
            __v: 0
        },
        {
            _id: "5eb6cef840b7bf1cf0d812d",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "no Name",
            path: "/def", // папка
            grade: 0, // средняя оценка карточек
            shots: 0,// количество попыток
            rating: 0, // лайки
            type: "pack",// ещё будет "folder" (папка)
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339A",
            __v: 0
        }
    ],
    cardPacksTotalCount: 14, // количество колод
    maxGrade: 4.824320858778307,
    minGrade: 0,
    page: 1, // выбранная страница
    pageCount: 4 ,// количество элементов на странице
    token: "572e99e0-9439-11ea-a15d-c9ae497710ee",
    tokenDeathTime: 1589289258495
};


const loadingDeckOfCardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_DECK_OF_CARDS: {
            return {...state, ...action.deckOfCards}
        }
        default:
            return state;
    }
};

const loadingLoadingTableCardsAC = (deckOfCards) => ({type: LOADING_DECK_OF_CARDS , deckOfCards});


export const LoadingTableCards = () => (dispatch) => {
     return apiTableCards.loadingCardsPack()
        .then(res => {
            debugger
            const action = loadingLoadingTableCardsAC(res.data.cardPacks);
            dispatch(action)
        })

};
export default loadingDeckOfCardsReducer;