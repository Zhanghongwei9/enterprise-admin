import _request from '@/utils/request.js'

var _userInfo = {
    // 根据手机号登录
    loginByMobile (mobile, passWord, resolve, reject) {
        _request.api({
            url     : _request.getStaffsUrl("/api/userInfo/loginByMobile"),
            params  : {
                phone: mobile,
                passWord: passWord
            },
            method  : 'get',
            success : resolve,
            error   : reject
          })
    },
    // 根据账号密码登录
    loginByAccount (account, passWord, resolve, reject) {
        _request.api({
            url     : _request.getStaffsUrl("/api/userInfo/loginByAccount"),
            params  : {
                account: account,
                passWord: passWord
            },
            method  : 'get',
            success : resolve,
            error   : reject
          })
    },
    // 获取登录用户信息
    getLoginUser (resolve, reject) {
        _request.api({
            url     : _request.getStaffsUrl("/api/userInfo/getLoginUser"),
            method  : 'get',
            success : resolve,
            error   : reject
          })
    },
    // 根据部门查询员工列表
    getUsersByDepartment (departmentId, resolve, reject) {
        _request.api({
            url     : _request.getStaffsUrl("/api/userInfo/getUsersByDepartment"),
            params  : {
                departmentId: departmentId
            },
            method  : 'get',
            success : resolve,
            error   : reject
          })
    },
    // 根据部门同步企业微信员工信息
    syncUserInfoByDepartment (departmentId, resolve, reject) {
        _request.api({
            url     : _request.getStaffsUrl("/api/userInfo/syncUserInfoByDepartment"),
            params  : {
                departmentId: departmentId
            },
            method  : 'get',
            success : resolve,
            error   : reject
          })
    },
    // 设置密码
    setPassWord (userId, passWord, resolve, reject) {
        _request.api({
            url     : _request.getStaffsUrl("/api/userInfo/setPassWord"),
            params  : {
                userId: userId,
                passWord: passWord
            },
            method  : 'get',
            success : resolve,
            error   : reject
          })
    },
    // 更新部门缓存
    updateCache (resolve, reject) {
        _request.api({
            url     : _request.getStaffsUrl("/api/userInfo/updateCache"),
            method  : 'get',
            success : resolve,
            error   : reject
        })
    },
    // 获取用户详情
    getUserInfoById (userId , resolve, reject) {
        _request.api({
            url     : _request.getStaffsUrl("/api/userInfo/getUserInfoById"),
            params  : {
                userId: userId
            },
            method  : 'get',
            success : resolve,
            error   : reject
        })
    },
    // 登出
    loginOut (resolve, reject) {
        _request.api({
            url     : _request.getStaffsUrl("/api/userInfo/loginOut"),
            method  : 'get',
            success : resolve,
            error   : reject
        })
    },
    // 绑定账号  
    bindOldCrm (info, resolve, reject) {
        _request.api({
            url     : _request.getStaffsUrl("/api/userInfo/bindOldCrm"),
            params  : info,
            method  : 'get',
            success : resolve,
            error   : reject
        })
    },
    // 绑定账号  
    unbindOldCrm (userId, historyUserId, resolve, reject) {
        _request.api({
            url     : _request.getStaffsUrl("/api/userInfo/unbindOldCrm"),
            params  : {
                userId: userId,
                oldCrmUser: historyUserId
            },
            method  : 'get',
            success : resolve,
            error   : reject
        })
    },
    // 设置部门
    setCurrDepartment (departmentId, resolve, reject) {
        _request.api({
            url     : _request.getStaffsUrl("/api/userInfo/setCurrDepartment"),
            params  : {
                departmentId: departmentId
            },
            method  : 'get',
            success : resolve,
            error   : reject
        })
    },
    // 修改密码	 
    updatePassWord (passWord, resolve, reject) {
        _request.api({
            url     : _request.getStaffsUrl("/api/userInfo/updatePassWord"),
            params  : {
                passWord: passWord
            },
            method  : 'get',
            success : resolve,
            error   : reject
        })
    },
    // 查询已标记公司部门	 
    getDepartmentForCompany (resolve, reject) {
        _request.api({
            url     : _request.getStaffsUrl("/api/department/getDepartmentForCompany"),
            method  : 'get',
            success : resolve,
            error   : reject
        })
    }
}

export default _userInfo
