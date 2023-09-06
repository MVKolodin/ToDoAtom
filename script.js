let todoList = [
    { text: "Купить продукты", completed: false },
    { text: "Починить замок", completed: false },
    { text: "Решить задачу", completed: false }
];
document.addEventListener('DOMContentLoaded', function () {
    let savedList = localStorage.getItem("todoList");
    if (savedList) {
        todoList = JSON.parse(savedList);
    }
    renderList();
});

function renderList() {
    let list = document.getElementById("myUL");
    list.innerHTML = "";
    todoList.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${index + 1}. ${item.text}`;
        if (item.completed) {
            li.classList.add("completed");
        }
        list.appendChild(li);
    });
}
renderList();

function newElement() {
    let inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        let indexToInsert = todoList.findIndex(item => item.completed);
        if (indexToInsert === -1) {
            todoList.push({ text: inputValue, completed: false });
        } else {
            todoList.splice(indexToInsert, 0, { text: inputValue, completed: false });
        }

        saveList();
        renderList();
    }
    document.getElementById("myInput").value = "";
}

function highlightEven() {
    let listItems = document.querySelectorAll('#myUL li');
    listItems.forEach((item, index) => {
        if ((index + 1) % 2 === 0) {
            item.style.backgroundColor = "lightblue";
        }
    });
}

function highlightOdd() {
    let listItems = document.querySelectorAll('#myUL li');
    listItems.forEach((item, index) => {
        if ((index + 1) % 2 !== 0) {
            item.style.backgroundColor = "lightgreen";
        }
    });
}

function removeLast() {
    todoList.pop();
    saveList();
    renderList();
}

function removeFirst() {
    todoList.shift();
    saveList();
    renderList();
}

function completeTask() {
    let itemToComplete = prompt("Введите номер элемента для завершения:", "");
    if (itemToComplete && todoList[itemToComplete - 1]) {
        todoList[itemToComplete - 1].completed = true;
        let completedItem = todoList.splice(itemToComplete - 1, 1)[0];
        todoList.push(completedItem);
        saveList();
        renderList();
    }
}

function removeTask() {
    let itemToRemove = prompt("Введите номер элемента для удаления:", "");
    if (itemToRemove && todoList[itemToRemove - 1]) {
        todoList.splice(itemToRemove - 1, 1);
        saveList();
        renderList();
    }
}
function saveList() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}