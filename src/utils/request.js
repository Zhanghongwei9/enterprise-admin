/* eslint-disable no-unused-vars */
import axios from 'axios'
import qs from 'qs'
import _cookies from 'js-cookie' 
import _download from '@/utils/download'
import router from '../router'
import nprogress from 'nprogress'

var NODE_ENV = process.env.NODE_ENV;

var service_address;
var domain;

// eslint-disable-next-line no-console
console.info(NODE_ENV)

if (NODE_ENV == "production") {
    domain = 'juyoufuli.com'
} else if (NODE_ENV == "test") {
    domain = 'tech.com'
} else {
    service_address = 'http://192.168.10.25:8080'
    domain = '192.168.10.25'
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
                "enterprise-login-token": _cookies.get('enterprise-login-token') || ''
            }
        },
        {
            timeout: 1000 * 60 * 5
        }).then(function (response) {
            nprogress.done()
            if (-600001 === response.data.code) {
                // 去登陆
                window.location.href = '/login'
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
                "enterprise-login-token": _cookies.get('enterprise-login-token') || ''
            }
        }
        // 添加请求头
        nprogress.start()
        axios.post(param.url, formData, configs)
        .then(response => {
            nprogress.done()
            if (-600001 === response.data.code) {
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
    getServiceUrl (path) {
        return service_address + path;
    },
    // 主域名
    domain
}

export default _request