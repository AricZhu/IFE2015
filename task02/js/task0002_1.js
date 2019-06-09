const validInput = function (target) {
    let val = target.value;
    let hobbies = val.split(/\n|\s+|,|、|;/);
    if (hobbies.length > 10) {
        return false;
    } else {
        return true;
    }
}

const stopInput = function (event) {
    if (event.code !== 'Backspace') {
        console.log('stop input event.');
        event.preventDefault();
    }
}

const handlerInput = function (event) {
    let target = event.target;
    let errMsg = document.querySelector('#err_msg');
    if (validInput(target)) {
        errMsg.classList.add('hide');
        event.target.removeEventListener('keydown', stopInput);
    } else {
        errMsg.classList.remove('hide');
        // 阻止新的内容输入
        event.target.addEventListener('keydown', stopInput)
    }
}

const bindSubmit = function () {
    let subBtn = document.querySelector('#submit');
    if (!subBtn) {
        return false;
    }
    subBtn.addEventListener('click', showInputRet);
}

const bindInput = function () {
    let inp = document.querySelector('#hobby');
    if (!inp) {
        return false;
    }
    inp.addEventListener('input', handlerInput);
}

const dispHobby = function (hobbies) {
    let disp = document.querySelector('#hobby-disp');
    if (!disp) {
        return false;
    }
    let text = '';
    hobbies.forEach(hobby => {
        let item = `<label style="margin-right: 10px;">${hobby}<input type="checkbox" value="${hobby}"></label>`;
        text += item;
    });
    disp.innerHTML = text;
}

const showInputRet = function (event) {
    let inp = document.querySelector('#hobby');
    if (!inp) {
        return false;
    }
    if (!validInput(inp)) {
        console.log('爱好数量超过10个无法提交');
        return false;
    }
    let val = inp.value;
    let hobbies = val.split(/\n|\s+|,|、|;/);
    // filter empty
    hobbies = hobbies.map(hobby => hobby.trim()).filter(hobby => hobby);
    // filter repeat
    let newHobby = [];
    hobbies.forEach(hobby => {
        if (newHobby.indexOf(hobby) === -1) {
            newHobby.push(hobby);
        }
    });
    return dispHobby(newHobby);
}

const init = function () {
    bindSubmit();
    bindInput();
}

window.onload = init;
