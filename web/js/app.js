import {viewModule} from './ViewModule.js';
import {loginModule} from './LoginModule.js';
import {userModule} from './UserModule.js';
import {adminModule} from './AdminModule.js';
import {managerModule} from './ManagerModule.js';

export{checkMenuPanel};

const menu_list_m = document.getElementById("menu_list_m");
menu_list_m.addEventListener("click",(e)=>{
    e.preventDefault();
    toggleActiveMenu(e.target.id);
    userModule.getListModel();
});

const menu_add_m = document.getElementById("menu_add_m");
menu_add_m.addEventListener("click", (e)=>{
    e.preventDefault();
    toggleActiveMenu(e.target.id);
    viewModule.showAddModel();
});

const menu_admin_panel = document.getElementById("menu_admin_panel");
menu_admin_panel.addEventListener("click",(e)=>{
    e.preventDefault();
    toggleActiveMenu(e.target.id);
    viewModule.showAdminPanelForm(adminModule.getUsersMap(), adminModule.getRoles());
});

const menu_edit_m = document.getElementById("menu_edit_m");
menu_edit_m.addEventListener("click", (e) =>{
    e.preventDefault();
    toggleActiveMenu(e.target.id);
    managerModule.getListModels();
});

const menu_login = document.getElementById("menu_login");
menu_login.addEventListener("click", (e) => {
    e.preventDefault();
    toggleActiveMenu(e.target.id);
    viewModule.showLoginForm();
});
const menu_logout = document.getElementById("menu_logout");
menu_logout.addEventListener("click",(e)=>{
    e.preventDefault();
    toggleActiveMenu(e.target.id);
    loginModule.sendLogout();
});


const menu_profile = document.getElementById("menu_profile");
menu_profile.addEventListener("click", (e)=>{
   e.preventDefault();
    toggleActiveMenu(e.target.id);
    viewModule.showProfile();
});


function toggleActiveMenu(selectedElementId){
    const listNavlinks = document.getElementsByClassName("nav-link");
    for(let i = 0; i < listNavlinks.length; i++){
        if(listNavlinks[i].id === selectedElementId){
           if(!listNavlinks[i].classList.contains("active")){
               listNavlinks[i].classList.add("active");
           }
        }else{
            if(listNavlinks[i].classList.contains("active")){
               listNavlinks[i].classList.remove("active");
            }
        }
    }
}

function checkMenuPanel(){
    let role = sessionStorage.getItem('role');
    if(role===null){
        if(document.getElementById('menu_list_m').classList.contains('d-none')){
            document.getElementById('menu_list_m').classList.remove('d-none');
        }
        if(!document.getElementById('menu_add_m').classList.contains('d-none')){
            document.getElementById('menu_add_m').classList.add('d-none');
        }
        if(!document.getElementById('menu_edit_m').classList.contains('d-none')){
            document.getElementById('menu_edit_m').classList.add('d-none');
        }
        if(!document.getElementById('menu_admin_panel').classList.contains('d-none')){
            document.getElementById('menu_admin_panel').classList.add('d-none');
        }
        if(!document.getElementById('menu_logout').classList.contains('d-none')){
            document.getElementById("menu_logout").classList.add('d-none'); 
        }
        if(document.getElementById('menu_login').classList.contains('d-none')){
            document.getElementById("menu_login").classList.remove('d-none');
        }
        if(!document.getElementById('menu_profile').classList.contains('d-none')){
            document.getElementById('menu_profile').classList.add('d-none');
        }

        return;
    }
    role = JSON.parse(role);
    if(role.roleName === 'USER'){
        if(document.getElementById('menu_list_m').classList.contains('d-none')){
            document.getElementById('menu_list_m').classList.remove('d-none');
        }
        if(!document.getElementById('menu_add_m').classList.contains('d-none')){
            document.getElementById('menu_add_m').classList.add('d-none');
        }
        if(!document.getElementById('menu_edit_m').classList.contains('d-none')){
            document.getElementById('menu_edit_m').classList.add('d-none');
        }
        if(!document.getElementById('menu_admin_panel').classList.contains('d-none')){
            document.getElementById('menu_admin_panel').classList.add('d-none');
        }
        if(document.getElementById('menu_logout').classList.contains('d-none')){
            document.getElementById("menu_logout").classList.remove('d-none'); 
        }
        if(!document.getElementById('menu_login').classList.contains('d-none')){
            document.getElementById("menu_login").classList.add('d-none');
        }
        if(document.getElementById('menu_profile').classList.contains('d-none')){
            document.getElementById('menu_profile').classList.remove('d-none');
        }

        return;
    }
    if(role.roleName === 'MANAGER'){
        if(document.getElementById('menu_list_m').classList.contains('d-none')){
            document.getElementById('menu_list_m').classList.remove('d-none');
        }
        if(document.getElementById('menu_add_m').classList.contains('d-none')){
            document.getElementById('menu_add_m').classList.remove('d-none');
        }
        if(document.getElementById('menu_edit_m').classList.contains('d-none')){
            document.getElementById('menu_edit_m').classList.remove('d-none');
        }
        if(!document.getElementById('menu_admin_panel').classList.contains('d-none')){
            document.getElementById('menu_admin_panel').classList.add('d-none');
        }
        if(document.getElementById('menu_logout').classList.contains('d-none')){
            document.getElementById("menu_logout").classList.remove('d-none'); 
        }
        if(!document.getElementById('menu_login').classList.contains('d-none')){
            document.getElementById("menu_login").classList.add('d-none');
        }
        if(document.getElementById('menu_profile').classList.contains('d-none')){
            document.getElementById('menu_profile').classList.remove('d-none');
        }

        return;
    }
    if(role.roleName === 'ADMINISTRATOR'){
        if(document.getElementById('menu_list_m').classList.contains('d-none')){
            document.getElementById('menu_list_m').classList.remove('d-none');
        }
        if(document.getElementById('menu_add_m').classList.contains('d-none')){
            document.getElementById('menu_add_m').classList.remove('d-none');
        }
        if(document.getElementById('menu_edit_m').classList.contains('d-none')){
            document.getElementById('menu_edit_m').classList.remove('d-none');
        }
        if(document.getElementById('menu_admin_panel').classList.contains('d-none')){
            document.getElementById('menu_admin_panel').classList.remove('d-none');
        }
        if(document.getElementById('menu_logout').classList.contains('d-none')){
            document.getElementById("menu_logout").classList.remove('d-none'); 
        }
        if(!document.getElementById('menu_login').classList.contains('d-none')){
            document.getElementById("menu_login").classList.add('d-none');
        }
        if(document.getElementById('menu_profile').classList.contains('d-none')){
            document.getElementById('menu_profile').classList.remove('d-none');
        }

        return;
    }
}
checkMenuPanel();