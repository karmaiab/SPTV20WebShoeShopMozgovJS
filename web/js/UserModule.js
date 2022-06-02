import {viewModule} from './ViewModule.js';
import {loginModule} from './LoginModule.js';
import {adminModule} from './AdminModule.js';

class UserModule{
    sendNewModel(){
        let promiseSentAccount = fetch('addNewModel',{
            method: 'POST',
            body: new FormData(document.getElementById('form_add_model'))
        });
        promiseSentAccount.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('info').innerHTML = response.info;
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Ошибка сервера (showAddModel)"+error;
                          })
    }
    getListModel(){
        let promiseSentAccount = fetch('getListModel',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
        });
        promiseSentAccount.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('info').innerHTML = response.info;
                                  viewModule.showListModel(response.Model)
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Ошибка сервера (getListModel)"+error;
                          })
    }
}

const userModule = new UserModule();
export {userModule};