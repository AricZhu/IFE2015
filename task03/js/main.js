import '../icon/iconfont.js'
import '../css/style.css'
import tasks from './data.js'

window.onload = init;

function init () {
    bindAddOrder();
    bindAddTask();
    updateTaskOrder();
    bindTaskListHead();
}

function bindAddOrder () {
    // 为新增分类按钮绑定事件
    let newOrder = document.querySelector('#new-order');
    newOrder.addEventListener('click', () => document.querySelector('#modal-add-order').classList.remove('modal-hide'));

    // 为模态框绑定事件
    let modal = document.querySelector('#modal-add-order');
    let btnCancel = document.querySelector('#modal-add-order .modal-cancel');
    let btnOk = document.querySelector('#modal-add-order .modal-ok');
    btnCancel.addEventListener('click', function () {
        modal.classList.add('modal-hide');
    });
    btnOk.addEventListener('click', addTaskOrder);
}
function bindAddTask () {
    let newTask = document.querySelector('#new-task');
    newTask.addEventListener('click', function () {
        editTaskDesc('', true);
    });
}
function addTaskOrder () {
    let val = document.querySelector('#modal-add-order input').value;
    val = val? val.trim(): null;
    if (val) {
        // 如果当前选中了默认分类，则弹出警告：不能在默认分类中添加分类
        // 如果当前选中了其他分类，则直接在其他分类下添加子分类
        // 如果当前没有选中任何分类，则在默认分类前添加一个分类
        let folderOpenDom = document.querySelector('.task-item-folder-expand');
        if (!folderOpenDom) {
            tasks.splice(tasks.length - 1, 0, {orderName: val, children: []});
            updateTaskOrder();
        } else if (folderOpenDom.querySelector('.task-folder-head').textContent === '默认分类') {
            window.alert('默认分类中不能添加子类!');
        } else {
            let folderItem = tasks.find(task => task.orderName === folderOpenDom.querySelector('.task-folder-head').textContent);
            folderItem.children.push({taskName: val, children: []});
            let activeFile;
            if (folderOpenDom.querySelector('.task-folder-file-active')) {
                activeFile = folderOpenDom.querySelector('.task-folder-file-active').textContent;
            }
            updateTaskOrder(folderOpenDom.querySelector('.task-folder-head').textContent, activeFile);
        }
        document.querySelector('#modal-add-order').classList.add('modal-hide');
    } else {
        window.alert('分类名不能为空!');
    }
}

function removeTaskOrder (orderName) {
    if (orderName === '默认分类') {
        return window.alert('不能删除默认分类!');
    }
    let idx = tasks.findIndex(task => task.orderName === orderName);
    tasks.splice(idx, 1);
    updateTaskOrder();
}

function updateTaskOrder (openFolder='', activeFile='') {
    let dom = document.querySelector('.task-order-list');
    dom.innerHTML = '';
    tasks.forEach(task => dom.appendChild(updateSingleTaskOrder(task, openFolder, activeFile)));
}

function updateSingleTaskOrder (task, openFolder, activeFile) {
    // create folder-name dom.
    let folderNameDom = document.createElement('div');
    let totalUndoCount = 0;
    folderNameDom.classList.add('folder-name');
    folderNameDom.innerHTML = `${task.orderName}`;
    // create task folder head dom.
    let taskFoldereHeadDom = document.createElement('div');
    taskFoldereHeadDom.classList.add('task-folder-head');
    if (task.orderName !== '默认分类' && task.orderName !== openFolder) {
        taskFoldereHeadDom.innerHTML = '<svg class="icon icon-folder" aria-hidden="true"><use xlink:href="#icon-folder"></use></svg>';
    } else {
        taskFoldereHeadDom.innerHTML = '<svg class="icon icon-folder-open" aria-hidden="true"><use xlink:href="#icon-folder-open"></use></svg>';
    }
    taskFoldereHeadDom.appendChild(folderNameDom);
    // bind remove taskFolder tag
    let removeTaskFolder = document.createElement('div');
    removeTaskFolder.classList.add('remove-task-folder');
    removeTaskFolder.classList.add('hide-remove-task');
    removeTaskFolder.innerHTML = 'x';
    taskFoldereHeadDom.appendChild(removeTaskFolder);
    // bind hover to disp remove
    taskFoldereHeadDom.addEventListener('mouseover', function () {
        this.querySelector('.remove-task-folder').classList.remove('hide-remove-task');
    });
    taskFoldereHeadDom.addEventListener('mouseleave', function () {
        this.querySelector('.remove-task-folder').classList.add('hide-remove-task');
    })
    // bind click event for task-folder-head tag.
    taskFoldereHeadDom.addEventListener('click', handleClickTaskFolder);
    // create task item folder dom.
    let taskItemFolderDom = document.createElement('div');
    taskItemFolderDom.classList.add('task-item-folder');
    if (task.orderName === '默认分类' || task.orderName === openFolder) {
        taskItemFolderDom.classList.add('task-item-folder-expand');
    }
    taskItemFolderDom.appendChild(taskFoldereHeadDom);
    if (task.children.length) {
        task.children.forEach(taskItem => {
            // create file-name dom.
            let fileNameDom = document.createElement('div');
            let undoCount = 0;
            taskItem.children.forEach(item => !item.completed && undoCount++);
            totalUndoCount += undoCount;
            fileNameDom.classList.add('file-name');
            fileNameDom.setAttribute('data-undo-count', `( ${undoCount} )`);
            fileNameDom.innerHTML = `<span>${taskItem.taskName}</span>`;
            // create task-folder-file dom.
            let taskFolderFileDom = document.createElement('div');
            taskFolderFileDom.classList.add('task-folder-file');
            if (taskItem.taskName === activeFile) {
                taskFolderFileDom.classList.add('task-folder-file-active');
            }
            taskFolderFileDom.innerHTML = '<svg class="icon icon-file" aria-hidden="true"><use xlink:href="#icon-file"></use></svg>';
            taskFolderFileDom.appendChild(fileNameDom);
            // add to task-item-folder dom.
            taskItemFolderDom.appendChild(taskFolderFileDom);
            // bind click event for task-folder-file
            taskFolderFileDom.addEventListener('click', handleClickTaskFile);
        });
    }
    // set totalUndoCount
    folderNameDom.setAttribute('data-undo-count', `( ${totalUndoCount} )`);
    return taskItemFolderDom;
}

function handleClickTaskFolder (ev) {
    if (ev.target.classList.contains('remove-task-folder')) {
        return removeTaskOrder(ev.target.parentNode.querySelector('.folder-name').textContent);
    }
    let taskItemFolder = ev.currentTarget.parentNode;
    if (!taskItemFolder) {
        return;
    }
    // change other folders to icon-folder
    let otherTaskItemFolders = document.querySelectorAll('.task-order-list .task-item-folder')
    otherTaskItemFolders.forEach(taskItem => {
        if (taskItem !== taskItemFolder) {
            taskItem.classList.remove('task-item-folder-expand');
            taskItem.querySelector('svg').innerHTML = '<use xlink:href="#icon-folder">';
        }
    });
    if (taskItemFolder.classList.contains('task-item-folder-expand')) {
        taskItemFolder.classList.remove('task-item-folder-expand')
        // change svg to icon-folder
        let svgDom = taskItemFolder.querySelector('svg');
        svgDom.innerHTML = '<use xlink:href="#icon-folder">';
    } else {
        taskItemFolder.classList.add('task-item-folder-expand');
        // change svg to icon-folder-open
        let svgDom = taskItemFolder.querySelector('svg');
        svgDom.innerHTML = '<use xlink:href="#icon-folder-open">';
    }
}

function handleClickTaskFile (ev) {
    let allFiles = document.querySelectorAll('.task-item-folder .task-folder-file');
    allFiles.forEach(file => file !== ev.currentTarget? file.classList.remove('task-folder-file-active'): null);
    let classLists = ev.currentTarget.classList;

    if (classLists.contains('task-folder-file-active')) {
        classLists.remove('task-folder-file-active');
    } else {
        classLists.add('task-folder-file-active');
    }
    updateTaskListContent();
}

function updateTaskListContent () {
    // 获取当前的 filter
    let listActiveHeadDom = document.querySelector('.task-lists .head-item-active');
    let filter = listActiveHeadDom.textContent === '所有'
                    ? 'all'
                    : (listActiveHeadDom.textContent === '未完成'? false: true)
    let task = getCurrentTask(filter);
    // 渲染标签
    renderListContent(task);
}
function bindTaskListHead () {
    let taskHeadDom = document.querySelector('.task-lists .list-head');
    taskHeadDom.addEventListener('click', function (ev) {
        if (!ev.target.classList.contains('list-head-item')) {
            return;
        }
        Array.from(ev.currentTarget.children).forEach(ch => ch.classList.remove('head-item-active'));
        ev.target.classList.add('head-item-active');
        let filter = (ev.target.textContent === '所有'
                        ? 'all' 
                        : (ev.target.textContent === '未完成'
                            ? false
                            : true))
        let task = getCurrentTask(filter);
        renderListContent(task);
    });
    document.querySelector('.task-lists .list-content').addEventListener('click', dispTodoDesc);
}
function getCurrentTask (filter='all') {
    // 找到当前选中的 task-file
    let activeFile = document.querySelector('.task-item-folder .task-folder-file-active');
    let task = [];
    if (!activeFile) {
        console.log('no file selected.');
    } else {
        let folderName = activeFile.parentNode.querySelector('.folder-name').textContent;
        let fileName = activeFile.querySelector('.file-name').textContent;
        // 从 tasks 中获取到当前的所有任务
        outer:
        for (let i = 0; i < tasks.length; i ++) {
            if (tasks[i].orderName !== folderName) {
                continue;
            }
            for (let j = 0; j < tasks[i].children.length; j ++) {
                if (tasks[i].children[j].taskName !== fileName) {
                    continue;
                }
                task = tasks[i].children[j].children;
                break outer;
            }
        }
    }
    if (!task.length) {
        console.log('任务为空!');
    }
    /*
    * function: 将符合 filter 的任务按时间重新进行整合
    * output: [{'2015-04-28': ['todo 1', 'todo 2']}, {'2015-04-29': ['todo 3', 'todo 4']}, ...]
    */
    let taskOrderByTime = [];
    for (let i = 0; i < task.length; i ++) {
        let item = task[i];
        if (filter === false) {
            if (item.completed) {
                continue;
            }
        } else if (filter === true) {
            if (!item.completed) {
                continue;
            }
        }
        let taskItem = taskOrderByTime.find(elem => item.time in elem);
        if (taskItem) {
            taskItem[item.time].push(item.todoName);
        } else {
            taskOrderByTime.push( { [item.time]: [item.todoName] } );
        }
    }
    return taskOrderByTime;
}
function renderListContent (task) {
    let listContentDom = document.querySelector('.task-lists .list-content');
    listContentDom.innerHTML = '';
    task.forEach(taskItem => {
        let time = Object.keys(taskItem)[0];
        let todos = taskItem[time];
        let domItem = document.createElement('div');
        domItem.classList.add('list-task-item');
        let inHTML = `<div class="list-task-time">${time}</div>`;
        todos.forEach(todo => inHTML += `<div class="list-task-title">${todo}</div>`);
        domItem.innerHTML = inHTML;
        listContentDom.appendChild(domItem)
    });
}
function dispTodoDesc (ev) {
    if (ev.target.classList.contains('list-task-title')) {
        // active current todo
        if (ev.target.classList.contains('list-task-title-active')) {
            ev.target.classList.remove('list-task-title-active');
        } else {
            let alltodos = document.querySelectorAll('.list-task-item .list-task-title');
            alltodos.forEach(todo => todo.classList.remove('list-task-title-active'))
            ev.target.classList.add('list-task-title-active');
        }
        // get todo
        let todo = getCurrentTodo();
        renderTaskDesc(todo);
    }
}
function getCurrentTodo () {
    let activeFile = document.querySelector('.task-item-folder .task-folder-file-active');
    let todoTask = [];
    if (!activeFile) {
        console.log('no file selected.');
    } else {
        let folderName = activeFile.parentNode.querySelector('.folder-name').textContent;
        let fileName = activeFile.querySelector('.file-name').textContent;
        // 从 tasks 中获取到当前的所有任务
        outer:
        for (let i = 0; i < tasks.length; i ++) {
            if (tasks[i].orderName !== folderName) {
                continue;
            }
            for (let j = 0; j < tasks[i].children.length; j ++) {
                if (tasks[i].children[j].taskName !== fileName) {
                    continue;
                }
                todoTask = tasks[i].children[j].children;
                break outer;
            }
        }
    }
    let activeTodo = document.querySelector('.list-task-item .list-task-title-active');
    let todoItem = null;
    if (activeTodo) {
        todoItem = todoTask.find(todo => todo.todoName === activeTodo.textContent);
    }

    return todoItem;
}

function renderTaskDesc (todo) {
    let taskDescDom = document.querySelector('.task-desc');
    taskDescDom.innerHTML = `
        <div class="task-title">
            <div class="task-action">
                <svg class="icon icon-check" aria-hidden="true">
                    <use xlink:href="#icon-check-circle"></use>
                </svg>
                <svg class="icon icon-edit" aria-hidden="true">
                    <use xlink:href="#icon-edit-square"></use>
                </svg>
            </div>
            <div class="task-name">${todo? todo.todoName: ''}</div>
        </div>
        <div class="task-datetime">
            任务日期：<span>${todo? todo.time: ''}</span>
        </div>
        <div class="task-content">${todo? todo.content: ''}</div>
    `
    bindTodoAction(false);
}
function editTaskDesc (todo, isNew=false) {
    let taskDescDom = document.querySelector('.task-desc');
    taskDescDom.innerHTML = `
        <div class="task-title">
            <div class="task-action">
                <svg class="icon icon-check" aria-hidden="true">
                    <use xlink:href="#icon-check-circle"></use>
                </svg>
                <svg class="icon icon-edit" aria-hidden="true">
                    <use xlink:href="#icon-edit-square"></use>
                </svg>
            </div>
            <div class="task-name"><input id="todoTitle" type="text" placeholder="输入todo名" value=${todo? todo.todoName: ''}></div>
        </div>
        <div class="task-datetime">
            任务日期：<span><input id="todoTime" type="text" placeholder="输入时间" value=${todo? todo.time: ''}></span>
        </div>
        <div class="task-content"><textarea id="todoContent" rows="20" cols="80" placeholder="输入任务内容">${todo? todo.content: ''}</textarea></div>
    `
    bindTodoAction(isNew);
}
function bindTodoAction (isNew) {
    // bind ok button
    let okBtn = document.querySelector('.task-title .icon-check');
    okBtn.addEventListener('click', function () {
        if (isNew) {
            return newTask();
        } else {
            return editTask();
        }
    });
    // bind edit button
    let editBtn = document.querySelector('.task-title .icon-edit');
    editBtn.addEventListener('click', function () {
        return editTaskDesc(getCurrentTodo(), false);
    });
}
function newTask () {
    // get active file
    let activeFile = document.querySelector('.task-item-folder .task-folder-file-active');
    let task = [];
    if (!activeFile) {
        console.log('no file selected.');
    } else {
        let folderName = activeFile.parentNode.querySelector('.folder-name').textContent;
        let fileName = activeFile.querySelector('.file-name').textContent;
        // 从 tasks 中获取到当前的所有任务
        outer:
        for (let i = 0; i < tasks.length; i ++) {
            if (tasks[i].orderName !== folderName) {
                continue;
            }
            for (let j = 0; j < tasks[i].children.length; j ++) {
                if (tasks[i].children[j].taskName !== fileName) {
                    continue;
                }
                task = tasks[i].children[j].children;
                break outer;
            }
        }
    }
    if (!task.length) {
        console.log('任务为空!');
    }
    // add new todo to task
    let todoName = document.querySelector('#todoTitle').value.trim();
    let time = document.querySelector('#todoTime').value.trim();
    let content = document.querySelector('#todoContent').value.trim();
    let completed = false;
    console.log(`todoName: ${todoName}, time: ${time}, content: ${content}, completed: ${completed}`);
    task.push({todoName, time, content, completed});
    // 重新渲染listContent, 以及task-desc
    updateTaskListContent();
    renderTaskDesc();
}
function editTask () {
    let todo = getCurrentTodo();
    let todoName = document.querySelector('#todoTitle').value.trim();
    let time = document.querySelector('#todoTime').value.trim();
    let content = document.querySelector('#todoContent').value.trim();
    todo.todoName = todoName;
    todo.time = time;
    todo.content = content;
    todo.completed = true;
    // 重新渲染listContent
    updateTaskListContent();
    renderTaskDesc();
}
