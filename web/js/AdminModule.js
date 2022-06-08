
import {checkMenuPanel} from './app.js';
import {viewModule} from './ViewModule.js';

class AdminModule{
    getRoles(){
        let pormiseRoles = fetch('getRoles',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include'
        });
        pormiseRoles.then(response => response.json())
                    .then(response => {
                        if(response.status){
                            adminModule.insertSelectRoles(response.roles);
                        }else{
                            document.getElementById('info').innerHTML = 'Role list is empty!';
                        }
                    })
                    .catch(error =>{
                       document.getElementById('info').innerHTML = 'Server Error (getRoles): '+error;
                        
                    });
    }

    getUsersMap(){
        let promiseUsersMap = fetch('getUsersMap',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include'
        });
        promiseUsersMap.then(response => response.json())
                       .then(response => {
                           if(response.status){
                               adminModule.insertSelectUsers(response.usersMap);
                           }else{
                               document.getElementById('info').innerHTML = 'User list is empty!';
                           }
                       })
                       .catch(error => {
                           document.getElementById('info').innerHTML = 'Server Error (getUsersMap): '+error;
                       });
       
    }
    
   
    setNewRole(){
        const userId = document.getElementById('select_users').value;
        const roleId = document.getElementById('select_roles').value;
        const newUserRole = {
            "userId": userId,
            "roleId": roleId
        };
        let promiseSetUserRole = fetch('setUserRole',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(newUserRole)
        });
        promiseSetUserRole.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  let authUser = JSON.parse(sessionStorage.getItem('user'));
                                  if(response.user.id === authUser.id){
                                      sessionStorage.setItem('role',JSON.stringify(response.role));
                                      checkMenuPanel();
                                      return;
                                  }
                                  document.getElementById('info').innerHTML = response.info;
                                  adminModule.getUsersMap();
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = 'Server Error (setNewRole): '+error;
                          });
        
    }
    insertSelectUsers(usersMap){
        const select_users = document.getElementById('select_users');
        select_users.options.length = 0;
        for(let i=0; i < usersMap.length; i++){
            const option = document.createElement('option');
            option.value = usersMap[i].user.id;
            option.text = `${usersMap[i].user.login}. Role: ${usersMap[i].role}`;
            select_users.add(option);
        }
    };
    insertSelectRoles(roles){
        const select_roles = document.getElementById('select_roles');
        select_roles.options.length = 0;
        for(let i=0; i < roles.length; i++){
            const option = document.createElement('option');
            option.value = roles[i].id;
            option.text = roles[i].roleName;
            select_roles.add(option);
        };
    }

}
const adminModule = new AdminModule();
export {adminModule};

