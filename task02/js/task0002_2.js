var time = {
    timeId: -1,
    inputTime: '',
    restTime: ''
}

function init () {
    console.log('window page load.');
    bindInputTime();
    bindCalc();
}

function bindInputTime() {
    let inp = document.querySelector('#input-time');
    if (!inp) {
        throw new Error('cannot find input-time element.');
    }
    inp.addEventListener('input', handlerInput);
}

function bindCalc () {
    let btn = document.querySelector('#calc-time');
    if (!btn) {
        throw new Error('cannot find calc-time element.');
    }
    btn.addEventListener('click', handlerBtnClick);
}

function handlerInput(e) {
    let val = e.target.value;
    let pattern = /.*(\d{4}-\d{2}-\d{2}\s\d\d:\d\d:\d\d|\d{4}-\d{2}-\d{2}).*/;
    let ret = val.match(pattern);
    if (ret) {
        time.inputTime = ret[1];
    } else {
        time.inputTime = null;
    }
    console.log('current time is: ');
    console.log(time);
}

function handlerBtnClick () {
    // 开始计时
    if (time.timeId > 0) {
        clearInterval(time.timeId);
    }
    time.timeId = setInterval(() => {
        updateRestTime();
    }, 1000);
    console.log(`start timer: ${time.timeId}`);
}

function updateRestTime () {
    let disp = document.querySelector('#disp-time');
    if (!disp) {
        throw new Error('cannot find disp-time element!');
    }
    let inputs = time.inputTime && time.inputTime.split('-');
    if (!inputs) {
        disp.innerHTML = '请先输入输入正确的日期格式!';
        return;
    }
    if (calcRestTime()) {
        // 将当前时间差显示在下方
        disp.innerHTML = `距离${inputs[0]}年${inputs[1]}月${inputs[2]}日还有${time.restTime}`;
    } else {
        console.log(`clear time: ${time.timeId}`);
        clearInterval(time.timeId);
        disp.innerHTML = `距离${inputs[0]}年${inputs[1]}月${inputs[2]}日还有${time.restTime}`;
    }
}

function calcRestTime () {
    let [curTime, inputTime] = [new Date(), new Date(time.inputTime)];
    let rest = Math.floor((inputTime - curTime) / 1000);
    if (rest <= 0) {
        time.restTime = '0天0小时0分钟0秒';
        return false;
    }

    let days = Math.floor(rest / (24 * 3600));
    let restHMS = rest % (24 * 3600);
    let hours = Math.floor(restHMS / 3600);
    let restMS = restHMS % 3600;
    let minutes = Math.floor(restMS / 60);
    let seconds = restMS % 60;
    time.restTime = `${days}天${hours}小时${minutes}分钟${seconds}秒`;

    return true;
}

window.onload = init;
