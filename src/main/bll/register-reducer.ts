import {Dispatch} from "redux";
import {apiRegister, NewUserType} from "../dal/api-register";

const REGISTER = "cards-nya/auth/REGISTER";

const initialState = {
    email: "",
    isAdmin: false,
    // __v: 1,
    _id: ""
};

type initialStateType = typeof initialState;
type addNewUserType = { type: string; addedUser: initialStateType };

const registerReducer = (state: initialStateType = initialState, action: addNewUserType): initialStateType => {
    switch (action.type) {
        case REGISTER: {
            return {...state, ...action.addedUser}
        }
        default:
            return state;
    }
};


const addNewUser = (addedUser: initialStateType): addNewUserType => ({type: REGISTER, addedUser});

export const NewUser = (newUserData: NewUserType) => (dispatch: Dispatch<addNewUserType>) => {
     apiRegister.addNewUser(newUserData)
        .then(res => {
            if (res.data.success === true) {
                dispatch(addNewUser(res.data.addedUser))
            } else {
                alert("some error")
            }
        })
        .catch(res => {
            alert("error")
        })
};
export default registerReducer;