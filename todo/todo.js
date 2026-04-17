// ------------------------------
// VARIABLES
// ------------------------------
var todoList = [];
var comdoList = [];
var remList = [];

var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");


// ------------------------------
// LOCAL STORAGE
// ------------------------------
function saveToLocal() {
    localStorage.setItem("todos", JSON.stringify(todoList));
}

function loadFromLocal() {
    const data = localStorage.getItem("todos");
    if (data) {
        todoList = JSON.parse(data);
    } else {
        todoList = [];
    }
}

// Load tasks when page opens
loadFromLocal();
update();
addinmain(todoList);


// ------------------------------
// EVENT LISTENERS
// ------------------------------
addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deleteS);

document.addEventListener('click', (e) => {

    if (e.target.classList.contains('complete') || e.target.classList.contains('ci')) {
        completeTodo(e);
    }

    let firstClass = e.target.className.split(' ')[0];
    if (firstClass == 'delete' || firstClass == 'di') {
        deleteTodo(e);
    }

    if (e.target.id == "all") viewAll();
    if (e.target.id == "rem") viewRemaining();
    if (e.target.id == "com") viewCompleted();
});

// Enter key
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});


// ------------------------------
// UPDATE COUNTERS
// ------------------------------
function update() {
    comdoList = todoList.filter((ele) => ele.complete);
    remList = todoList.filter((ele) => !ele.complete);

    document.getElementById("r-count").innerText = todoList.length.toString();
    document.getElementById("c-count").innerText = comdoList.length.toString();
}


// ------------------------------
// ADD TODO
// ------------------------------
function add() {
    var value = todoInput.value;

    if (value === '') {
        alert("😮 Task cannot be empty");
        return;
    }

    todoList.push({
        task: value,
        id: Date.now().toString(),
        complete: false,
    });

    todoInput.value = "";

    update();
    addinmain(todoList);
    saveToLocal();
}


// ------------------------------
// RENDER MAIN LIST
// ------------------------------
function addinmain(list) {
    allTodos.innerHTML = "";

    list.forEach(element => {

        var x = `
        <li id="${element.id}" class="todo-item">
            <p id="task" class="${element.complete ? 'line' : ''}">
                ${element.complete ? `<strike>${element.task}</strike>` : element.task}
            </p>

            <div class="todo-actions">
                <button class="complete btn btn-success">
                    <i class="ci bx bx-check bx-sm"></i>
                </button>

                <button class="delete btn btn-error">
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`;

        allTodos.innerHTML += x;
    });
}


// ------------------------------
// DELETE ONE TODO
// ------------------------------
function deleteTodo(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');

    todoList = todoList.filter((ele) => ele.id != deleted);

    update();
    addinmain(todoList);
    saveToLocal();
}


// ------------------------------
// COMPLETE / UNCOMPLETE TODO
// ------------------------------
function completeTodo(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');

    todoList.forEach((obj) => {
        if (obj.id == completed) {
            obj.complete = !obj.complete;
        }
    });

    update();
    addinmain(todoList);
    saveToLocal();
}


// ------------------------------
// DELETE ALL

// ------------------------------
function deleteAll() {
    todoList = [];
    update();
    addinmain(todoList);
    saveToLocal();
}


// ------------------------------
// DELETE COMPLETED
// ------------------------------
function deleteS() {
    todoList = todoList.filter((ele) => !ele.complete);

    update();
    addinmain(todoList);
    saveToLocal();
}


// ------------------------------
// FILTER FUNCTIONS
// ------------------------------
function viewCompleted() {
    addinmain(comdoList);
}

function viewRemaining() {
    addinmain(remList);
}

function viewAll() {
    addinmain(todoList);
}



