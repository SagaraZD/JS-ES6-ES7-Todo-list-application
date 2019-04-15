//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all evnet listeners
function loadEventListeners(){
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event 
    form.addEventListener('submit', addTask);
    //Remove task 
    taskList.addEventListener('click', removeTask);
    //Clear tasks event 
    clearBtn.addEventListener('click', clearTasks);
    //Filter tasks 
    filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Create li elements
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        //Create new link element
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Add icon
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link on li
        li.appendChild(link);

        //Append li to the ul
        taskList.appendChild(li);

    });
}

//Add Task
function addTask(e){

        if(taskInput.value === ''){
            alert('Add a task');
        } else{
        //Create li elements
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        //Create new link element
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Add icon
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link on li
        li.appendChild(link);

        //Append li to the ul
        taskList.appendChild(li);

        //Stoer in LS
        storeTaskInLocalStorage(taskInput.value);

        //Clear input 
        taskInput.value ='';
        }

        e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}


//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains
        ('delete-item')){
         if(confirm('Are you Sure ? ')) {
            e.target.parentElement.parentElement.remove();
            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
         }
        
    }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear tasks
function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}

//Clear Tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//Filter Tasks 
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else {
            task.style.display = 'none';
        }
    });
}