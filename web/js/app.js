import {viewModule} from './ViewModule.js';
import {loginModule} from './LoginModule.js';
import {userModule} from './UserModule.js';

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
    viewModule.showAddAccountForm();
});

const menu_admin_panel = document.getElementById("menu_admin");
menu_admin_panel.addEventListener("click",(e)=>{
    e.preventDefault();
    toggleActiveMenu(e.target.id);
});

const menu_edit = document.getElementById("menu_edit");
menu_edit.addEventListener("click", (e) =>{
    e.preventDefault();
    toggleActiveMenu(e.target.id);
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
        if(!document.getElementById('menu_edit').classList.contains('d-none')){
            document.getElementById('menu_edit').classList.add('d-none');
        }
        if(!document.getElementById('menu_admin').classList.contains('d-none')){
            document.getElementById('menu_admin').classList.add('d-none');
        }
        if(!document.getElementById('menu_logout').classList.contains('d-none')){
            document.getElementById("menu_logout").classList.add('d-none'); //Спрятать выход
        }
        if(!document.getElementById('menu_login').classList.contains('d-none')){
            document.getElementById("menu_login").classList.remove('d-none');//Показать вход
        }
        return;
    }
    role = JSON.parse(role);
    if(role.roleName === 'USER'){
        if(document.getElementById('menu_add').classList.contains('d-none')){
            document.getElementById('menu_add').classList.remove('d-none');//Показать 
        }
        if(document.getElementById('menu_edit').classList.contains('d-none')){
            document.getElementById('menu_edit').classList.remove('d-none');//Показать 
        }
        if(!document.getElementById('menu_admin').classList.contains('d-none')){
            document.getElementById('menu_admin').classList.add('d-none');//Спрятать
        }
        if(document.getElementById('menu_logout').classList.contains('d-none')){
            document.getElementById("menu_logout").classList.remove('d-none'); //Показать выход
        }
        if(!document.getElementById('menu_login').classList.contains('d-none')){
            document.getElementById("menu_login").classList.add('d-none');//Спрятать вход
        }
        return;
    }
    if(role.roleName === 'ADMINISTRATOR'){
        if(document.getElementById('menu_add').classList.contains('d-none')){
            document.getElementById('menu_add').classList.remove('d-none');//Показать 
        }
        if(document.getElementById('menu_edit').classList.contains('d-none')){
            document.getElementById('menu_edit').classList.remove('d-none');//Показать 
        }
        if(document.getElementById('menu_admin').classList.contains('d-none')){
            document.getElementById('menu_admin').classList.remove('d-none');//Показать
        }
        if(document.getElementById('menu_logout').classList.contains('d-none')){
            document.getElementById("menu_logout").classList.remove('d-none'); //Показать выход
        }
        if(!document.getElementById('menu_login').classList.contains('d-none')){
            document.getElementById("menu_login").classList.add('d-none');//Спрятать вход
        }
        return;
    }
}
checkMenuPanel();