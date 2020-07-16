import axios from "axios";

const instance = axios.create({
    baseURL: "https://cards-nya-back.herokuapp.com/1.0"
});

export type CardType = {
    answer: string;
    question: string;
    cardsPack_id: string;
    grade: number;
    rating: number;
    shots: number;
    type: string;
    created: string;
    updated: string;
    __v: number;
    _id: string;
}

type CardsResponseType = {
    cards: Array<CardType>;
    cardsTotalCount: number;
    maxGrade: number;
    minGrade: number;
    page: number;
    pageCount: number;
    token: string;
    tokenDeathTime: number;
}

export const getCardsApi = {
    getCards(id: string) {
        return instance.get<CardsResponseType>(`/cards/card?cardsPack_id=${id}&${document.cookie}`).then(res => res.data)
    }
};