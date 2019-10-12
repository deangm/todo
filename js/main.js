

lists = [];

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
    constructor(name) {
        this.name = name;
        this.completed = false;
        this.important = false;
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


$( "#listName" ).on( "keyup", function( event ) {
    if(event.which == 13){
        createList();
        $("#listName").val("");
    }
  });

$("#itemName").on("keyup", function(event){
    if(event.which == 13){
        createItem();
        $("#itemName").val("");
    }
})



function createList() {
    let name = $("#listName").val();
    let list = new List(name);
    lists.push(list);
    $("#title").html(name);
    printLists();
}

function deleteList(element){
    
    let target = $(element).parent();
    let elements = $(".list");

    for(var i = 0; i<elements.length; i++){
        if(elements[i] == target[0]){
            lists.splice(i,1);
        }
    }

    $("#title").html("");
    $("#items").html("");
    printLists();

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

function selectList(element){
    
    let html = $(element).html();
    $("#title").html(html);
}

function findSelectedList(){
    let name = $("#title").html();
    let list;

    for(var i = 0; i<lists.length; i++){
        if(name == lists[i].name){
            list = lists[i];
        }
    }

    return list;
}

function createItem(){

    let list = findSelectedList();
    let itemName = $("#itemName").val();
    let item = new Item(itemName);
    item.addToList(list);
    printItems();
    
}

function deleteItem(element){
    let list = findSelectedList();
    let target = $(element).parent();
    let elements = $(".item");

    for(var i = 0; i<elements.length; i++){
        if(elements[i] == target[0]){
            list.items.splice(i,1);
        }
    }
    printItems();
}



function printItems(){
    let list = findSelectedList();
    let html = "";
    for(var i = 0; i < list.items.length; i ++){
        html += `<div class=item>
                    <div>${list.items[i].name}</div>
                    <input type="checkbox"/>
                    <div>!</div>
                    <div onclick="deleteItem(this)">X</div>
                </div>`
               
                ;
    }
    $("#items").html(html);
}



