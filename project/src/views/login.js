import {html} from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/auth.js';

const loginTemplate = (onLogin) => html`
<div class="login">
        <section class="login-section card-section">
            <h2 class="login-title">Login</h2>
            <form class="login-form" @submit = ${onLogin}>
                <input class="input" type="text" name="email" id="email" placeholder="email">
                <input class="input" type="password" name="password" id="password" placeholder="password">
                <button type="submit" class="login-button profile-button">Login</button>
            </form>
            <p class="form-message">Don't have profile? <a href="">Register</a></p>
        </section>
</div>
`;

export async function showLogin(ctx){
    ctx.render(loginTemplate(onLogin));
    
    async function onLogin(event){
        event.preventDefault();

        let formData = new FormData(event.target);
        let email = formData.get('email');
        let password = formData.get('password');

        if( !email || email.length ==0 || !password || password.length ==0){
            alert("Please complete all required fields.");
            return;
        }

        try{
            await login(email, password);
            ctx.page.redirect("/");

        }catch(err){
            alert(err.message);
            throw err;
        }
        
    }
}