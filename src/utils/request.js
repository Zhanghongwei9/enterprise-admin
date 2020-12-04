/* eslint-disable no-unused-vars */
import axios from 'axios'
import qs from 'qs'
import _cookies from 'js-cookie' 
import _download from '@/utils/download'
import router from '../router'
import nprogress from 'nprogress'

var NODE_ENV = process.env.NODE_ENV;

var staffs_center_address;
var crm_address;
var cards_address;
var domain;
var doc_address;
var passport_address;

// eslint-disable-next-line no-console
console.info(NODE_ENV)

if (NODE_ENV == "production") {
    staffs_center_address = 'http://api.juyoufuli.com/staffs'
    crm_address = 'http://api.juyoufuli.com/crm'
    cards_address = 'http://api.juyoufuli.com/cards'
    domain = 'juyoufuli.com'
    doc_address = 'http://api.juyoufuli.com/docs'
    passport_address = 'http://passport-admin.juyoufuli.com'
} else if (NODE_ENV == "test") {
    staffs_center_address = 'http://api.tech.com/staffs'
    crm_address = 'http://api.tech.com/crm'
    cards_address = 'http://api.tech.com/cards'
    domain = 'tech.com'
    doc_address = 'http://api.tech.com/docs'
    passport_address = 'http://passport-admin.tech.com'
} else {
    staffs_center_address = 'http://api.tech.com/staffs'
    crm_address = 'http://api.tech.com/crm'
    cards_address = 'http://api.tech.com/cards'
    domain = '192.168.10.54'
    doc_address = 'http://api.tech.com/docs'
    passport_address = 'http://192.168.10.54:7085'
}

var _request = {
    api(param){
        nprogress.start()
        axios({
            method           : param.method     || 'get',
            url              : param.url        || '',
            responseType     : param.type       || 'json',
            params           : param.params     || '',
            data             : param.data       || '',
            paramsSerializer: function(params) {
                return qs.stringify(params, {arrayFormat: 'repeat'})
            },
            headers: {
                "staff_center_login_key": _cookies.get('staff_center_login_key') || '',
                "project_platform": 4 // 
            }
        },
        {
            timeout: 1000 * 60 * 5
        }).then(function (response) {
            nprogress.done()
            if (-600000 === response.data.code) {
                // 去登陆
                window.location.replace(passport_address + '/login')
            } else if (-600002 === response.data.code) {
                router.push({
                    path: '/notPower'
                })
            } else if (0 === response.data.code) {
                // 返回结果
                if (null != response.data.total) {
                    // 分页数据
                    typeof param.success === 'function' && param.success(response.data.data, response.data.total, response.data.msg)
                }else{
                    // 常规数据
                    typeof param.success === 'function' && param.success(response.data.data, response.data.message)
                }
            }
            else {
                // 请求失败
                if (response.data.data != undefined) {
                    typeof param.error === 'function' && param.error(response.data.message, response.data.data)
                } else {
                    typeof param.error === 'function' && param.error(response.data.message)
                }
            }
        })
    },
    // 上传文件
    upload (param) {
        var formData = new FormData()
        formData.append('file', param.file)
        var configs = {
            headers: {
                'Content-Type'  : 'multipart/form-data',
                "staff_center_login_key": _cookies.get('staff_center_login_key') || ''
            }
        }
        // 添加请求头
        nprogress.start()
        axios.post(param.url, formData, configs)
        .then(response => {
            nprogress.done()
            if (-600000 === response.data.code) {
                // 去登陆
                window.location.href = '/login'
            }
            else if (0 === response.data.code) {
                // 常规数据
                typeof param.success === 'function' && param.success(response.data.data, response.data.message)
            }
            else {
                // 请求失败
                typeof param.error === 'function' && param.error(response.data.message)
            }
        })
    },
    // 获取服务器地址
    getStaffsUrl (path) {
        return staffs_center_address + path;
    },
    getCrmUrl (path) {
        return crm_address + path;
    },
    getCardsUrl (path) {
        return cards_address + path;
    },
    getDocUrl (path) {
        return doc_address + path;
    },
    // 主域名
    domain,
    passport_address
}

export default _request