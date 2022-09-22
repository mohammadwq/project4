
let taskText = document.querySelector('[name="taskText"]');
let submit = document.querySelector('[type="submit"]');
let taskDiv = document.querySelector(".content");
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
    if (taskText.value !== "") {
        addTaskToArr(taskText.value);
        taskText.value = "";
        delAll.className = "deleteAll active";  
        countTask.textContent = ` Number Of Tasks : ${taskArr.length}`
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
    taskDiv.style.cssText = "color:#5EC3FF;background-color:#eee; width:500px;border-radius:0 0 10px 10px;box-shadow:inset 0px 1px 20px 5px rgba(86, 215, 232, 0.2);";
    task.forEach(task => {
        let contentText = document.createElement("div");
        let taskMsg= document.createElement("h4");
        taskMsg.style.cssText = "font-family: arial;text-transform: capitalize;"
        taskMsg.appendChild(document.createTextNode(`${task.title}`));
        contentText.classList = "task";
        if (task.done) {
            contentText.className = "task done";
        }
        contentText.setAttribute("data-id",task.id);
        contentText.appendChild(taskMsg);
        contentText.style.cssText ="display:flex;justify-content:space-between;margin:0px 0px; padding:20px;"
        let btn = document.createElement("button");
        btn.appendChild(document.createTextNode("delete"));
        btn.classList = "del";
        btn.style.cssText = "color:inherit;cursor:pointer;border-style:none;text-decoration: none;padding:5px 10px;background-color:inherit;border-radius: 10px 0 10px 0;font-size:16px";
        contentText.appendChild(btn)
        taskDiv.appendChild(contentText);
        document.body.appendChild(taskDiv);
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
    taskArr = taskArr.filter(theTask => theTask.id != taskId);        countTask.textContent = ` ${taskArr.length} Numbers Of Tasks`
    countTask.textContent = ` Number Of Tasks : ${taskArr.length}`;
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