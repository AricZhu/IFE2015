import '../css/style.css'

window.onload = function () {
    /* page1 --> page2 */
    let page1 = document.querySelector('#page1');
    let page2 = document.querySelector('#page2');
    let page3 = document.querySelector('#page3');
    let taskOrders = document.querySelectorAll('#page1 .task-order');
    taskOrders.forEach(taskorder => {
        taskorder.addEventListener('touchstart', function () {
            page1.classList.add('page1-hide');
            page2.classList.remove('page2-hide');
        }, false);
    });
    /* page1 <-- pageg2 */
    let page2Slide = page2.querySelector('.page2-slide');
    page2Slide.addEventListener('touchstart', function () {
        page1.classList.remove('page1-hide');
        page2.classList.add('page2-hide');
    }, false);
    /* page2 --> page3 */
    let taskItems = document.querySelectorAll('#page2 .task-item');
    taskItems.forEach(taskItem => {
        taskItem.addEventListener('touchstart', function () {
            page2.classList.add('page2-hide-left');
            page3.classList.remove('page3-hide');
        }, false);
    })
    /* page2 <-- page3 */
    let page3Slide = page3.querySelector('.page3-slide');
    page3Slide.addEventListener('touchstart', function () {
        page2.classList.remove('page2-hide-left');
        page3.classList.add('page3-hide');
    }, false);
}
