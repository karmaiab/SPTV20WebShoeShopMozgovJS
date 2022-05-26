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
        const registration = document.getElementById('registration');
        registration.addEventListener('click', (e)=>{
            e.preventDefault();
            viewModule.showRegistrationForm();
        })
    }
    showAddAccountForm(){
        document.getElementById("info").innerHTML = '';
        const content = document.getElementById('content');
        content.innerHTML = 
            `<div class="card border-primary mb-3 mx-auto" style="max-width: 40rem;">
                <form id="form_add_accound">
                    <h3 class="card-header text-center my-3">Новая учетная запись</h3>
                    <div class="card-body">
                      <div class="form-group">
                        <label for="caption" class="form-label mt-4">Заголовок</label>
                        <input type="text" class="form-control" id="caption" name="caption" placeholder="Заголовок">
                      </div>
                      <div class="form-group">
                        <label for="url" class="form-label mt-4">URL</label>
                        <input type="text" class="form-control" id="url" name="url" placeholder="URL">
                      </div>
                      <div class="form-group">
                        <label for="login" class="form-label mt-4">Логин</label>
                        <input type="text" class="form-control" id="login" name="login" placeholder="Логин">
                      </div>
                      <div class="form-group">
                        <label for="password" class="form-label mt-4">Пароль</label>
                        <input type="password" class="form-control" id="password" name="password" placeholder="Пароль">
                      </div>
                      <div class="form-group">
                        <label for="imageFile" class="form-label mt-4">Изображение</label>
                        <input class="form-control" type="file" id="image_file" name="imageFile">
                      </div>  
                      <div class="w-100 text-center my-3">
                        <button type="submit" class="btn btn-primary my-3" id="btn_add_account">Добавить</button>
                      </div>
                    </div>
                </form>
            </div>`;
        document.getElementById('form_add_accound').addEventListener('submit',e=>{
            e.preventDefault();
            userModule.sendNewAccountData();
        });
    }
    showListAccountsData(listAccountData){
        let content = document.getElementById('content');
        content.innerHTML = "";
        let list = document.createElement('div');
        list.classList.add('d-flex');
        list.classList.add('justify-content-center');
        content.appendChild(list);
        for(let i = 0; i < listAccountData.length; i++){
            list.innerHTML +=  
            `<div class="card border-primary m-3 p-2" style="max-width: 18rem;">
                <h3 class="card-header text-center my-3">${listAccountData[i].caption}</h3>
                <a href="${listAccountData[i].url}" target="_blank">
                    <img src="insertFile/${listAccountData[i].pathToImage}" class="card-img-top" style="max-height: 20rem;" alt="...">
                </a>
                <div class="card-body">
                    <p class="card-text">Логин: ${listAccountData[i].login}</p>
                    <p class="card-text">Пароль: ${listAccountData[i].password}</p>
                </div>
            </div>`
        }
    }
    showRegistrationForm(){
        document.getElementById("info").innerHTML = '';
        const content = document.getElementById('content');
        content.innerHTML =`<div class="card border-primary mb-3 mx-auto" style="max-width: 30rem;">
                                <h3 class="card-header text-center">Новый пользователь</h3>
                                <div class="card-body">
                                  <div class="form-group">
                                    <label for="firstname" class="form-label mt-4">Name</label>
                                    <input type="text" class="form-control" id="firstname" placeholder="Name">
                                  </div>
                                  <div class="form-group">
                                    <label for="lastname" class="form-label mt-4">Lastname</label>
                                    <input type="text" class="form-control" id="lastname" placeholder="Lastname">
                                  </div>
                                  <div class="form-group">
                                    <label for="phone" class="form-label mt-4">Phone</label>
                                    <input type="text" class="form-control" id="phone" placeholder="Phone">
                                  </div>
                                  <div class="form-group">
                                    <label for="login" class="form-label mt-4">Login</label>
                                    <input type="text" class="form-control" id="login" placeholder="Login">
                                  </div>
                                  <div class="form-group">
                                    <label for="password1" class="form-label mt-4">Password</label>
                                    <input type="password" class="form-control" id="password1" placeholder="Password">
                                  </div>
                                  <div class="form-group">
                                    <label for="password2" class="form-label mt-4">Repeat Password</label>
                                    <input type="password" class="form-control" id="password2" placeholder="Repeat Password">
                                  </div>
                                </div>
                                <button type="submit" id="btn_registration" class="btn btn-primary m-3">Sign Up</button>
                            </div>`;
        const btnRegistration = document.getElementById('btn_registration');
        btnRegistration.addEventListener('click', (e)=>{
            e.preventDefault();
            loginModule.registrationNewUser();
        })
    }
}
const viewModule = new ViewModule();
export {viewModule};