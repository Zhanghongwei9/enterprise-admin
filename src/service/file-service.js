import _request from '@/utils/request.js'

var _service = {
    // 图片上传到本地服务器
    uploadImage (file, resolve, reject) {
        _request.upload({
            url         : _request.getServiceUrl("/file/uploadImage"),
            file        : file,
            success     : resolve,
            error       : reject
        })
    }
}

export default _service