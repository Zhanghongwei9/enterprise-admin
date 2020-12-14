import _request from '@/utils/request.js'

var _service = {
    // 登录
    loginByMobile (params, resolve, reject) {
        _request.api({
            url         : _request.getServiceUrl("/userInfo/loginByMobile"),
            params      : params,
            method      : 'get',
            success     : resolve,
            error       : reject
        })
    }
}

export default _service