import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import profileReducer from "./profile-reducer";
import loginReducer from "./login-reducer";
import registerReducer from "./register-reducer";
import forgotPasswordReducer from "./forgot-password-reducer";
import packsOfCardsReducer from "./packs-reducer";
import cardsReducer from "./cards-reducer";
import {learnReducer} from "./learn-reducer";

const rootReducer = combineReducers({
    profile: profileReducer,
    login: loginReducer,
    register: registerReducer,
    forgotPassword: forgotPasswordReducer,
    packsOfCards: packsOfCardsReducer,
    cards: cardsReducer,
    learn: learnReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;