import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import profileReducer from "./profile-reducer";
import loginReducer from "./login-reducer";
import registerReducer from "./register-reducer";
import forgotPasswordReducer from "./forgot-password-reducer";
import loadingDeckOfCardsReducer from "./table-cards-reducer";

const rootReducer = combineReducers({
    profile: profileReducer,
    login: loginReducer,
    register: registerReducer,
    forgotPassword: forgotPasswordReducer,
    loadingDeckOfCards:loadingDeckOfCardsReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;