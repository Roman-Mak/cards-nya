import {Dispatch} from "redux";
import {forgotPassApi} from "../dal/api-forgot-password";

const RESET_PASSWORD = "USER-LOGIN";
const SET_ERROR = "SET-ERROR";

const initialState = {
    success: false,
    error: ""
};

type initialStateType = typeof initialState;

const forgotPasswordReducer = (state: initialStateType = initialState, action: ForgotPasswordActionType): initialStateType => {
    switch (action.type) {
        case RESET_PASSWORD:
            return {...state, success: action.success};
        case SET_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
};

type ForgotPasswordActionType = ResetPasswordSuccessType | SetErrorType;

type ResetPasswordSuccessType = { type: typeof RESET_PASSWORD; success: boolean };
const resetPasswordSuccess = (success: boolean): ResetPasswordSuccessType => ({type: RESET_PASSWORD, success});

type SetErrorType = { type: typeof SET_ERROR; error: string };
const setError = (error: string): SetErrorType => ({type: SET_ERROR, error});

export const resetPassword = (email: string) => (dispatch: Dispatch<ForgotPasswordActionType>) => {
    const resPassData = {
        email,
        html1: "<a href='http://localhost:3000/cards-nya#/forgot-password/'",
        html2: ">reset-password</a>"
    };
    forgotPassApi.resetPass(resPassData)
        .then(res => {
            if (res.success) {
                dispatch(resetPasswordSuccess(res.success));
            }
        })
        .catch(res => {
            dispatch(setError(res.response.data.error));
        })
};

export default forgotPasswordReducer;