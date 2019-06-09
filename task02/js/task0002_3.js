var setting = {
    order: 'normal',
    isLoop: true,
    activeImgIdx: 0,
    timeId: -1,
    loopTime: 1000
}

window.onload = init;

function init () {
    bindSetting();
    bindImgContainer();
    if (setting.timeId > 0) {
        return;
    }
    setting.timeId = setInterval(moveImg, setting.loopTime);
}

function bindImgContainer () {
    let imgContainer = document.querySelector('.img-disp');
    imgContainer.addEventListener('mouseover', function () {
        console.log(`clear timer: ${setting.timeId}`);
        clearInterval(setting.timeId);
        setting.timeId = -1;
    });
    imgContainer.addEventListener('mouseout', function () {
        if (setting.timeId < 0) {
            setting.timeId = setInterval(moveImg, setting.loopTime);
            console.log(`set timer: ${setting.timeId}`);
        }
    });
}

function bindSetting () {
    let orderNormal = document.querySelector('#order-normal');
    orderNormal.addEventListener('click', function () { setting.order = 'normal' });
    let orderReverse = document.querySelector('#order-reverse');
    orderReverse.addEventListener('click', function () { setting.order = 'reverse' });

    let checkLoop = document.querySelector('#check-loop');
    checkLoop.addEventListener('click', function () { setting.isLoop = !setting.isLoop});

    let inputTime = document.querySelector('#loop-time');
    inputTime.addEventListener('input', function (e) {
        let val = parseInt(e.target.value);
        if (isNaN(val)) {
            setting.loopTime = 1000;
        } else {
            setting.loopTime = val > 1000? val: 1000;
        }
        console.log(`clear timer: ${setting.timeId}`);
        clearInterval(setting.timeId);
        setting.timeId = setInterval(moveImg, setting.loopTime);
        console.log(`set timer: ${setting.timeId}`)
    });
}

function moveImg () {
    let imgContainer = document.querySelector('.img-disp');
    let imgWidth = imgContainer.firstElementChild.offsetWidth;
    let imgNum = imgContainer.childElementCount;
    let oldLeft = parseInt(imgContainer.style.left);
    let newLeft = setting.order === 'normal'? (oldLeft - imgWidth): (oldLeft + imgWidth);
    if (!setting.isLoop) {
        if (newLeft > 0 || newLeft <= -imgNum * imgWidth) {
            return;
        }
    }
    if (newLeft <= -imgNum * imgWidth) {
        newLeft = 0;
    } else if (newLeft > 0) {
        newLeft = -(imgNum - 1) * imgWidth;
    }
    imgContainer.style.left = newLeft + 'px';
    dispActiveDot(newLeft);
}

function dispActiveDot (left) {
    let imgContainer = document.querySelector('.img-disp');
    let imgWidth = imgContainer.firstElementChild.offsetWidth;
    let idx = parseInt(-left / imgWidth);
    let dots = document.querySelector('.loop-img-idx');
    let dotsChildren = dots.children;
    let len = dotsChildren.length;
    for (let i = 0; i < len; i ++) {
        dotsChildren[i].classList.remove('idx-circle-active');
    }
    dotsChildren[idx].classList.add('idx-circle-active');
}
