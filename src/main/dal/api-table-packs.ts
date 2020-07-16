import axios from "axios";

const baseURL = `https://cards-nya-back.herokuapp.com/1.0/`;
const instance = axios.create({
    baseURL: baseURL
});

export type Pack = {
    _id: string
    user_id: string
    name: string
    path: string
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    updated: string
    __v: 0
}

export  type ResponsePacks = {
    cardPacks: Array<Pack>
    cardPacksTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type ResponseAddPacks ={
    newCardsPack: Pack
    success: boolean
    token: string
    tokenDeathTime: number
}

export type ResponseDeletePacks = {
    deletedCardsPack: Pack
    success: boolean
    token: string
    tokenDeathTime: number
}

export const apiTablePacks = {
    loadingCardsPack() {
        return instance.get<ResponsePacks>(`cards/pack?${document.cookie}&pageCount=40`)
    },
    addCardsPack(newPackName:string) {
        return instance.post<ResponseAddPacks>(`cards/pack`,{cardsPack:{
                name: newPackName
            },token:document.cookie.split("=")[1]
        })
    },
    deleteCardsPack(idPack:string) {
        return instance.delete<ResponseDeletePacks>(`cards/pack?${document.cookie}&id=${idPack}`)
    },
};
