import _request from '@/utils/request.js'

var _service = {
    // 分页查询活动列表
    getActivities (params, resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/activity/getActivities"),
            params  : params,
            method  : 'get',
            success : resolve,
            error   : reject
          })
    },
    // 查询活动详情
    getActivityDetail (activityId, resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/activity/getActivityDetail"),
            params  : {
                activityId: activityId
            },
            method  : 'get',
            success : resolve,
            error   : reject
          })
    },
    // 添加编辑活动
    saveActivity (info, resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/activity/saveActivity"),
            data    : info,
            method  : 'post',
            success : resolve,
            error   : reject
          })
    }
}

export default _service