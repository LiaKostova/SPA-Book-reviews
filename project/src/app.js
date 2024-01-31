import {html, render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { logout } from './api/auth.js';
import { clearUserData, getUserData } from './utils.js';
import { showCatalog } from './views/catalog.js';
import { showHome } from './views/homePage.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';

let navTemplate = (user)=> html`
 <div class="logo-container">
            <img src="images/logo.jpg" alt="Logo" class="logo">
    </div>

    <nav class="nav">
        <ul class="navigation" role="list">
            <li class="nav-li"><a class="nav-btn" href="/">Home</a></li>
            <li class="nav-li"><a class="nav-btn" href="/catalog">Catalog</a></li>
            ${user
            ? html`
            <li class="nav-li"><a class="nav-btn" href="/mybooks">My Books</a></li>
            <li class="nav-li"><a class="nav-btn" href="/create">Add Book</a></li>           
            <li class="nav-li"><a class="nav-btn" href="" @click=${onLogout}>Logout</a></li>`
            : html` 
            <li class="nav-li"><a class="nav-btn" href="/login">Login</a></li>
            <li class="nav-li"><a class="nav-btn" href="/register">Register</a></li>`}
            
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

function onLogout(){
    logout();
    clearUserData();
}


page(decorateCtx);
page(sesstion);
page(updateNav);

page('/login', showLogin);
page('/', showHome);
page('/register', showRegister);
page('/catalog', showCatalog)

page.start();