window.onload = init;

function init () {
    initDragStartHandler();
    initDropHandler();
}

function initDragStartHandler () {
    let dragItems = document.querySelectorAll('.drag-item');
    if (!dragItems) {
        throw new Error('cannot find drag items!');
    }
    let len = dragItems.length;
    for (let i = 0; i < len; i ++) {
        dragItems[i].addEventListener('dragstart', dragStartHandler);
    }
}

function initDropHandler () {
    let leftPanel = document.querySelector('#left-panel');
    let rightPanel = document.querySelector('#right-panel');
    leftPanel.addEventListener('drop', dropHandler);
    leftPanel.addEventListener('dragover', dragoverHandler);
    leftPanel.addEventListener('dragleave', dragLeaveHandler);
    rightPanel.addEventListener('drop', dropHandler);
    rightPanel.addEventListener('dragover', dragoverHandler);
    rightPanel.addEventListener('dragleave', dragLeaveHandler);
}

function dragStartHandler (ev) {
    console.log(`start drag item: ${ev.target.id}`);
    ev.dataTransfer.setData('text/plain', ev.target.id);
}

function dropHandler (ev) {
    ev.preventDefault();
    let dragId = ev.dataTransfer.getData('text');
    ev.target.insertBefore(document.querySelector(`#${dragId}`), ev.target.lastElementChild);
    ev.target.classList.remove('dragable-border-disp');
    ev.target.lastElementChild.classList.contains('drag-add-tips') && ev.target.lastElementChild.classList.add('tips-hide');
}

function dragoverHandler (ev) {
    ev.preventDefault();
    ev.target.classList.add('dragable-border-disp');
    ev.target.lastElementChild.classList.remove('tips-hide');
}

function dragLeaveHandler (ev) {
    ev.target.classList.remove('dragable-border-disp');
    ev.target.lastElementChild && ev.target.lastElementChild.classList.contains('drag-add-tips') && ev.target.lastElementChild.classList.add('tips-hide');
}
