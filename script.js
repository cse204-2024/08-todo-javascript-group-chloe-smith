document.getElementById("Add").addEventListener("click", addNewTodo)


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
        todo = document.createElement("div");
        todoText = document.createElement("span"); 
        todoText.textContent = element.text;
        todo.appendChild(todoText)
        document.getElementById("TodoList").appendChild(todo)
        
    });


}

window.onload = function(){
    getAndDisplayToDos();
}

function addNewTodo(){
    
    let data = {
        text: document.getElementById("input-box").value
    }
    let xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let todo = JSON.parse(this.responseText);
            getAndDisplayToDos()
            console.log(todo);
        } else if (this.readyState == 4) {
            console.log(this.responseText);

        }
    };
    xhttp2.open("POST", "https://cse204.work/todos", true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "93064f-f9b3f4-8689e1-3a0fa1-e3a22b");
    xhttp2.send(JSON.stringify(data))
}



function updateTodo(id, status){
    let xhttp = newXMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.state == 4){
            if (this.status ==200){
                console.log('Todo updated');
                getAndDisplayToDos()
            } else{
                console.error('Failed to update ToDo', this.responseText);
            }
        }
    };
    xhttp.open('PUT', `https://cse204.work/todos/${id}`, true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "93064f-f9b3f4-8689e1-3a0fa1-e3a22b");
    xhttp.send(JSON.stringify(newData));
}

function deleteTodo(id){
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                console.log('ToDo deleted successfully');
                getAndDisplayToDos()
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

