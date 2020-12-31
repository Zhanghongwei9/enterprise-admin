import Vue from 'vue'

// 设置查询参数
Vue.prototype.$saveParams = function (param) {
    localStorage.setItem(window.location.href, JSON.stringify(param))
}

Vue.prototype.$getParams = function () {
    var params = localStorage.getItem(window.location.href)
    if (params != null) {
        localStorage.removeItem(window.location.href)
        return JSON.parse(params)
    }
    return null
}