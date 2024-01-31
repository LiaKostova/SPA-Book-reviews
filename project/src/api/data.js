import * as api from './api.js';


export async function getAllBooks(){
    return api.get('/data/books?sortBy=_createdOn%20desc');
}

export async function createBook(book){
    return api.post('/data/books', book)
}