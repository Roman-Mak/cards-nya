import {loginApi, UserLoginType} from "../dal/api-login";
import {Dispatch} from "redux";

const USER_LOGIN = "USER-LOGIN";
const SET_ERROR = "SET-ERROR";
const SET_IS_AUTH = "SET-IS-AUTH";

const initialState = {
    email: "",
    name: "",
    token: "",
    error: "",
    isAuth: false
};

type initialStateType = typeof initialState;


const loginReducer = (state: initialStateType = initialState, action: LoginActionType): initialStateType => {
    switch (action.type) {
        case USER_LOGIN:
            return {...state, ...action.userData};
        case SET_ERROR:
            return {...state, error: action.error};
        case SET_IS_AUTH:
            return {...state, isAuth: action.isAuth};
        default:
            return state;
    }
};


type LoginActionType = UserLoginSuccessType | SetErrorType | SetIsAuthType;

type UserDataType = {
    email: string;
    name: string;
    token: string;
}
type UserLoginSuccessType = { type: typeof USER_LOGIN; userData: UserDataType };
const userLoginSuccess = (userData: UserDataType): UserLoginSuccessType => ({type: USER_LOGIN, userData});

type SetErrorType = { type: typeof SET_ERROR; error: string };
const setError = (error: string): SetErrorType => ({type: SET_ERROR, error});

type SetIsAuthType = {type: typeof SET_IS_AUTH; isAuth: boolean};
const setIsAuth = (isAuth: boolean): SetIsAuthType => ({type: SET_IS_AUTH, isAuth});

export const userLogin = (userLoginData: UserLoginType) => (dispatch: Dispatch<LoginActionType>) => {
    loginApi.userLogin(userLoginData)
        .then(res => {
            if (res.success) {
                dispatch(userLoginSuccess({
                    email: res.email,
                    name: res.name,
                    token: res.token
                }));
                dispatch(setIsAuth(true));
            }
        })
        .catch(res => {
            dispatch(setError(res.response.data.error));
            dispatch(setIsAuth(false));
        })
};

export default loginReducer;