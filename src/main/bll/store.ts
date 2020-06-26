import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import profileReducer from "./profile-reducer";
import loginReducer from "./login-reducer";
import registerReducer from "./register-reducer";

const rootReducer = combineReducers({
    profile: profileReducer,
    login: loginReducer,
    register: registerReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;