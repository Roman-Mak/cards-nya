import axios from "axios";


const baseURL = `https://cards-nya-back.herokuapp.com/1.0/`;
const instance = axios.create({
    baseURL: baseURL
});


export const apiTableCards = {
    loadingCardsPack() {
        return instance.get(`cards/pack?&+`)
    }
};
