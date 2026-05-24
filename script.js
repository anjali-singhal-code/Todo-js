let input = document.querySelector("#text-input");
let date = document.querySelector("#date-input");
let addButton = document.querySelector("#button-add");

let editingTasks = null;
let taskList = document.querySelector("#task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

showTasks();


addButton.addEventListener("click", addTask);
function addTask() {
  let task = {
    inputVal: input.value,
    dateVal: date.value,
    checked : false
  }
  if (input.value === "" || date.value === "") {
    alert("Please enter task and date.");
    return
  }

  if (editingTasks !== null) {
    let i = tasks.indexOf(editingTasks);
    tasks[i] = task;
    editingTasks = null;
  } else {
    tasks.push(task);
  }

  updateStorage();
  input.value = "";
  date.value = "";
}

function showTasks() {
  taskList.innerHTML ="";
  tasks.forEach((value, index) => {
    let list = document.createElement("span");
    list.id = 'lists';
    let text = document.createElement("span");
    text.id = 'text';
    let date = document.createElement("span");
    date.id = 'date';
    text.innerHTML = value.inputVal;
    date.innerHTML = value.dateVal;
    list.appendChild(text);
    list.appendChild(date);
    
    let editBtn = document.createElement('span');
    editBtn.innerHTML = `<span class="material-symbols-outlined">edit_square</span>`;
    editBtn.className = "edit-button";
    list.appendChild(editBtn);

    editBtn.addEventListener("click", () => {
      if(!value.checked) {
        input.value = value.inputVal;
        date.value = value.dateVal;
        editingTasks = value;
      }
    })

    let del = document.createElement("button");
    del.className = 'delete-btn';
    del.innerHTML = "Delete"
    list.appendChild(del);
    
    del.addEventListener("click", () => {
      tasks.splice(index, 1);
      updateStorage();
    })
    
    if (value.checked) {
      text.classList.toggle("checked");
      date.classList.toggle("checked");
      editBtn.classList.toggle("checked");
    }

    text.addEventListener("click", () => {
      value.checked = !value.checked;
      updateStorage();
    })
    taskList.appendChild(list);
    
  })
}

function updateStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}
