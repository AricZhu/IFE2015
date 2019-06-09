var suggestText = ['Text1', 'Text234', 'Text132432', 'Texthahah'];
var matchedText = []
var isSearching = false;

window.onload = init;

function init () {
    bindInput();
    bindClickRet();
    bindKeyBoard();
}

function bindInput () {
    let inp = document.querySelector('#suggest');
    let suggestRet = document.querySelector('.suggest-text');
    inp.addEventListener('input', function () {
        let val = inp.value.trim();
        if (val) {
            // 显示搜索结果框
            isSearching = true;
            suggestRet.classList.remove('suggest-hide');
            searchResult(val);
        } else {
            // 删除搜索结果框
            isSearching = false;
            suggestRet.classList.add('suggest-hide');
        }
    });
    inp.addEventListener('blur', function () {
        isSearching = false;
        suggestRet.classList.add('suggest-hide');
    });
}

function searchResult (val) {
    let ret = document.querySelector('.suggest-text');
    matchedText = suggestText.filter(elem => elem.indexOf(val) !== -1);
    isSearching = false;
    if (!matchedText.length) {
        ret.innerHTML = '<p>无匹配的结果</p>'
        return;
    }
    let len = matchedText.length;
    let retStr = '';
    for (let i = 0; i < len; i ++) {
        retStr += `<p>${matchedText[i]}</p>`;
    }
    ret.innerHTML = retStr;
}

function bindClickRet () {
    let rets = document.querySelector('.suggest-text');
    rets.addEventListener('click', function (e) {
        let inp = document.querySelector('#suggest');
        inp.value = e.target.innerText;
    });
}

function bindKeyBoard () {
    let inp = document.querySelector('#suggest');
    inp.addEventListener('keydown', function (e) {
        let rets = document.querySelector('.suggest-text').children;
        let len = rets.length;
        let curActiveIdx = -1;
        for (let i = 0; i < len; i ++) {
            if (rets[i].classList.contains('ret-active')) {
                curActiveIdx = i;
                break;
            }
        }
        if ( e.key === 'ArrowUp' ) {
            curActiveIdx !== -1 && rets[curActiveIdx].classList.remove('ret-active');
            curActiveIdx = curActiveIdx <= 0? len - 1: curActiveIdx-1;
            rets[curActiveIdx].classList.add('ret-active');
        } else if( e.key === 'ArrowDown' ) {
            curActiveIdx !== -1 && rets[curActiveIdx].classList.remove('ret-active');
            curActiveIdx = curActiveIdx === len - 1? 0: curActiveIdx + 1;
            rets[curActiveIdx].classList.add('ret-active');
        } else if ( e.key === 'Enter' ) {
            curActiveIdx !== -1 && (inp.value = rets[curActiveIdx].innerText)
            isSearching = false;
            let suggestRet = document.querySelector('.suggest-text');
            suggestRet.classList.add('suggest-hide');
        }
    });
}
