import _request from '@/utils/request.js'

var _service = {
    // 根据所有根节点栏目
    getColumnRoot (resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/columnInfo/getColumnRoot"),
            method  : 'get',
            success : resolve,
            error   : reject
          })
    },
    // 根据父标识查询栏目
    getColumnByParent (columnId, resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/columnInfo/getColumnByParent"),
            params  : {
                parentId: columnId
            },
            method  : 'get',
            success : resolve,
            error   : reject
          })
    },
    // 添加栏目
    addColumn (info, resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/columnInfo/addColumn"),
            data    : info,
            method  : 'post',
            success : resolve,
            error   : reject
          })
    },
    // 修改排序
    updateSort (params, resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/columnInfo/updateSort"),
            params  : params,
            method  : 'get',
            success : resolve,
            error   : reject
        })
    },
    // 获取栏目分类
    getCategories (resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/columnInfo/getCategories"),
            method  : 'get',
            success : resolve,
            error   : reject
        })
    },
    // 查询栏目详情
    getColumnDetail (columnId, resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/columnInfo/getColumnDetail"),
            params  : {
                columnId: columnId
            },
            method  : 'get',
            success : resolve,
            error   : reject
        })
    },
    // 编辑栏目
    updateColumn (info, resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/columnInfo/updateColumn"),
            data    : info,
            method  : 'post',
            success : resolve,
            error   : reject
          })
    },
}

export default _service