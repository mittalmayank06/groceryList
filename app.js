// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn")
const container =document.querySelector(".grocery-container")
const list = document.querySelector(".grocery-list")
const clearBtn =  document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit",addItem);
//Clear Items
  clearBtn.addEventListener('click',clearItems);
// load items while refresh
window.addEventListener('DOMContentLoaded', setupItems);
 
// ****** FUNCTIONS **********
function addItem(e)   {
    e.preventDefault();  //check this 1.
    const value = grocery.value;
    const id = new Date().getTime().toString();
    
    if(value !=='' && editFlag === false) {
        const element = document.createElement('article');

        // add ID
        let attr = document.createAttribute('data-id');
	attr.value = id;
        element.setAttributeNode(attr);
        // add class
        element.classList.add('grocery-item');
        
        element.innerHTML =`<p class="title">${value}</p>
        <div class="btn-container">
            <!-- edit btn -->
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <!-- delete btn -->
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        `;
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector(".edit-btn");
        deleteBtn.addEventListener('click',deleteItem);
        editBtn.addEventListener("click",editItem);

        // append child
        list.appendChild(element);
        //display alert
        displayAlert('Item added to the list', 'Success');
        // show container
        container.classList.add("show-container");
        // add to local-storage
        addToLocalStorage(id,value);
        // set back to default
        setBackToDefault();
        // console.log("Add item to the list");
    }
    else  if(value!=='' && editFlag ===true) {
        console.log("Editing")
        editElement.innerHTML =value;
        displayAlert('value changed','success');
        // edit local-storage
        editLocalStorage(editID,value);
        }
    else {
       displayAlert("Please enter value", "danger");
    }
}
// display alert
function displayAlert(text,action)  {
    alert.textContent =text;
    alert.classList.add(`alert-${action}`);

// remove alert
setTimeout(function() {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
},1000);
}
//clear Items:
function clearItems()  {
    const items = document.querySelectorAll('.grocery-item');
    
    if(items.length > 0) {
        items.forEach(function(item)  {
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();
    localStorage.removeItem('list');
}
// delete function
function deleteItem(e)  {
    console.log('Item deleted');
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length ===0)  {
        container.classList.remove('show-container');
    }
    displayAlert("Item removed" , "danger");
    setBackToDefault();
    //remove from local storage
    removeFromLocalStorage(id);
}
// edit function
function editItem() {
    console.log("Item edited");
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form values
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
}
// set back to default
function setBackToDefault()  {
    console.log('Set back to default');
    grocery.value ="";
    editFlag = false;
    editID ="";
    submitBtn.textContent = "submit";
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id,value)  {
    // console.log("added to local storage");
    const grocery = {id:id,value:value};
    console.log(grocery);
    let items = getLocalStorage();
    console.log(items);

    items.push(grocery);
    localStorage.setItem('list',JSON.stringify(items));

}
function removeFromLocalStorage(id)  {
    let items = getLocalStorage();

    items = items.filer(function(item) {
        if(item.id !==id) {
            return item;
        }
    })
    localStorage.setItem("list", JSON.stringify(items));

}
function editLocalStorage( id, value) {
     let items = getLocalStorage();
     items = items.map(function(item) {
        if(item.id  === id) {
            item.value = value;
        }
        return item;
     });
     localStorage.setItem("list",JSON.stringify(items));

}
function getLocalStorage() {
    return localStorage.getItem("list ")?JSON.parse
    (localStorage.getItem('list')):[];
}
    // localStorage API
    // setItem
    // getItem
    // removeItem
    // save as Strings
localStorage.setItem("Orange",JSON.stringify(["Item1","Item2"]
));
const oranges = JSON.parse(localStorage.getItem('Orange'));
console.log(oranges);
localStorage.removeItem("orange");

// ****** SETUP ITEMS **********
function setupItems() {
    let items = getLocalStorage();
    if(items.length >0 )  {
        items.forEach(function(item) {
            createListItem(item.id,item.value)
        })
        container.classList.add('show-container');
    }
}
function createListItem(id,value) {
     const element = document.createElement('article');
        // add class
        element.classList.add('grocery-item');
        // add ID
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML =` <p class="title">${value}</p>
        <div class="btn-container">
            <!-- edit btn-->
            <button type="button" class="edit-btn">
                <i clas="fas fa-edit"></i>
            </button>
            <!-- delete btn -->
            <button type="button" class="delete-btn">
                <i clas="fas fa-trash"></i>
            </button>
        </div>
        `;
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector(".edit-btn");
        deleteBtn.addEventListener('click',deleteItem);
        editBtn.addEventListener("click",editItem);

        // append child
        list.appendChild(element);
}