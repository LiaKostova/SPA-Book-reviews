import {html} from '../../node_modules/lit-html/lit-html.js';

export let bookPreview = (book) => html`
<li class="catalog-li">
     <h3 class="li-title">${book.title}</h3>
     <p class="li-type">Type: ${book.type}</p>
     <img src=${book.imageUrl} alt="Book cover">
     <a class="li-btn" href="/details/${book._id}">Details</a>
</li>
`