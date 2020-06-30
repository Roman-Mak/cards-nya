import axios from "axios";

const baseURL =  `https://cards-nya-back.herokuapp.com/1.0/`;
const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});


export const api ={
    addNewUser (title:string) {
        return  instance.post(`todo-lists`,
            {title})

}
};
