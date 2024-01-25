import {html, render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { getUserData } from './utils.js';

let navTemplate = ()=> html`
 <div class="logo-container">
            <img src="images/logo.jpg" alt="Logo" class="logo">
    </div>

    <nav class="nav">
        <ul class="navigation" role="list">
            <li class="nav-li"><a class="nav-btn" href="/">Home</a></li>
            <li class="nav-li"><a class="nav-btn" href="/catalog">Catalog</a></li>
            <li class="nav-li"><a class="nav-btn" href="/mybooks">My Books</a></li>
            <li class="nav-li"><a class="nav-btn" href="/create">Add Book</a></li>
            <li class="nav-li"><a class="nav-btn" href="login">Login</a></li>
            <li class="nav-li"><a class="nav-btn" href="/register">Register</a></li>
            <li class="nav-li"><a class="nav-btn" href="">Logout</a></li>
        </ul>
    </nav>`

function decorateCtx(ctx, next){
    ctx.render = function(content){
        render(content, document.querySelector('main'));
    }
    next();
}

function sesstion(ctx, next){
    let user = getUserData();
    if(user){
        ctx.user = user;
    };
    next();
}

function updateNav(ctx, next){
    render(navTemplate(ctx.user), document.querySelector('header'));
    next();
}


page(decorateCtx);
page(sesstion);
page(updateNav);

page.start();