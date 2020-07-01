import axios from "axios";

const instance = axios.create({
    baseURL: "https://cards-nya-back.herokuapp.com/1.0/auth"
});

export type UserLoginType = {
    email: string;
    password: string;
    rememberMe: boolean;
};

type UserDataResponse = {
    email: string;
    name: string;
    isAdmin: boolean;
    rememberMe: boolean;
    token: string;
    tokenDeathTime: number;
    __v: number;
    _id: string;
    success: boolean;
    error: string;
};

export const loginApi = {
    userLogin(userData: UserLoginType) {
        return instance.post<UserDataResponse>("/login", userData).then(res => res.data)
    }
};