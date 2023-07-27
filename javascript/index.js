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

// For custom confirm window
const Confirm = {
    open (options) {
        options = Object.assign({}, {
            title: '',
            message: '',
            okText: 'OK',
            cancelText: 'Cancel',
            onok: function () {},
            oncancel: function () {}
        }, options);
        
        const html = `
            <div class="confirm">
                <div class="confirm__window">
                    <div class="confirm__titlebar">
                        <span class="confirm__title">${options.title}</span>
                        <button class="confirm__close">&times;</button>
                    </div>
                    <div class="confirm__content">${options.message}</div>
                    <div class="confirm__buttons ">
                        <button class="confirm__button confirm__button--ok confirm__button--fill">${options.okText}</button>
                        <button class="confirm__button confirm__button--cancel">${options.cancelText}</button>
                    </div>
                </div>
            </div>
        `;

        const template = document.createElement('template');
        template.innerHTML = html;

        // Elements
        const confirmEl = template.content.querySelector('.confirm');
        const btnClose = template.content.querySelector('.confirm__close');
        const btnOk = template.content.querySelector('.confirm__button--ok');
        const btnCancel = template.content.querySelector('.confirm__button--cancel');

        confirmEl.addEventListener('click', e => {
            if (e.target === confirmEl) {
                options.oncancel();
                this._close(confirmEl);
            }
        });

        btnOk.addEventListener('click', () => {
            options.onok();
            this._close(confirmEl);
        });

        [btnCancel, btnClose].forEach(el => {
            el.addEventListener('click', () => {
                options.oncancel();
                this._close(confirmEl);
            });
        });

        document.body.appendChild(template.content);
    },

    _close (confirmEl) {
        confirmEl.classList.add('confirm--close');

        confirmEl.addEventListener('animationend', () => {
            document.body.removeChild(confirmEl);
        });
    }
};

