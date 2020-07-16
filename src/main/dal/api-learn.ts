import axios from "axios";

const instance = axios.create({
    baseURL: "https://cards-nya-back.herokuapp.com/1.0"
});

type SetGradeResponseType = {
    updatedGrade: {
        _id: string;
        cardsPack_id: string;
        card_id: string;
        user_id: string;
        grade: number;
        shots: number;
    },
    token: string;
};

export const learnsApi = {
    setGrade(cardId: string, grade: number) {
        return instance.put<SetGradeResponseType>(`/cards/grade`, {
            token: document.cookie.split("=")[1],
            grade,
            card_id: cardId
        }).then(res => res.data)
    }
};