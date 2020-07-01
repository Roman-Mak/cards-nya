import axios from "axios";

const baseURL = `https://cards-nya-back.herokuapp.com/1.0/`;
const instance = axios.create({
    baseURL: baseURL,
});

export type NewUserType = {
    newEmail: string;
    repeatPassword: string;
}

type NewUserResponse = {
    addedUser: {
        email: string,
        isAdmin: boolean,
        __v: number,
        _id: string
    },
    success: true
}

export const apiRegister = {
    addNewUser(NewUser: NewUserType) {
        return instance.post<NewUserResponse>(`auth/register`, {NewUser})
    }
};
