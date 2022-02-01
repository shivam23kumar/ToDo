var TodoListApp =(function(){
    let tasks = [];
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

async function fetchToDos() {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        tasks = data.slice(0,10);
        renderList();
    }catch(error){
        console.log(error);
    }
    
    
}
function addTaskToDOM(task) {
    const li = document.createElement('li');

    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="bin.svg" class="delete" data-id="${task.id}" />
    `;
    tasksList.append(li);
}

function renderList(){
    tasksList.innerHTML = '';

    for(let i =0; i<tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;

};

// function toggleTask(taskId){
//     const task = tasks.filter(function(task){
//         task.id === taskId;
//     })

//     if(task.length>0){
//         const currentTask = task[0];
//         currentTask.completed = !currentTask.completed;
//         renderList();
//         showNotification('Task toggled successfully');
//         return;
//     }
//     showNotification('Task did not toggled successfully');
// }

function deleteTask(taskId) {
    const newTasks = tasks.filter(function(task){
        return task.id !== taskId;
    });
    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully');
}

function addTask (task){
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }
    showNotification('Task can not be added.')

}

function showNotification(text){
    alert(text);
}

function handleInputKeypress(e){
    if(e.key === 'Enter'){
        const text = e.target.value;
        if(!text){
            showNotification('Task text can not be empty');
            return;
        }
        const task = {
            title : text,
            id: Date.now().toString(),
            completed:false
        }
        e.target.value='';
        addTask(task);

    }
    
}

function handleClickListener(e) {
    const target = e.target;
    if(target.className === 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }
    else if(target.className === 'custom-checkbox'){
        const taskId = target.id;
        //toggleTask(taskId);
        return;
    }
}


function initialiseApp() {
    fetchToDos();
    addTaskInput.addEventListener('keyup', handleInputKeypress);
    document.addEventListener('click', handleClickListener);
}
return{
    initialise:initialiseApp
}


})();
