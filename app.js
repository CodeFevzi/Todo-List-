
const form=document.querySelector(".addFormTodo");
const addInput=document.querySelector("#addTodo");
const todoList=document.querySelector(".list-group-item");
const fisrtConst=document.querySelector("#srch");
const cont=document.querySelector(".clear");
const clearButton=document.querySelector("#clearButton");
const listGroup =document.querySelector(".list-group");

let todos = []

runEvents();

function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    listGroup.addEventListener("click",removeTodoUI);
    clearButton.addEventListener("click",allTodosEveryHere);
    fisrtConst.addEventListener("keyup",filter);
}
function allTodosEveryHere(){
    const todoList=document.querySelectorAll(".list-group-item");
    if(todoList.length>0){
        //Ekramdam silme
        todoList.forEach(function(todo){
          todo.remove();
        });
       // Storageden Silme
       todos =[];
       localStorage.getItem("todos",JSON.stringify(todos));
       showAlert("success","Deleted succesful");
    }else{
        showAlert("warning","Select At Least One Todo To Delete");
    }
    
}

function filter(){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoList = document.querySelectorAll("list-group-item");
    if(todoList.length>0){
        todoList.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style","display : block");
            }else{
                todo.setAttribute("style","display : none !important");
            }
        });

    }else{
        showAlert("warning","You Need to Enter At Least One Todo for Filtering");
    }
}

function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
      addTodoUI(todo);
    });
}

function removeTodoUI(e){
    if(e.target.className==="fa fa-remove"){
        // ekrandan siler
       const todo=e.target.parentElement.parentElement;
       todo.remove();
       //storage den silme 
       removeTodoToStorage(todo.textContent)
       showAlert("success","Todo Deleted");
    }
}
function removeTodoToStorage(removeTodo){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
        if(removeTodo===todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodo(e){
   const inputText=addInput.value.trim();
   if(inputText==null|| inputText==""){
      showAlert("warning","Please do not leave blank");
   }else{
    //Arayüze eklemek için
    addTodoUI(inputText);
    addTodoToStorage(inputText);
    showAlert("success","Todo Added");
   }
   //storage ekleme
    e.preventDefault();
   
}


function addTodoUI(newTodo){
    const li=document.createElement("li");
    li.className="list-group-item";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href="#";
    a.className="delete-item";

    const i= document.createElement("i");
    i.classsName="fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value="";
}

function addTodoToStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function checkTodosFromStorage(){
    if(localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type,message){
    const div = document.createElement("div");
    div.className=`alert alert-${type}`;
    div.textContent = message;
    cont.appendChild(div);

    setTimeout(function(){
        div.remove();
    },2500);
}