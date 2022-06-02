import {viewModule} from './ViewModule.js';
import {loginModule} from './LoginModule.js';
import {userModule} from './UserModule.js';
import {adminModule} from './AdminModule.js';

export{checkMenuPanel};

const menu_list_pages = document.getElementById("menu_list_pages");
menu_list_pages.addEventListener("click",(e)=>{
    e.preventDefault();
    toggleActiveMenu(e.target.id);
    userModule.getListAccountData();
});

const menu_add = document.getElementById("menu_add");
menu_add.addEventListener("click", (e)=>{
    e.preventDefault();
    toggleActiveMenu(e.target.id);
    viewModule.showAddModel();
});

const menu_admin_panel = document.getElementById("menu_admin");
menu_admin_panel.addEventListener("click",(e)=>{
    e.preventDefault();
    toggleActiveMenu(e.target.id);
    viewModule.showAdminPanelForm(adminModule.getUsersMap(), adminModule.getRoles());
});

const menu_edit_m = document.getElementById("menu_edit_m");
menu_edit_m.addEventListener("click", (e) =>{
    e.preventDefault();
    toggleActiveMenu(e.target.id);
    viewModule.showEditModel();
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

const menu_buy = document.getElementById("menu_buy");
menu_buy.addEventListener("click", (e)=>{
   e.preventDefault();
    toggleActiveMenu(e.target.id);
});

const menu_profile = document.getElementById("menu_profile");
menu_profile.addEventListener("click", (e)=>{
   e.preventDefault();
    toggleActiveMenu(e.target.id);
});

const menu_edit_p = document.getElementById("menu_edit_p");
menu_edit_p.addEventListener("click", (e)=> {
    e.preventDefault();
    toggleActiveMenu(e.target.id);
    viewModule.showEditProfile();
})

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
        if(!document.getElementById('menu_add').classList.contains('d-none')){
            document.getElementById('menu_add').classList.add('d-none');
        }
        if(!document.getElementById('menu_edit_m').classList.contains('d-none')){
            document.getElementById('menu_edit_m').classList.add('d-none');
        }
        if(!document.getElementById('menu_admin').classList.contains('d-none')){
            document.getElementById('menu_admin').classList.add('d-none');
        }
        if(!document.getElementById('menu_logout').classList.contains('d-none')){
            document.getElementById("menu_logout").classList.add('d-none'); 
        }
        if(!document.getElementById('menu_login').classList.contains('d-none')){
            document.getElementById("menu_login").classList.remove('d-none');
        }
        if(!document.getElementById('menu_buy').classList.contains('d-none')){
            document.getElementById('menu_buy').classList.add('d-none');
        }
        if(!document.getElementById('menu_profile').classList.contains('d-none')){
            document.getElementById('menu_profile').classList.add('d-none');
        }
        if(!document.getElementById('menu_edit_p').classList.contains('d-none')){
            document.getElementById('menu_edit_p').classList.add('d-none');
        }
        return;
    }
    role = JSON.parse(role);
    if(role.roleName === 'USER'){
        if(!document.getElementById('menu_add').classList.contains('d-none')){
            document.getElementById('menu_add').classList.add('d-none');//Hide add oanel
        }
        if(!document.getElementById('menu_edit_m').classList.contains('d-none')){
            document.getElementById('menu_edit_m').classList.add('d-none');//Hide edit panel
        }
        if(!document.getElementById('menu_admin').classList.contains('d-none')){
            document.getElementById('menu_admin').classList.add('d-none');//Hide admin panel
        }
        if(document.getElementById('menu_logout').classList.contains('d-none')){
            document.getElementById("menu_logout").classList.remove('d-none'); //Show logout
        }
        if(!document.getElementById('menu_login').classList.contains('d-none')){
            document.getElementById("menu_login").classList.add('d-none');//Hide login
        }
        if(document.getElementById('menu_buy').classList.contains('d-none')){
            document.getElementById('menu_buy').classList.remove('d-none'); //Show buy menu
        }
        if(document.getElementById('menu_profile').classList.contains('d-none')){
            document.getElementById('menu_profile').classList.remove('d-none');//Show profile menu
        }
        if(!document.getElementById('menu_edit_p').classList.contains('d-none')){
            document.getElementById('menu_edit_p').classList.remove('d-none');//Hide edit profile menu
        }
        return;
    }
    if(role.roleName === 'ADMINISTRATOR'){
        if(document.getElementById('menu_add').classList.contains('d-none')){
            document.getElementById('menu_add').classList.remove('d-none');//Show add panel
        }
        if(document.getElementById('menu_edit_m').classList.contains('d-none')){
            document.getElementById('menu_edit_m').classList.remove('d-none');//Show edit panel
        }
        if(document.getElementById('menu_admin').classList.contains('d-none')){
            document.getElementById('menu_admin').classList.remove('d-none');//Show admin panel
        }
        if(document.getElementById('menu_logout').classList.contains('d-none')){
            document.getElementById("menu_logout").classList.remove('d-none'); //Show logout
        }
        if(!document.getElementById('menu_login').classList.contains('d-none')){
            document.getElementById("menu_login").classList.add('d-none');//Hide login
        }
        if(document.getElementById('menu_buy').classList.contains('d-none')){
            document.getElementById('menu_buy').classList.remove('d-none'); //Show buy menu
        }
        if(document.getElementById('menu_profile').classList.contains('d-none')){
            document.getElementById('menu_profile').classList.remove('d-none');//Show profile menu
        }
        if(document.getElementById('menu_edit_p').classList.contains('d-none')){
            document.getElementById('menu_edit_p').classList.remove('d-none');//Show edit profile menu
        }
        return;
    }
}
checkMenuPanel();