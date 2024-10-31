tasks=[
    {
        title:"Studying JS",
        date: "10/16/2024",
        isDone:true
    },
    {
        title:"Studying React",
        date: "10/18/2024",
        isDone:false
    },
    {
        title:"Making a project",
        date: "10/20/2024",
        isDone:false
    }
];

function getTasksFromStorage(){
    let retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = retrievedTasks ?? [];
}
getTasksFromStorage();

function fillPageWithTasks(){
    document.getElementById("tasks").innerHTML="";
    let index=0;
    for(task of tasks){
        let content =  
        `<div class="${task.isDone? "doneTask": "task" }">
        
                <!-- task content -->
                <div class="taskContent"  style=" width:70%; color: white;  font-size: 20px;" >
                    <p>${task.title}</p>
                    <div style="display: flex; font-size: 16px; align-items: center;">
                        <span class="material-symbols-outlined" style=" color: rgb(255, 255, 255);font-size: 20px;">
                            calendar_month
                        </span>
                        <span>${task.date}</span>
                    </div>
                    <!-- task content -->
                    
                    <!-- task action -->
                    <div class="taskAction" style=" width:30%; color: black; height: 50px; display: flex; justify-content: space-between; align-items:center; margin-right: 10px;">
                        <button onclick= "updateTask(${index})" class="circular">
                            <span class="material-symbols-outlined">
                                edit
                            </span>
                        </button>
                       ${ task.isDone?`
                            <button onclick= "toggleTaskCompletion(${index})" class="circular">
                                <span class="material-symbols-outlined">close</span>
                            </button>
                            `
                            :
                            `
                            <button onclick= "toggleTaskCompletion(${index})" class="circular">
                                <span class="material-symbols-outlined">check</span>
                            </button>
                            `
                        }
                        <button onclick="deleteTask(${index})" class="circular">
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                        </button>
                    </div>
                </div>
        <!-- task action -->`;
        document.getElementById("tasks").innerHTML+= content;
        index++;
    }
                
}
fillPageWithTasks();
// let name = localStorage.getItem("name");
// alert(name);    
document.getElementById("addBtn").addEventListener("click",function(){
    let now = new Date();
    let nowdate =  (now.getMonth()+1)+'/'+now.getDate()+'/'+now.getFullYear();
    let taskContent= prompt("Please enter the task");
    let newObject = {
        title:taskContent,
        date: nowdate,
        isDone: false
    }
    tasks.push(newObject);
    let taskString= JSON.stringify(tasks);
    localStorage.setItem("tasks",taskString);
    document.getElementById("tasks").innerHTML=" ";
    fillPageWithTasks();
});
function deleteTask(index){
    let taskName =tasks[index]
    let isConfirmed= confirm(`Are you sure you wanna delete: ${taskName.title} Task`);
    if(isConfirmed){
        tasks.splice(index,1);
        storeTasks();
        fillPageWithTasks();
    }
}

function updateTask(index){
    let task = tasks[index];
    let newTaskTitle = prompt("Enter the updated task title",task.title);
    task.title =newTaskTitle;
    storeTasks();
    fillPageWithTasks();
}

function toggleTaskCompletion(index){
    let task = tasks[index];
    task.isDone= !task.isDone;
    storeTasks();
    fillPageWithTasks();
}

function storeTasks(){
    let taskString= JSON.stringify(tasks);
    localStorage.setItem("tasks",taskString);
}