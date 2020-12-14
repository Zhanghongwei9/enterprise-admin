import _request from '@/utils/request.js'

var _service = {
    // 获取基础信息
    getBaseInfo (companyCode, resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/baseInfo/getBaseInfo"),
            params  : {
                companyCode: companyCode
            },
            method  : 'get',
            success : resolve,
            error   : reject
          })
    },
    // 保存基础信息
    saveBaseInfo (info, resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/baseInfo/saveBaseInfo"),
            data    : info,
            method  : 'post',
            success : resolve,
            error   : reject
          })
    },
}

export default _service