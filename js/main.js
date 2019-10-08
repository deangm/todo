

lists = [];

class List {
    constructor(name, id) {
        this.id = id;
        this.name = name;
        this.items = [];
    }
    updateName(name) {
        return this.name = name;
    }
    addItem(item) {
        this.items.push(item);
    }
}

class Item {
    constructor(name, id, list) {
        this.id = id;
        this.name = name;
        this.list = list;
        this.completed = false;
        this.important = false;
    }
    addToList(list) {
        list.push(this);
    }
    update(name) {
        this.name = name;
    }
    complete() {
        this.completed = true;
    }
    makeImportant() {
        this.important = true;
    }
}


function findList(id){
    let result = undefined;

    for (let i = 0; i < lists.length; i++) {
        if (lists[i].id == id) {
            result = lists[i];
        }
    }
    return result

}


function createList() {
    let name = document.getElementById("listName").value;
    let id = Math.floor(Math.random() * 1000);
    let list = new List(name, id);
    lists.push(list);
    showList();
}

function showList(){
    html = "<div>"
    lists.forEach(function(list){
        html += `<h2 onclick="showItems(this.id)" id="${list.id}">${list.name}</h2>`;
    });
    html += "</html>";
    document.getElementById('lists').innerHTML = html;
    
}

function createItem() {
    let listId = getListId();
    let name = document.getElementById("itemName").value;
    let id = Math.floor(Math.random() * 1000);
    let item = new Item(name, id, listId);
    console.log(item);
    let list = findList(listId);
    list.items.push(item);
    showItems(listId);
    
}

function showItems(listId){
    let list = findList(listId);
    let title = document.getElementsByTagName('h1');
    title[0].innerHTML = list.name;
    title[0].id = listId;
    html = "<div>"
    list.items.forEach(function(item){
        html += 
        `<div id = "${item.id}">${item.name}</div>
        <div onclick= "deleteItem(this)" id= "delete_${item.id}">X</div>`;
    })
    html += "</div>"
    document.getElementById("items").innerHTML = html;
}

function getListId(){
    
    let list = document.getElementsByTagName('h1');
    listId = list[0].id;
    return listId;
}

function deleteList (){
    listId = getListId();
    let list = findList(listId);
    console.log(listId);
    for (item in lists){
        if (lists[item] == list){
            lists.splice(item, 1);
        }
    }
    showList();
}

function deleteItem(element){
    let itemId = element.id.split("_")[1];
    console.log(itemId);
    let listId = document.getElementsByTagName("h1")[0].id;
    let list = findList(listId);
    for (item in list.items){
        if (itemId == list.items[item].id){
            list.items.splice(item, 1);
        }
    }
    showItems(listId);

}