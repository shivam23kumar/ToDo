let tasks = [];

const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('list');
const taskCounter = document.getElementById('list');


function renderList(){};

function markTaskAsComplete(taskId){
    const task = tasks.filter(function(task){
        task.id === taskId;
    })

    if(task.length>0){
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled successfully');
        return;
    }
    showNotification('Task did not toggled successfully');
}

function deleteTask(taskId) {
    const newTasks = tasks.filter(function(task){
        task.id !== taskId;
    })
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
            showNotification("Task text can't be empty");
            return;
        }
        const task = {
            text,
            id = Date.now().toString(),
            done:false
        }
        e.target.value='';
        addTask(task);

    }
    
}

addTaskInput.addEventListener('keyup', handleInputKeypress);