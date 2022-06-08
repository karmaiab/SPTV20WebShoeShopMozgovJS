import {loginModule} from './LoginModule.js';
import {userModule} from './UserModule.js';
import {adminModule} from './AdminModule.js';
import {managerModule} from './ManagerModule.js';

class ViewModule{
    showLoginForm(){
        const content = document.getElementById('content');
        content.innerHTML = `<div class="card border-primary mb-3 mx-auto" style="max-width: 30rem;">
            <h3 class="card-header text-center">Authorization</h3>
            <div class="card-body">
                <div class="form-group">
                    <label for="login" class="form-label mt-4">Login</label>
                    <input type="text" class="form-control" id="login" placeholder="Login">
                </div>
                <div class="form-group">
                    <label for="password" class="form-label mt-4">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password">
                </div>
            </div>
            <button id="btnLogin" type="submit" class="btn btn-primary m-3">Sign in</button>
            <p class="info">No account? <a class="text-info" id="registration">Register</a></p>
        </div>`;
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
        });
    }
    showAddModel(){
        document.getElementById("info").innerHTML = '';
        const content = document.getElementById('content');
        content.innerHTML = 
            `<div class="card border-primary mb-3 mx-auto" style="max-width: 40rem;">
                <form id="form_add_model">
                    <h3 class="card-header text-center my-3">New Shoes</h3>
                    <div class="card-body">
                      <div class="form-group">
                        <label for="model" class="form-label mt-4">Model</label>
                        <input type="text" class="form-control" id="name" name="name" placeholder="Model">
                      </div>
                      <div class="form-group">
                        <label for="brand" class="form-label mt-4">Brand</label>
                        <input type="text" class="form-control" id="brand" name="brand" placeholder="Brand">
                      </div>
                      <div class="form-group">
                        <label for="size" class="form-label mt-4">Size</label>
                        <input type="text" class="form-control" id="size" name="size" placeholder="Size">
                      </div>
                      <div class="form-group">
                        <label for="price" class="form-label mt-4">Price</label>
                        <input type="text" class="form-control" id="price" name="price" placeholder="Price">
                      </div>
                      <div class="form-group">
                        <label for="quantity" class="form-label mt-4">In Stock</label>
                        <input type="text" class="form-control" id="quantity" name="quantity" placeholder="In Stock">
                      </div>
                      <div class="form-group">
                        <label for="imageFile" class="form-label mt-4">Image</label>
                        <input class="form-control" type="file" id="image_file" name="imageFile">
                      </div>  
                      <div class="w-100 text-center my-3">
                        <button type="submit" class="btn btn-primary my-3" id="btn_add_model">Add Model</button>
                      </div>
                    </div>
                </form>
            </div>`;
        
        document.getElementById('form_add_model').addEventListener('submit', (e)=>{
            e.preventDefault();
            managerModule.sendNewModel();
        });
        
    }
    
    showAdminPanelForm(){
        document.getElementById("info").innerHTML = '';
        const content = document.getElementById('content');
        content.innerHTML = 
            `<div class="card border-primary my-5 mx-auto" style="max-width: 30rem;">
                <h3 class="card-header text-center">Admin panel</h3>
                <div class="card-body">
                  <div class="form-group">
                    <label for="select_users" class="form-label mt-4">Users</label>
                    <select class="form-select" id="select_users" name="selectUsers">
                      
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="select_roles" class="form-label mt-4">Roles</label>
                    <select class="form-select" id="select_roles" name="selectRoles">
                      
                    </select>
                  </div>
                <button id="btnSetRole" type="submit" class="btn btn-primary m-3">Assign role</button>
            </div>`;
        
        document.getElementById('btnSetRole').addEventListener('click', (e)=>{
            e.preventDefault();
            adminModule.setNewRole();
        });
    }
    
    showListModel(listModel){
        let content = document.getElementById('content');
        content.innerHTML = "";
        let list = document.createElement('div');
        list.classList.add('d-flex');
        list.classList.add('justify-content-center');
        content.appendChild(list);
        for(let i = 0; i < listModel.length; i++){
            list.innerHTML +=  
            `<div class="card border-primary m-3 p-2" style="max-width: 18rem;">
                <h3 class="card-header text-center my-3">${listModel[i].name}</h3>
                <img src="insertFile/${listModel[i].pathToImage}" class="card-img-top" style="max-height: 20rem;" alt="...">
                <div class="card-body">
                    <p class="card-text invisible" id="id">${listModel[i].id}</p>
                    <p class="card-text">Brand: ${listModel[i].brand}</p>
                    <p class="card-text">Size: ${listModel[i].size}</p>
                    <p class="card-text">Quantity: ${listModel[i].quantity}</p>
                    <p class="card-text">Price: ${listModel[i].price}</p>
                </div>
            <button id="btn_buy_model" type="submit" class="btn btn-primary m-3">Buy</button>
            </div>`;
        const btn_buy_model = document.getElementById('btn_buy_model');
           btn_buy_model.addEventListener('click', (e)=>{
                e.preventDefault();
                userModule.buyModel();
        });
        }
    }
    showRegistrationForm(){
        document.getElementById("info").innerHTML = '';
        const content = document.getElementById('content');
        content.innerHTML =`<div class="card border-primary mb-3 mx-auto" style="max-width: 30rem;">
                                <h3 class="card-header text-center">New Account</h3>
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
        });
    }
    
    showEditModel(){
        document.getElementById("info").innerHTML = '';
        const content = document.getElementById('content');
        content.innerHTML = `<div class="card border-primary mb-3 mx-auto" style="max-width: 40rem;">
                <form id="form_edit_model">
                    <h3 class="card-header text-center my-3">Edit Model</h3>
                    <div class="card-body">
                      <div class="form-group">
                        <label for="exampleSelect1" class="form-label mt-4">Model</label>
                        <select class="form-select" id="select_models">
        
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="model" class="form-label mt-4">Model Name</label>
                        <input type="text" class="form-control" id="newName" placeholder="Model Name">
                      </div>
                      <div class="form-group">
                        <label for="brand" class="form-label mt-4">Brand</label>
                        <input type="text" class="form-control" id="newBrand" placeholder="Brand">
                      </div>
                      <div class="form-group">
                        <label for="size" class="form-label mt-4">Size</label>
                        <input type="text" class="form-control" id="newSize" placeholder="Size">
                      </div>
                      <div class="form-group">
                        <label for="price" class="form-label mt-4">Price</label>
                        <input type="text" class="form-control" id="newPrice" placeholder="Price">
                      </div>
                      <div class="form-group">
                        <label for="stock" class="form-label mt-4">Quantity</label>
                        <input type="text" class="form-control" id="newQuantity" placeholder="In Stock">
                      </div>
                      <div class="w-100 text-center my-3">
                        <button type="submit" class="btn btn-primary my-3" id="btn_edit_model">Edit</button>
                      </div>
                    </div>
                </form>
            </div>`;
            document.getElementById('btn_edit_model').addEventListener('click',(e)=>{
                e.preventDefault();
                managerModule.editModel();
            });
        
    }
    
    showEditProfile(){
        document.getElementById("info").innerHTML = '';
        let authUser = JSON.parse(sessionStorage.getItem('user'));
        const content = document.getElementById('content');
        content.innerHTML = `<div class="card border-primary mb-3 mx-auto" style="max-width: 40rem;">
                <form id="form_add_accound">
                    <h3 class="card-header text-center my-3">Edit Account</h3>
                    <div class="card-body">

                      <div class="form-group">
                        <label for="firstname" class="form-label mt-4">First Name</label>
                        <input type="text" class="form-control" id="newFirstname"  value="${authUser.firstname}" placeholder="First Name">
                      </div>
                      <div class="form-group">
                        <label for="lastname" class="form-label mt-4">Last Name</label>
                        <input type="text" class="form-control" id="newLastname"  value="${authUser.lastname}" placeholder="Last Name">
                      </div>
                      <div class="form-group">
                        <label for="phone" class="form-label mt-4">Phone</label>
                        <input type="text" class="form-control" id="newPhone"  value="${authUser.phone}" placeholder="Phone">
                      </div>
                      <div class="form-group">
                        <label for="login" class="form-label mt-4">Login</label>
                        <input type="text" class="form-control" id="login"  readonly value="${authUser.login}" placeholder="Login">
                      </div>
                      <div class="w-100 text-center my-3">
                        <button type="submit" class="btn btn-primary my-3" id="btn_edit_account">Edit</button>
                      </div>
                    </div>
                </form>
            </div>`;
        const btn_edit_account = document.getElementById('btn_edit_account');
        btn_edit_account.addEventListener('click', (e)=>{
            e.preventDefault();
            userModule.editAccount();
        });
        
    }
    showProfile(){
        document.getElementById("info").innerHTML = '';
        let authUser = JSON.parse(sessionStorage.getItem('user'));
        const content = document.getElementById('content');
        content.innerHTML = `<div class="card border-primary mb-3 mx-auto" style="max-width: 40rem;">
                <form id="form_add_accound">
                    <h3 class="card-header text-center my-3">Your Account</h3>
                    <div class="card-body">
                      <div class="form-group">
                        <label for="firstname" class="form-label mt-4">First Name</label>
                        <input type="text" class="form-control" id="#" readonly value="${authUser.firstname}" placeholder="First Name">
                      </div>
                      <div class="form-group">
                        <label for="lastname" class="form-label mt-4">Last Name</label>
                        <input type="text" class="form-control" id="#" readonly value="${authUser.lastname}" placeholder="Last Name">
                      </div>
                      <div class="form-group">
                        <label for="phone" class="form-label mt-4">Phone</label>
                        <input type="text" class="form-control" id="#" readonly value="${authUser.phone}" placeholder="Phone">
                      </div>
                      <div class="form-group">
                        <label for="login" class="form-label mt-4">Login</label>
                        <input type="text" class="form-control" id="#" readonly value="${authUser.login}" placeholder="Login">
                      </div>
                      <div class="form-group">
                        <label for="money" class="form-label mt-4">Money</label>
                        <input type="text" class="form-control" id="#" readonly value="${authUser.money}" placeholder="Money">
                      </div>
                      <div class="w-100 text-center my-3">
                        <button type="submit" class="btn btn-primary my-3" id="btn_edit_profile">Edit profile</button>
                      </div>
                      <div class="w-100 text-center my-3">
                        <button type="submit" class="btn btn-primary my-3" id="btn_edit_password">Edit password</button>
                      </div>
                      <div class="w-100 text-center my-3">
                        <button type="submit" class="btn btn-primary my-3" id="btn_add_money">Add Money</button>
                      </div>
                    </div>
                </form>
            </div>`;
            const btn_edit_profile = document.getElementById('btn_edit_profile');
            btn_edit_profile.addEventListener('click', (e)=>{
                e.preventDefault();
                viewModule.showEditProfile();
            });
            const btn_edit_password = document.getElementById('btn_edit_password');
            btn_edit_password.addEventListener('click', (e)=>{
                e.preventDefault();
                viewModule.showEditPassword();
            });
            const btn_add_money = document.getElementById('btn_add_money');
            btn_add_money.addEventListener('click', (e)=>{
                e.preventDefault();
                viewModule.showAddMoney();
            });
        
    }
    showAddMoney(){
        document.getElementById("info").innerHTML = '';
        let authUser = JSON.parse(sessionStorage.getItem('user'));
        const content = document.getElementById('content');
        content.innerHTML = `<div class="card border-primary mb-3 mx-auto" style="max-width: 40rem;">
                <form id="form_add_accound">
                    <h3 class="card-header text-center my-3">Your Account</h3>
                    <div class="card-body">
                      <div class="form-group">
                        <label for="firstname" class="form-label mt-4">First Name</label>
                        <input type="text" class="form-control" id="#" readonly value="${authUser.firstname}" placeholder="First Name">
                      </div>
                      <div class="form-group">
                        <label for="lastname" class="form-label mt-4">Last Name</label>
                        <input type="text" class="form-control" id="#" readonly value="${authUser.lastname}" placeholder="Last Name">
                      </div>
                      <div class="form-group">
                        <label for="phone" class="form-label mt-4">Phone</label>
                        <input type="text" class="form-control" id="#" readonly value="${authUser.phone}" placeholder="Phone">
                      </div>
                      <div class="form-group">
                        <label for="login" class="form-label mt-4">Login</label>
                        <input type="text" class="form-control" id="#" readonly value="${authUser.login}" placeholder="Login">
                      </div>
                      <div class="form-group">
                        <label for="money" class="form-label mt-4">Money</label>
                        <input type="text" class="form-control" id="#" readonly value="${authUser.money}" placeholder="Money">
                      </div>
                      <div class="w-100 text-center my-3">
                        <button type="submit" class="btn btn-primary my-3" id="btn_edit_profile">Edit profile</button>
                      </div>
                      <div class="w-100 text-center my-3">
                        <button type="submit" class="btn btn-primary my-3" id="btn_edit_password">Edit password</button>
                      </div>
                      <div class="form-group">
                        <input type="text" class="form-control" id="newMoney" value="" placeholder="Money">
                      </div>
                      <div class="w-100 text-center my-3">
                        <button type="submit" class="btn btn-primary my-3" id="btn_add_money">Add Money</button>
                      </div>
                    </div>
                </form>
            </div>`;
            const btn_edit_profile = document.getElementById('btn_edit_profile');
            btn_edit_profile.addEventListener('click', (e)=>{
                e.preventDefault();
                viewModule.showEditProfile();
            });
            const btn_edit_password = document.getElementById('btn_edit_password');
            btn_edit_password.addEventListener('click', (e)=>{
                e.preventDefault();
                viewModule.showEditPassword();
            });
            const btn_add_money = document.getElementById('btn_add_money');
            btn_add_money.addEventListener('click', (e)=>{
                e.preventDefault();
                userModule.addMoney();
            });
        
    }
    showEditPassword(){
        document.getElementById("info").innerHTML = '';
        let authUser = JSON.parse(sessionStorage.getItem('user'));
        const content = document.getElementById('content');
        content.innerHTML = `<div class="card border-primary mb-3 mx-auto" style="max-width: 40rem;">
                <form id="form_add_accound">
                    <h3 class="card-header text-center my-3">Your Account</h3>
                    <div class="card-body">
                      <div class="form-group">
                        <label for="firstname" class="form-label mt-4">First Name</label>
                        <input type="text" class="form-control" id="#" readonly value="${authUser.firstname}" placeholder="First Name">
                      </div>
                      <div class="form-group">
                        <label for="lastname" class="form-label mt-4">Last Name</label>
                        <input type="text" class="form-control" id="#" readonly value="${authUser.lastname}" placeholder="Last Name">
                      </div>
                      <div class="form-group">
                        <label for="phone" class="form-label mt-4">Phone</label>
                        <input type="text" class="form-control" id="#" readonly value="${authUser.phone}" placeholder="Phone">
                      </div>
                      <div class="form-group">
                        <label for="login" class="form-label mt-4">Login</label>
                        <input type="text" class="form-control" id="#" readonly value="${authUser.login}" placeholder="Login">
                      </div>
                      <div class="form-group">
                        <label for="money" class="form-label mt-4">Money</label>
                        <input type="text" class="form-control" id="#" readonly value="${authUser.money}" placeholder="Money">
                      </div>
                      <div class="w-100 text-center my-3">
                        <button type="submit" class="btn btn-primary my-3" id="btn_edit_profile">Edit profile</button>
                      </div>
                      <div class="form-group">
                        <label for="password1" class="form-label mt-4">Password</label>
                        <input type="password" class="form-control" id="newPassword1" placeholder="Password">
                      </div>
                      <div class="form-group">
                        <label for="password2" class="form-label mt-4">Repeat Password</label>
                        <input type="password" class="form-control" id="newPassword2" placeholder="Repeat Password">
                      </div>
                      <div class="w-100 text-center my-3">
                        <button type="submit" class="btn btn-primary my-3" id="btn_edit_password">Edit password</button>
                      </div>
                      <div class="w-100 text-center my-3">
                        <button type="submit" class="btn btn-primary my-3" id="btn_add_money">Add Money</button>
                      </div>
                    </div>
                </form>
            </div>`;
            const btn_edit_profile = document.getElementById('btn_edit_profile');
            btn_edit_profile.addEventListener('click', (e)=>{
                e.preventDefault();
                viewModule.showEditProfile();
            });
            const btn_edit_password = document.getElementById('btn_edit_password');
            btn_edit_password.addEventListener('click', (e)=>{
                e.preventDefault();
                userModule.editPassword();
            });
            const btn_add_money = document.getElementById('btn_add_money');
            btn_add_money.addEventListener('click', (e)=>{
                e.preventDefault();
                viewModule.showAddMoney();
            });
        
    }
    
}
const viewModule = new ViewModule();
export {viewModule};