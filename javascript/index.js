//Link Html Elements
var form  = document.querySelector('#form-id');
var itemList = document.querySelector('.list'); 
var deleteButton = document.querySelector('.delete-button');
var searchBar = document.querySelector('.filter');
var flag = 0;

//Function calls
itemList.addEventListener('click', removeItem);
itemList.addEventListener('mousemove', hoverItems);
searchBar.addEventListener('keyup', searchItems);

//Function Defination
const addTask = (e) => {
    e.preventDefault();
    var itemToAdd = document.querySelector('.text-field').value;
    //create p element
    var par = document.createElement('p');
    //add text to p
    par.appendChild(document.createTextNode(itemToAdd));
    //create li element
    var li = document.createElement('li');
    //add class
    li.className ='list-items blur-effect';
    li.appendChild(par);
    //create button element for delete-button
    var delBtn = document.createElement('button');
    delBtn.className = 'delete-button';
    var delIcon = document.createElement('i');
    delIcon.className = 'fa-solid fa-trash';
    delBtn.appendChild(delIcon);
    li.appendChild(delBtn);
    itemList.appendChild(li); 
    form.reset();
    console.log(li);
};

form.addEventListener('submit', addTask);

function hoverItems(e){
    var items = document.querySelectorAll('.list-items');
    for(let i=0; i<items.length; i++){
        items[i].addEventListener('mouseover', function() {
            items[i].style.boxShadow='0px 0px 15px 0px #7A9D54';
            items[i].lastChild.firstChild.className= "fa-solid fa-trash-arrow-up";
        });
        items[i].addEventListener('mouseout', function() {
            items[i].style.boxShadow='inset 2px 2px 20px 5px #7A9D54';
            items[i].lastChild.firstChild.className= "fa-solid fa-trash";
        });
        items[i].addEventListener('click', function() {
            if (flag == 0) {
                items[i].style.textDecoration='line-through';
                flag = 1;
            }else {
                items[i].style.textDecoration='none';
                flag = 0;
            }
        });
    }
};

function removeItem(e){
    if (e.target.classList.contains('fa-solid')){
        if(flag == 1){
            Confirm.open({
                title: 'Remove Task',
                message: 'Are you sure you wish to remove this Task from list?',
                onok: () => {
                    var li = e.target.parentElement.parentElement;
                    itemList.removeChild(li);
                }
            });
            flag = 1;
        }else {
            Confirm.open({
                title: 'Completed Task',
                message: 'Hurry! You completed this Task',
                onok: () => {
                    var li = e.target.parentElement.parentElement;
                    itemList.removeChild(li);
                }
            });
        }
    }
};

function searchItems(e){
    var searchText = e.target.value.toLowerCase();
    var searchItems = itemList.getElementsByTagName('p');
    
    // if(e.key === "Enter"){
    //     searchBar.value = null;
    //     searchItems.parentElement.parentElement.style.display = 'block';
    //     // return;
    // }
    // convert html collection to array
    Array.from(searchItems).forEach(function(i){
        var itemName = i.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(searchText) != -1){
            i.parentElement.style.display ="block";
        } else{
            i.parentElement.style.display = "none";
        }

    });
}

// For custom confirm window
// just set new workflow for the todo list project
