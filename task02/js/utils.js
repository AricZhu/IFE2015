// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    // your implement
    element.classList.add(newClassName);
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    element.classList.remove(oldClassName);
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    let pos = element.getBoundingClientRect();
    return {x: pos.left, y: pos.top}
}
// 实现一个简单的Query
var Query = {
    isIdQuery (selector) {
        return selector[0] === '#';
    },
    isTagQuery (selector) {
        return (
                (selector[0] >= 'a' && selector[0] <= 'z')
                || (selector[0] >= 'A' && selector[0] <= 'Z')
            )
    },
    isClassQuery (selector) {
        return selector[0] === '.';
    },
    isAttrQuery (selector) {
        return selector[0] === '[';
    },
    doIdQuery (selector) {
        let id = selector[0] === '#'? selector.substring(1): selector;
        return document.getElementById(id);
    },
    doTagQuery (selector) {
        let eles = document.getElementsByTagName(selector)
        return eles.length? eles[0]: null;
    },
    doClassQuery (selector) {
        let cls = selector[0] === '.'? selector.substring(1): selector;
        let eles = document.getElementsByClassName(cls);
        return eles.length? eles[0]: null;
    },
    doAttrQuery (selector) {
        let attrs = selector[0] === '['? selector.substring(1, selector.length - 1): selector;
        let [attr, val] = attrs.split('=');
        let eles = document.getElementsByTagName('*');
        for (let i = 0; i < eles.length; i ++) {
            if (eles[i].hasAttribute(attr) && (!val || eles[i].getAttribute(attr) === val)) {
                return eles[i];
            }
        }
        return null;
    },
    // 组合查询，这里只支持一种情况：#id .class
    doCombQuery (selector) {
        let [id, cls] = selector.split(' ').map(elem => elem.substring(1));
        let elem = Query.doIdQuery(id);
        let children = elem.children;
        for (let i = 0; i < children.length; i ++) {
            if (children[i].className.indexOf(cls) !== -1) {
                return children[i];
            }
        }
        return null;
    }
}
function $(selector) {
    if (typeof selector === 'object') {return selector};
    let cls = selector.split(" ");
    // 组合查询
    if (cls.length >= 2) {
        return Query.doCombQuery(selector);
    } else {
        if (Query.isIdQuery(selector)) {
            return Query.doIdQuery(selector);
        } else if (Query.isTagQuery(selector)) {
            return Query.doTagQuery(selector);
        } else if (Query.isClassQuery(selector)) {
            return Query.doClassQuery(selector);
        } else if (Query.isAttrQuery(selector)) {
            return Query.doAttrQuery(selector);
        }
    }
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
    let ele = $(element);
    if (!ele) {return false;}
    ele.addEventListener(event, listener, false);
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    // your implement
    let ele = $(element);
    if (!ele) {return false;}
    ele.removeEventListener(event, listener);
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
    addEvent(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
    addEvent(element, 'keyup', function (e) {
        if (e.keyCode === 13) {
            listener();
        }
    });
}

// 接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
// 
// addEvent(element, event, listener) -> $.on(element, event, listener);
// removeEvent(element, event, listener) -> $.un(element, event, listener);
// addClickEvent(element, listener) -> $.click(element, listener);
// addEnterEvent(element, listener) -> $.enter(element, listener);
$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;

const each = function (lists, fn) {
    Array.from(lists).forEach(function (list) {
        fn(list);
    });
}

// 使用事件代理
function delegateEvent(element, tag, eventName, listener) {
    // your implement
    let eles = $(element);
    Array.from(eles.children).forEach(function (ele) {
        if (ele.tagName.toLowerCase() === tag.toLowerCase()) {
            addEvent(ele, eventName, listener);
        }
    });
}
$.delegate = delegateEvent;

// 使用示例：
// $.click("[data-log]", logListener);
// $.delegate('#list', "li", "click", liClicker);

$.on = function (selector, event, listener) {
    // your implement
    return addEvent(selector, event, listener);
}

$.click = function (selector, listener) {
    // your implement
    return addEvent(selector, 'click', listener)
}

$.un = function (selector, event, listener) {
    // your implement
    return removeEvent(selector, event, listener);
}

$.delegate = function (selector, tag, event, listener) {
    // your implement
    return delegateEvent(selector, tag, event, listener);
}

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }   
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11  
    }else{
        return -1;//不是ie浏览器
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
    let d = new Date();
    d.setTime(d.getTime() + (expiredays * 24 * 3600 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path/";
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
    let name = cookieName + "=";
    let decodeCookie = decodeURIComponent(document.cookie);
    let ca = decodeCookie.split(';');
    for (let i = 0; i < ca.length; i ++) {
        let c = ca[i];
        while (c.chartAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

//
function ajax(url, options) {
    // your implement
    let method = options.type || 'get';
    let data = options.data || '';
    method = method.toLowerCase();
    let promise = new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        const handlerState = function () {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    options.onsuccess && options.onsuccess(xhr.responseText, xhr);
                    resolve(xhr.responseText);
                } else {
                    options.onfail && options.onfail(xhr.responseText, xhr);
                    reject(new Error(xhr.statusText));
                }
            }
        };
        xhr.onreadystatechange = handlerState;
        xhr.open(method, url, true);
        if (method === 'post') {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
        if (typeof data === 'string') {
            xhr.send(data);
        } else if (typeof data === 'object') {
            let series = [];
            for (let prop of Object.keys(data)) {
                series.push(`${prop}=${data[prop]}`);
            }
            xhr.send(series.join('&'));
        }
    });
    return promise;
}

// 使用示例：
// ajax(
    // 'http://localhost:8080/server/ajaxtest', 
    // {
        // data: {
            // name: 'simon',
            // password: '123456'
        // },
        // onsuccess: function (responseText, xhr) {
            // console.log(responseText);
        // }
    // }
// );