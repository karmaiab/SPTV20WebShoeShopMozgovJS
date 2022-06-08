import {checkMenuPanel} from './app.js';
import {viewModule} from './ViewModule.js';

class ManagerModule{
      
        getListModels() {
        let promiseListModels = fetch('getListModels', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            }
        });
        promiseListModels.then(response => response.json())
                .then(response => {
                    if(response.status) {
                        viewModule.showEditModel();
                        let modelSelect = document.getElementById('select_models');
                        modelSelect.options.length = 0;
                        let option = null;
                        option = document.createElement('option');
                        option.text = "Select!";
                        option.value = '';
                        modelSelect.add(option);
                        for (let i = 0; i < response.options.length; i++) {
                            option = document.createElement('option');
                            option.text = ' Model: '+response.options[i].name + ' Brand: ' + response.options[i].brand + ' Price: ' + response.options[i].price + ' $ '+ ' Quantity: '+
                                    response.options[i].quantity+' tk. ';
                            option.value = response.options[i].id;
                            modelSelect.add(option);
                        }
                    }else {
                        viewModule.showEditModel();
                        let modelSelect = document.getElementById('select_models');
                        modelSelect.options.length = 0;
                        let option = null;
                        option = document.createElement('option');
                        option.text = "The list is empty!";
                        option.value = '';
                        modelSelect.add(option);
                    }
                })
                .catch(error => {
                    document.getElementById('info').innerHTML = "Server Error (getListModels)"+error;
                });
    }    
        
        
    sendNewModel(){
        let promiseCreateModel = fetch('newModel',{
            method: 'POST',
            body: new FormData(document.getElementById('form_add_model'))
        });
        promiseCreateModel.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('info').innerHTML = response.info;
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Server Error (sendNewModel)"+error;
                          });
    }
    
    editModel(){
        const id = document.getElementById('select_models').value;
        const newName = document.getElementById('newName').value;
        const newBrand = document.getElementById('newBrand').value;
        const newSize = document.getElementById('newSize').value;
        const newQuantity = document.getElementById('newQuantity').value;
        const newPrice = document.getElementById('newPrice').value;
        const changeModel = {
            "id": id,
            "newName": newName,
            "newBrand": newBrand,
            "newSize": newSize,
            "newQuantity": newQuantity,
            "newPrice": newPrice
        };
        let promiseChangeModel = fetch('editModel',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(changeModel)
        });
        promiseChangeModel.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('info').innerHTML = response.info;
                                  managerModule.getListModels();
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Server Error (editModel)"+error;
                          });
    }
    
}
const managerModule = new ManagerModule();
export {managerModule};