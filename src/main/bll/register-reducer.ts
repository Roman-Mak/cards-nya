
const initialState = {};

type initialStateType = typeof initialState;

const registerReducer = (state: initialStateType = initialState, action:any): initialStateType => {
    switch (action.type) {

    }
    return state;
};

export default registerReducer;