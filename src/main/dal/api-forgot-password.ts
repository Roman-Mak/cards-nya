import axios from "axios";

const instance = axios.create({
    baseURL: "https://cards-nya-back.herokuapp.com/1.0/auth"
});

export type ResetPassType = {
    email: string;
    html1: string;
    html2: string;
};

export const forgotPassApi = {
    resetPass(resetPassData: ResetPassType) {
        return instance.post<{success: boolean}>("/forgot", resetPassData).then(res => res.data)
    }
};