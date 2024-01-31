import * as api from './api.js';


export async function getAllBooks(){
    return api.get('/data/books?sortBy=_createdOn%20desc');
}

export async function createBook(book){
    return api.post('/data/books', book)
}

export async function getMyBooks(userId){
    return api.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function getTheBook(bookId){
    return api.get(`/data/books/${bookId}`);
}

export async function deleteBook(bookId){
    return api.del('/data/books/' + bookId);
}

export async function editBookInfo(bookId, data){
    return api.put('/data/books/' +bookId, data)
}