const div = document.getElementById("app");
let html = '';
const data = {
    name: 'abc',
    age: 18,
    sex: 'male',
    hobby: {
        game: 'hongjing',
        sport: 'basketball'
    },
    score: [12, 23, 34, 45]
}
// let value = data.name;

/**
 * 监听数据变化
 * @param {*} target 目标对象
 * @param {*} key 监听属性
 * @param {*} value 属性值
 * @returns
 */
function define(target, key, value) {
    observer(value);
    Object.defineProperty(target, key, {
        get() {
            // console.log('get');
            return value;
        },
        set(newVal) {
            // console.log('set');
            if (value === newVal) {
                return;
            }
            value = newVal;
            html = '';
            render(data);
        }
    })
}

// 处理数组变异方法
const proto = Array.prototype;
const arrProto = Object.create(proto);
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(item => {
    arrProto[item] = function (...args) {
        proto[item].call(this, ...args);
        html = '';
        render(data);
    }
})

/**
 * 遍历数据
 * @param {*} data
 */
function observer(data) {
    if (Array.isArray(data)) {
        data.__proto__ = arrProto;
        return;
    }
    if (typeof data === 'object') {
        for (const prop in data) {
            define(data, prop, data[prop]);
        }
    }
}
observer(data);

/**
 * 修改、添加数组元素
 * 新增对象属性
 * @param {*} data
 * @param {*} key
 * @param {*} value
 * @returns
 */
function $set(target, key, value) {
    if (Array.isArray(target)) {
        target.splice(key, 1, value);
        return value;
    }
    if (key in target && !(key in Object.prototype)) {
        target[key] = value;
        return value;
    }
    target[key] = value;
    define(target, key, value);
    html = '';
    render(target);
    return value;
}

/**
 * 删除数组元素
 * 删除对象属性
 * @param {*} data
 * @param {*} key
 * @returns
 */
function $delete(target, key) {
    if (Array.isArray(data)) {
        target.splice(key, 1);
        return;
    }
    delete target[key];
    html = '';
    render(target);
}

render(data);
/**
 * 渲染数据到页面 此函数不是重点
 * @param {*} data
 */
function render(data) {
    for (const prop in data) {
        if (data[prop] instanceof Object) {
            render(data[prop])
        } else {
            console.log(prop)
            html += `<p><span>${prop}：</span><span>${data[prop]}</span></p>`;
        }
    }
    div.innerHTML = html;
}