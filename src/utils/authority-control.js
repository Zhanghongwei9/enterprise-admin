// import Vue from 'vue'
// import _menu from '../service/menu-service'
// import router from '../router'

// // 获取系统下权限
// var auths

// // 权限控制自定义指令
// Vue.directive('auth', {
//     inserted: function (el, binding) {
//         if (auths != undefined) {
//             var opertations = auths[localStorage.getItem('curr-power-code')]
//             if (opertations == undefined || opertations[binding.value] == undefined) {
//                 el.style.display = 'none'
//             }
//         } else {
//             el.style.display = 'none'
//         }
//     }
// })

// Vue.directive('auth-reverse', {
//     inserted: function (el, binding) {
//         if (auths != undefined) {
//             var opertations = auths[localStorage.getItem('curr-power-code')]
//             if (opertations == undefined || opertations[binding.value] == undefined) {
//                 el.style.display = 'inline-block'
//             } else {
//                 el.style.display = 'none'
//             }
//         } else {
//             el.style.display = 'none'
//         }
//     }
// })

// // 导航全局前置守卫
// router.beforeEach((to, from, next) => {
//     if (to.query.power != null) {
//         localStorage.setItem('curr-power-code', to.query.power)
//     }
//     next()
// })

// // 更新用户权限
// Vue.prototype.$updatePower = function () {
//     _menu.getOperationsByPowerId(response => {
//         auths = response
//     })
// }

// // 设置权限
// Vue.prototype.$setPower = function (params) {
//     auths = params
// }