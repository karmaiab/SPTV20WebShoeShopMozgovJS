import {checkMenuPanel} from './app.js';
import {viewModule} from './ViewModule.js';
import {userModule} from './UserModule.js';

class LoginModule{
    sendCredential(){
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const credential = {
        "login": login,
        "password": password
    };
    let promise = fetch('login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset:utf8'
        },
        credentials: 'include',
        body: JSON.stringify(credential)
    });
    promise.then(response=> response.json())
       .then(response =>{
           if(response.auth){
               document.getElementById('info').innerHTML = response.info;
               sessionStorage.setItem('token',JSON.stringify(response.token));
               sessionStorage.setItem('user',JSON.stringify(response.user));
               sessionStorage.setItem('role',JSON.stringify(response.role));
               checkMenuPanel();
               userModule.getListAccountData();
           }else{
               checkMenuPanel();
               document.getElementById('info').innerHTML = response.info;
           }
       })
       .catch( error =>{
           document.getElementById('info').innerHTML = "Ошибка запроса (sendCredential): "+error
           document.getElementById('content').innerHTML = "";
       });
 }
 sendLogout(){
     let promise = fetch('logout', {
         method: 'GET',
     });
     promise.then(response => response.json())
             .then(response => {
                 if(!response.auth){
                     if(sessionStorage.getItem('token')!== null){
                        sessionStorage.removeItem('token');
                     }
                     if(sessionStorage.getItem('user')!== null){
                        sessionStorage.removeItem('user');
                     }
                     if(sessionStorage.getItem('role')!== null){
                        sessionStorage.removeItem('role');
                     }
                    checkMenuPanel();
                    document.getElementById('info').innerHTML = response.info;
                    viewModule.showLoginForm();
                 }
     })
     
 }
}

const loginModule = new LoginModule();
export {loginModule};