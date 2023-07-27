//Link Html Elements
var form  = document.querySelector('#form-id');
var itemList = document.querySelector('.list'); 
var deleteButton = document.querySelector('.delete-button');
var searchBar = document.querySelector('.filter');

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
    }
};

function removeItem(e){
    if (e.target.classList.contains('fa-solid')){
        if(confirm("Are You Sure ??")){
            var li = e.target.parentElement.parentElement;
            
            itemList.removeChild(li);
        }
    }
};

function searchItems(e){
    var searchText = e.target.value.toLowerCase();
    var searchItems = itemList.getElementsByTagName('p');
    // convert html collection to array
    // if(e.key === "Enter"){
    //     searchBar.value = '';
        
    //     // return;
    // }
    Array.from(searchItems).forEach(function(i){
        var itemName = i.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(searchText) != -1){
            i.parentElement.style.display ="block";
        } else{
            i.parentElement.style.display = "none";
        }

    });
}

