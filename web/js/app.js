
const menu_list_pages = document.getElementById("menu_list_pages");
menu_list_pages.addEventListener("click",(e)=>{
    e.preventDefault();
    toggleActiveMenu(e.target.id);
})

const menu_add = document.getElementById("menu_add");
menu_add.addEventListener("click", (e)=>{
    e.preventDefault();
    toggleActiveMenu(e.target.id);
})

const menu_login = document.getElementById("menu_login");
menu_login.addEventListener("click", (e) => {
    e.preventDefault();
    toggleActiveMenu(e.target.id)
});
const menu_logout = document.getElementById("menu_logout");
menu_logout.addEventListener("click",(e)=>{
    e.preventDefault();
    toggleActiveMenu(e.target.id)
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
    
