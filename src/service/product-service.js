import _request from '@/utils/request.js'

var _service = {
    // 添加编辑产品
    saveProduct (info, resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/product/saveProduct"),
            data    : info,
            method  : 'post',
            success : resolve,
            error   : reject
          })
    },
    // 分页查询产品列表
    getProductsPage (params, resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/product/getProductsPage"),
            params  : params,
            method  : 'get',
            success : resolve,
            error   : reject
          })
    },
    // 查询产品详情
    getProductDetail (productId, resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/product/getProductDetail"),
            params  : {
                productId: productId
            },
            method  : 'get',
            success : resolve,
            error   : reject
          })
    },
    // 查询产品详情
    getProductByIds (productIds, resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/product/getProductByIds"),
            params  : {
                productIds: productIds
            },
            method  : 'get',
            success : resolve,
            error   : reject
          })
    },
}

export default _service