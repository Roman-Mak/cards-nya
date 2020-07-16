import { Dispatch } from "redux";
import {learnsApi} from "../dal/api-learn";

const UPDATE_GRADE_SUCCESS = "UPDATE-GRADE-SUCCESS";

const initialState = {
    updateGradeSuccess: false
};

type initialStateType = typeof initialState;

export const learnReducer = (state: initialStateType = initialState, action: SetGradeSuccessType): initialStateType => {
    switch (action.type) {
        case UPDATE_GRADE_SUCCESS:
            return {...state, updateGradeSuccess: action.success};
        default:
            return state;
    }
};

type LearnActionType = SetGradeSuccessType;

type SetGradeSuccessType = {type: typeof UPDATE_GRADE_SUCCESS; success: boolean};
const setGradeSuccess = (success: boolean): SetGradeSuccessType => ({type: UPDATE_GRADE_SUCCESS, success});

export const setGrade = (cardId: string, grade: number) => (dispatch: Dispatch<LearnActionType>) => {
    learnsApi.setGrade(cardId, grade)
        .then(res => {
            dispatch(setGradeSuccess(true));
            document.cookie = `token=${res.token}`;
        })
        .catch(res => console.log(res));
};
