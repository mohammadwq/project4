let app = document.querySelector(".app");
let container = document.querySelector(".container");
let taskText = document.querySelector('[name="inputText"]');
let submit = document.querySelector('[type="submit"]');
let taskDiv = document.querySelector(".content");
let actionBtn = document.querySelector(".actions")
let delAll = document.getElementById("del");
let countTask = document.querySelector(".countTask");
let taskArr = [];



if (window.localStorage.getItem("task")) {
    taskArr = JSON.parse(window.localStorage.getItem("task"));
    if (taskArr.length > 0) {
        delAll.className = "deleteAll active";  
    }
}
getTaskFromLocalstorage();



submit.onclick = function() {
    if (taskText.value !== "" && taskText.value.trim().length !== 0) {
        addTaskToArr(taskText.value.trim());
        taskText.value = "";
        delAll.className = "deleteAll active";  
        countTask.textContent = ` Number Of Tasks : ${taskArr.length}`;
    }

};


function addTaskToArr(text) {
    let theTask = {
        id : Date.now(),
        title : text,
        done : false,
    }
    taskArr.push(theTask);
    addTaskToPage(taskArr);
    addTaskToLocalstorage(taskArr);

}

taskDiv.addEventListener("click" , (e) => {
    if(e.target.classList.contains("del")) {
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
        if (taskDiv.innerHTML.length == 0) {
            delAll.className = "deleteAll";
        }
        
    }
    if(e.target.classList.contains("edit")) {
        let input = e.target.previousElementSibling.children[0];
            input.removeAttribute("readonly");
            input.focus();
            input.addEventListener('blur', event => {
                event.target.setAttribute('readonly', true);
                editTaskWith(e.target.parentElement.getAttribute("data-id"),event.target.value);
            });
    }
    if (e.target.classList.contains("task")) {
        statusTaskWith(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }
})
delAll.addEventListener("click" , (e) => {
        deleteTaskFromLocalStorage();
        e.target.className = "deleteAll";
});



function addTaskToPage(task) {
    taskDiv.innerHTML ="";
    countTask.textContent = ` Number Of Tasks : ${taskArr.length}`
    task.forEach(task => {
        let contentText = document.createElement("div");
        let taskMsg= document.createElement("div");
        taskMsg.innerHTML =`<textarea id="textarea"  readonly >${task.title}</textarea>` ;
        contentText.classList = "task";
        if (task.done) {
            contentText.className = "task done";
        }
        contentText.setAttribute("data-id",task.id);
        contentText.appendChild(taskMsg);
        let btn = document.createElement("button");
        let edit= document.createElement("button");
        btn.appendChild(document.createTextNode("delete"));
        edit.appendChild(document.createTextNode("edit"));
        btn.classList = "del";
        edit.classList = "edit";
        contentText.appendChild(edit);
        contentText.appendChild(btn);
        taskDiv.appendChild(contentText);
        app.appendChild(container);
        document.body.appendChild(app);
    })

};

function addTaskToLocalstorage(taskArr) {
    window.localStorage.setItem('task', JSON.stringify(taskArr));
}
function getTaskFromLocalstorage() {
    let data = window.localStorage.getItem("task");
    if (data) {
        let task = JSON.parse(data);
        addTaskToPage(taskArr);
    }
}

function deleteTaskWith(taskId) {
    taskArr = taskArr.filter(theTask => theTask.id != taskId);       
    countTask.textContent = ` Number Of Tasks : ${taskArr.length}`;
    addTaskToLocalstorage(taskArr);
}
function editTaskWith(taskId,taskValue) {
    for (let i = 0; i < taskArr.length; i++) {
        if(taskId == taskArr[i].id){
            taskArr[i].title = taskValue;
        }
    }
    addTaskToLocalstorage(taskArr);
}

function statusTaskWith(taskId) {
    for (let i = 0; i < taskArr.length; i++) {
        if( taskArr[i].id == taskId) {
            taskArr[i].done == false ? taskArr[i].done = true: taskArr[i].done = false;
        }
    }
    addTaskToLocalstorage(taskArr)
}
function deleteTaskFromLocalStorage () {
    taskArr = [];
    taskDiv.innerHTML = "";
    countTask.textContent = ` Number Of Tasks : ${0}`
    window.localStorage.clear();
}