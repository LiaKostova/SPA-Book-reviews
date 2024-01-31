import {html} from '../../node_modules/lit-html/lit-html.js';

let homeTemplate = () => html` <section class="home">
<div class="home-card card">           
    <div class="home-text-container">
        <p class="home-text"> <span class="address-h2">Dear friend,</span> <br>Welcome to the world of books. Here you will find the best literature works filled with adventure, magic, love, and mystery. See which are the most popular books. You can make your own book list - so that you can keep track of your book challenges and help other people immerse themselves in your favorite book worlds.
        </p>
    </div>
    <div class="home-img-container">
        <img src="/project/images/homepage.png" alt="Reading Books" class="home-img">
    </div>
</div>
</section>`;

export async function showHome(ctx){
    ctx.render(homeTemplate());
}