


class List {
    constructor(name) {
        this.name = name;
        this.items = [];
    }
    updateName(name) {
        this.name = name;
    }
    removeItem(itemIndex) {
        this.items.splice(itemIndex, 1);
    }
}

class Item {
    constructor(name, completed, important) {
        this.name = name;
        this.completed = completed;
        this.important = important;
    }
    addToList(list) {

        list.items.push(this);
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



const lists = [];
const LISTS_KEY = "listsKey";

getLists();


$("#listName").on("keyup", function (event) {
    if (event.which == 13) {
        createList();
        $("#listName").val("");
    }
});

$("#itemName").on("keyup", function (event) {
    if (event.which == 13) {
        createItem();
        $("#itemName").val("");
    }
});

$("#title").on("keyup", function (event) {

    if (event.which == 13) {
        updateList();
    }

});


function createList() {
    let name = $("#listName").val();
    let list = new List(name);
    lists.push(list);
    $("#title").html(name);
    $("#title").attr("class", name);
    printLists();
    printItems();
    
    saveLists();
}

function updateList() {

    let list = findSelectedList();
    let newName = $("#title").html().split("<")[0];
    list.name = newName;
    $("itemName").focus();
    printLists();
    $("#title").attr("class", newName);
    $("#done").hide();
    $("#title").attr("contenteditable", false);

    saveLists();


}

function deleteList(element) {

    let target = $(element).parent();
    let elements = $(".list");

    for (var i = 0; i < elements.length; i++) {
        if (elements[i] == target[0]) {
            lists.splice(i, 1);
        }
    }

    $("#title").html("");
    $("#title").attr("class", "");
    $("#items").html("");
    printLists();

    saveLists();

}

function printLists() {
    let html = '';
    for (var i = 0; i < lists.length; i++) {
        html += `<div class = list>
                                <div onclick="selectList(this)">${lists[i].name}</div>
                                <div onclick="deleteList(this)">X</div>
                            </div>`
    }

    $("#lists").html(html);
}

function selectList(element) {

    let html = $(element).html();
    $("#title").html(html);
    $("#title").attr("class", html);
    printItems();
}

function findSelectedList() {
    let name = $("#title").attr("class");
    let list;

    for (var i = 0; i < lists.length; i++) {
        if (name == lists[i].name) {
            list = lists[i];
        }
    }

    return list;
}

function createItem() {

    let list = findSelectedList();
    let itemName = $("#itemName").val();
    let item = new Item(itemName, false, false);
    item.addToList(list);
    printItems();

    saveLists();

}

function deleteItem(element) {
    let list = findSelectedList();
    let target = $(element).parent();
    let elements = $(".item");

    for (var i = 0; i < elements.length; i++) {
        if (elements[i] == target[0]) {
            list.items.splice(i, 1);
        }
    }
    printItems();

    saveLists();
}



function printItems() {
    let list = findSelectedList();
    let html = "";
    for (var i = 0; i < list.items.length; i++) {
        html += `<div class=item>
                    <div class = "itemTitle">${list.items[i].name}</div>
                    <input type="checkbox"/>
                    <div onclick = "updateItem(this)" style = "display:none;" class="itemDone">Done</div>
                    <div onclick="getItemToUpdate(this)">edit</div>
                    <div>!</div>
                    <div onclick="deleteItem(this)">X</div>
                </div>`

            ;
    }
    $("#items").html(html);
}

function getItemToUpdate(element) {
    let currentItem = $(element).parent();

    let currentItemTitle = $(currentItem).children()[0];
    $(currentItemTitle).attr("contenteditable", "true");
    $(currentItemTitle).html("");
    $(currentItemTitle).focus();
    let done = $(currentItem).children()[2];
    $(done).show();
}

function updateItem(element) {

    let list = findSelectedList();
    let currentItem = $(element).parent();
    let items = $(".item");
    let listItem = '';
    let currentItemTitle = $(currentItem).children()[0];
    let newName = $(currentItemTitle).html();

    for (let i = 0; i < items.length; i++) {
        if (currentItem[0] == items[i]) {
            console.log(list.items[i].name);
            list.items[i].name = newName;

        }
    };
    let done = $(currentItem).children()[2];
    $(done).hide();

    saveLists();
}

function clearHtml(element) {
    $("#title").attr("contenteditable", true);
    $("#title").focus();
    $("#title").html("");
    $("#done").show();
}

// let thing = JSON.stringify(lists);
//localStorage.setItem("lists", "thing");
// let object = localStorage.getItem("thing");
//let lists = JSON.parse(object); -- changes from string back to array or object etc.
 
function saveLists(){
    let stringLists = JSON.stringify(lists);
    localStorage.setItem(LISTS_KEY, stringLists);
}

function getLists(){
    let stringLists = localStorage.getItem(LISTS_KEY);

    let objectLists = JSON.parse(stringLists);

    if(objectLists == null){
        return
    }
    
    for(i=0; i<objectLists.length; i++){
        
        let objectList = objectLists[i];
        let list = new List(objectList.name);
        lists.push(list);
        
        for(j = 0; j<objectLists[i].items.length; j++){
            
            let objectItem = objectList.items[j];
            let item = new Item(objectItem.name, objectItem.completed, objectItem.important);

            list.items.push(item);

        }
    }
    printLists();
}
