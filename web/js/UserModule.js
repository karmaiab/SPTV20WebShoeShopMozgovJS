import {viewModule} from './ViewModule.js';
class UserModule{
    

      
    buyModel(){
        const id = document.getElementById('id').textContent;
        const buyModel = {
            "id":id
        };
        let promiseBuyModel = fetch('buyModel',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(buyModel)
        });
        promiseBuyModel.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  sessionStorage.setItem('user',JSON.stringify(response.user));
                                  document.getElementById('info').innerHTML = response.info;
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Server Error (buyModel)"+error;
                          });
    }
    editAccount(){
        const authUser = JSON.parse(sessionStorage.getItem('user'));
        const newFirstname = document.getElementById('newFirstname').value;
        const newLastname = document.getElementById('newLastname').value;
        const newPhone = document.getElementById('newPhone').value;
        const changeUser = {
            "id": authUser.id,
            "newFirstname": newFirstname,
            "newLastname": newLastname,
            "newPhone": newPhone
        };
        let promiseEditAccount = fetch('editAccount',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(changeUser)
        });
        promiseEditAccount.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  sessionStorage.setItem('user',JSON.stringify(response.user));
                                  viewModule.showProfile();
                                  document.getElementById('info').innerHTML = response.info;
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Server Error (editProfile)"+error;
                          });
    }
    addMoney(){
        const authUser = JSON.parse(sessionStorage.getItem('user'));
        const newMoney = document.getElementById('newMoney').value;
        const addMoney = {
            "id": authUser.id,
            "newMoney": newMoney
        };
        let promiseAddMoney = fetch('addMoney',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(addMoney)
        });
        promiseAddMoney.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  sessionStorage.setItem('user',JSON.stringify(response.user));
                                  viewModule.showProfile();
                                  document.getElementById('info').innerHTML = response.info;
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Server Error (addMoney)"+error;
                          });
    }
    
    getListModel(){
        let promiseGetListModel = fetch('getListModel',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include'
        });
        promiseGetListModel.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('info').innerHTML = response.info;
                                  viewModule.showListModel(response.listModel);
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Server Error  (getListModel)"+error;
                          });
    }
    editPassword(){
        const authUser = JSON.parse(sessionStorage.getItem('user'));
        const newPassword1 = document.getElementById('newPassword1').value;
        const newPassword2 = document.getElementById('newPassword2').value;
        if(newPassword1 !== newPassword2){
            document.getElementById('info').innerHTML = 'Passwords do not match!';
            return;
        }
        const editPassword = {
            "id": authUser.id,
            "newPassword1": newPassword1,
            "newPassword2": newPassword2
        };
        let promiseEditPassword = fetch('editPassword',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(editPassword)
        });
        promiseEditPassword.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  sessionStorage.setItem('user',JSON.stringify(response.user));
                                  viewModule.showProfile();
                                  document.getElementById('info').innerHTML = response.info;
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Server Error (addMoney)"+error;
                          });
    }
}
const userModule = new UserModule();
export {userModule};


