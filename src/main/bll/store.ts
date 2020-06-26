import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";

const rootReducers = combineReducers({
    state: () => []
});

type RootReducerType = typeof rootReducers;
export type AppStateType = ReturnType<RootReducerType>;

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));

export default store;