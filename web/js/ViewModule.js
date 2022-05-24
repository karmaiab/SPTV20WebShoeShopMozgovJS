import {loginModule} from './LoginModule.js';
import {userModule} from './UserModule.js';

class ViewModule{
    showLoginForm(){
        const content = document.getElementById('content');
        content.innerHTML = `<div class="card border-primary mb-3 mx-auto" style="max-width: 30rem;">
            <h3 class="card-header text-center">Авторизация</h3>
            <div class="card-body">
                <div class="form-group">
                    <label for="login" class="form-label mt-4">Логин</label>
                    <input type="text" class="form-control" id="login" placeholder="Login">
                </div>
                <div class="form-group">
                    <label for="password" class="form-label mt-4">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password">
                </div>
            </div>
            <button id="btnLogin" type="submit" class="btn btn-primary m-3">Sign in</button>
            <p class="info">No account? <a class="text-info" id="registration">Register</a></p>
        </div>`
        document.getElementById('password').addEventListener('keypress',(e)=>{
            if(e.key === 'Enter'){
                e.preventDefault();
                loginModule.sendCredential();
            }
        });
        const btnLogin = document.getElementById('btnLogin');
        btnLogin.addEventListener('click', (e)=>{
            e.preventDefault();
            loginModule.sendCredential();
        });
    }
}
const viewModule = new ViewModule();
export {viewModule};