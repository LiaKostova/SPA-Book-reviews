import { getUserData } from "../utils.js";
import {html, nothing} from '../../node_modules/lit-html/lit-html.js';
import { deleteBook, getTheBook } from "../api/data.js";

let detailsTemplate = (book, isCreator, onDelete) => html `
     <section class="details">
        <div class="detail-basic-info">
            <h3 class="li-title">${book.title}</h3>
            <p class="li-type">Type: ${book.type}</p>
            <p class="li-cover"><img src="${book.imageUrl}" alt="Book cover"></p>
        </div>
       <div class="deatils-descrpition">
            <div class="descriptions-text">
                <p class="description">${book.description}</p>
            </div>

            ${isCreator
            ? html`
             <div class="descriptions-btns">
                <a href="" class="li-btn details-btn">Edit</a>
                <a href="" class="li-btn details-btn" @click=${onDelete}>Delete</a>
            </div> `
            :nothing}
                    
       </div>
      </section>
`;


export async function showDetails(ctx){
    let bookId = ctx.params.id;
    let theBook = await getTheBook(bookId);
    let ownerId =  theBook._ownerId;

    let userId = getUserData()?._id;

    let isCreator = false;
    if(ownerId == userId){
        isCreator = true;
    }


    ctx.render(detailsTemplate(book, isCreator, onDelete));


    async function onDelete(){
        let choice = confirm('Are you sure you want to delete this book?');

        if(choice){
            await deleteBook(bookId);
            ctx.page.redirect('/catalog');
        }
    }

}
