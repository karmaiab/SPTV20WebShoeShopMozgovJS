import {viewModule} from './ViewModule.js';
import {loginModule} from './LoginModule.js';
import {adminModule} from './AdminModule.js';


class UserModule{
    sendNewAccountData(){
        let promiseSentAccount = fetch('addNewAccount',{
            method: 'POST',
            body: new FormData(document.getElementById('form_add_accound'))
        });
        promiseSentAccount.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('info').innerHTML = response.info;
                                  userModule.getListAccountData();
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Ошибка сервера (showAddAccountForm)"+error;
                          })
    }
    getListAccountData(){
        const user = JSON.parse(sessionStorage.getItem('user'));
        if(user === null){
            document.getElementById('content').innerHTML = '';
            document.getElementById('info').innerHTML = 'Авторизуйтесь!';
            viewModule.showLoginForm();
            return;
        }
        
        let promiseGetListAccountData = fetch('getListAccountData?userId='+user.id+'&t='+Date.now(),{
            method: 'GET',
        });
        promiseGetListAccountData.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('info').innerHTML = response.info;
                                  viewModule.showListAccountsData(response.listAccountData);
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Ошибка сервера (showAddAccountForm)"+error;
                          })
    }
}

const userModule = new UserModule();
export {userModule};