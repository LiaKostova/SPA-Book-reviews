import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllBooks } from '../api/data.js';
import {bookPreview} from './bookPreview.js';

let catalogTemplate = (books) => html `
<section class="catalog">

<div class="catalog-card card">
    <h1 class="catalog-title">All Books</h1>

    ${books.length == 0
    ? html ` <p class="no-books">Add the first book!</p>`
    : html `
    <ul class="catalog-ul" role="list">
        ${books.map(bookPreview)}     
    </ul>`}
</div>
</section>
`

export async function showCatalog(ctx){
    let books = await getAllBooks();
    ctx.render(catalogTemplate(books));
    

}
