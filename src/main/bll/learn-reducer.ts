import {Dispatch} from "redux";
import {learnsApi} from "../dal/api-learn";
import {CardType} from "../dal/api-cards";

const UPDATE_GRADE_SUCCESS = "UPDATE-GRADE-SUCCESS";
const UPDATE_GRADE_ERROR = "UPDATE-GRADE-ERROR";
const GET_CARD_TO_SHOW = "GET-CARD-TO-SHOW";

const initialState = {
    updateGradeSuccess: false,
    isError: false,
    cardToShow: {
        answer: "",
        question: "",
        cardsPack_id: "",
        grade: 0,
        rating: 0,
        shots: 0,
        type: "",
        created: "",
        updated: "",
        __v: 0,
        _id: "",
    }
};

type initialStateType = typeof initialState;

export const learnReducer = (state: initialStateType = initialState, action: LearnActionType): initialStateType => {
    switch (action.type) {
        case UPDATE_GRADE_SUCCESS:
            return {...state, updateGradeSuccess: action.success};
        case UPDATE_GRADE_ERROR:
            return {...state, isError: action.isError};
        case GET_CARD_TO_SHOW:
            return {...state, cardToShow: action.cardToShow};
        default:
            return state;
    }
};

type LearnActionType = SetGradeSuccessType | SetGradeErrorType | GetCardToShowSuccessType;

type SetGradeSuccessType = { type: typeof UPDATE_GRADE_SUCCESS; success: boolean };
export const setGradeSuccess = (success: boolean): SetGradeSuccessType => ({type: UPDATE_GRADE_SUCCESS, success});

type SetGradeErrorType = { type: typeof UPDATE_GRADE_ERROR; isError: boolean };
export const setGradeError = (isError: boolean): SetGradeErrorType => ({type: UPDATE_GRADE_ERROR, isError});

type GetCardToShowSuccessType = { type: typeof GET_CARD_TO_SHOW; cardToShow: CardType };
export const getCardToShowSuccess = (cardToShow: CardType): GetCardToShowSuccessType => ({
    type: GET_CARD_TO_SHOW,
    cardToShow
});

export const setGrade = (cardId: string, grade: number) => (dispatch: Dispatch<LearnActionType>) => {
    learnsApi.setGrade(cardId, grade)
        .then(res => {
            dispatch(setGradeSuccess(true));
            document.cookie = `token=${res.token}`;
        })
        .catch(() => dispatch(setGradeError(true)));
};
