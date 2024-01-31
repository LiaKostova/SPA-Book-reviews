import { getUserData } from "../utils.js";
import {html} from '../../node_modules/lit-html/lit-html.js';
import { getMyBooks } from "../api/data.js";
import {bookPreview} from './bookPreview.js';

let mybooksTemplate = (books) => html`
  <section class="my-books">
    <div class="my-books-card card">
      <h1 class="my-books-title">My Books</h1>

      <ul class="my-books-ul" role="list">
        <li class="my-books-li">
        ${books.length == 0
        ? html` <p class="no-books">Add the first book!</p>`
        : html` 
            <ul class="mybooks-ul" role="list">
            ${books.map(bookPreview)}`
        }
        </li>
      </ul>   
    </div>
  </section>
`;

export async function showMyBooks(ctx){
    let userData = getUserData();
  
    let books = await getMyBooks(userData._id);
    console.log(books)

    ctx.render(mybooksTemplate(books));
}
