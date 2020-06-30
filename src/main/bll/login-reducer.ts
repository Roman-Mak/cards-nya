import {loginApi, UserLoginType} from "../dal/api-login";
import {Dispatch} from "redux";

const USER_LOGIN = "USER-LOGIN";

const initialState = {
    email: "",
    name: "",
    token: ""
};

type initialStateType = typeof initialState;

const loginReducer = (state: initialStateType = initialState, action: userLoginSuccessType): initialStateType => {
    switch (action.type) {
        case USER_LOGIN: {
            return {...state, ...action.userData}
        }
        default:
            return state;
    }
};

type userLoginSuccessType = { type: string; userData: initialStateType };
const userLoginSuccess = (userData: initialStateType): userLoginSuccessType => ({type: USER_LOGIN, userData});

export const userLogin = (userLoginData: UserLoginType) => (dispatch: Dispatch<userLoginSuccessType>) => {
    loginApi.userLogin(userLoginData)
        .then(res => {
            if (res.success) {
                dispatch(userLoginSuccess({
                    email: res.email,
                    name: res.name,
                    token: res.token
                }))
            }
        })
};

export default loginReducer;