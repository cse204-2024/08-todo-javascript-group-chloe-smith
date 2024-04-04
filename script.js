
function getAndDisplayToDos(){

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let todos = JSON.parse(this.responseText);
            console.log(todos);
            displayToDos(todos);
        }
    };

    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key","93064f-f9b3f4-8689e1-3a0fa1-e3a22b");
    xhttp.send();
}

function displayToDos(todos){
    todos.forEach(element => {
        let todo = document.createElement("div");
        let todoText = document.createElement("span"); 
        todoText.textContent = element.text;
        todo.appendChild(todoText)
        document.getElementById("TodoList").appendChild(todo)

        let Delete = document.createElement("button");
        Delete.setAttribute("id", "DeleteBtn")
        Delete.textContent = "Delete";
        Delete.addEventListener("click", () => deleteTodo(element.id))
        todo.appendChild(Delete);
        document.getElementById("TodoList").appendChild(todo);
        
    });


}

window.onload = function(){
    getAndDisplayToDos();
    document.getElementById("Add").addEventListener("click", addNewTodo);
    document.getElementById("input-box").addEventListener("keypress", function(event) {
        if (event.keyCode === 13) { 
            event.preventDefault();
            addNewTodo();
        }
    });
    let Delete = document.createElement("button");
    Delete.addEventListener("keypress", function(event) {
        if (event.keyCode === 13) {
            deleteTodo(id);
        }
    });

}

function addNewTodo(){
    
    let data = {
        text: document.getElementById("input-box").value.trim()
    }
    console.log(data);
    let xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let todotext = JSON.parse(this.responseText);
            // getAndDisplayToDos()
            let todo = document.createElement("div");
            let todoText = document.createElement("span"); 
            todoText.textContent = todotext.text;
            todo.id = todotext.id;
            todo.appendChild(todoText);
            document.getElementById("TodoList").appendChild(todo);

            let Delete = document.createElement("button");
            Delete.setAttribute("id", "DeleteBtn")
            Delete.textContent = "Delete";
            
            Delete.addEventListener("click", () => deleteTodo(todotext.id));
            todo.appendChild(Delete);
            document.getElementById("TodoList").appendChild(todo);

            let Completed = document.createElement("button");
            // Completed.textContent = "Completed";
            Completed.setAttribute("id", "Completed")
            Completed.classList.add("completed");

            Completed.addEventListener("click", () => {
                // Assuming Completed is a child of the todo item
                updateTodo(todotext.id);
                Completed.classList.add('completed-green');
                let todoElement = document.getElementById(todotext.id);
                todoElement.classList.add('completed-task'); 
                
            });
            todo.insertBefore(Completed, todoText);


            updateTodo(todotext.id)
            document.getElementById("TodoList").appendChild(todo);
        
            console.log(todo);
            document.getElementById("input-box").value = "";
            
        } else if (this.readyState == 4) {
            console.log(this.responseText);

        }
    };
    xhttp2.open("POST", "https://cse204.work/todos", true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "93064f-f9b3f4-8689e1-3a0fa1-e3a22b");
    xhttp2.send(JSON.stringify(data))
}



function updateTodo(id){
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4){
            if (this.status ==200){
                console.log('Todo updated');
        
                // let todoElement = document.getElementById(id);
                // todoElement.classList.add('completed-task');
                
                
            } else{
                console.error('Failed to update ToDo', this.responseText);
            }
        }
    };
    xhttp.open('PUT', `https://cse204.work/todos/${id}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", "93064f-f9b3f4-8689e1-3a0fa1-e3a22b");
    xhttp.send();
}

function deleteTodo(id){
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                console.log('ToDo deleted successfully');
                let todoDiv = document.getElementById("TodoList");

                let todoElement = document.getElementById(id);
                todoDiv.removeChild(todoElement);
                
            } else {
                console.error('Failed to delete ToDo:', this.responseText);
            }
        }
    };

    xhttp.open('DELETE', `https://cse204.work/todos/${id}`, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.setRequestHeader('x-api-key', '93064f-f9b3f4-8689e1-3a0fa1-e3a22b'); 
    xhttp.send();
}

//how can I make the style of updtated to do remain after I reload the webpage?
