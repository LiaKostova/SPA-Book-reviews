import {html} from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/auth.js';

const registerTemplate = (onRegister) => html`
 <div class="register">
             <section class="register-section card-section">
                <h2 class="register-title">Register</h2>
                <form class="register-form" @submit=${onRegister}>
                    <input class="input" type="text" name="email" id="register-email" placeholder="email">
                    <input class="input" type="password" name="password" id="register-password" placeholder="password">
                    <input class="input" type="password" name="re-password" id="re-password" placeholder="repeat the password">
                    <button type="submit" class="login-button profile-button">Register</button>
                 </form>
                 <p class="form-message">Already have a profile? <a href="">Login</a></p>
              </section>
        </div>
`;

export async function showRegister(ctx){
    ctx.render(registerTemplate(onRegister));
    
    async function onRegister(event){
        event.preventDefault();

        let formData = new FormData(event.target);
        let email = formData.get('email');
        let password = formData.get('password');
        let repass = formData.get('re-password')

        if( !email || email.length ==0 || !password || password.length ==0 || !repass || repass.length ==0){
            alert("Please complete all required fields.");
            return;
        }

        if(password !== repass){
            alert("Your password and re-password don't match!")
        }

        try{
            await register(email, password);
            ctx.page.redirect("/");

        }catch(err){
            alert(err.message);
            throw err;
        }
        
    }
}