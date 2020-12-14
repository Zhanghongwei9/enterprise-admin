import _request from '@/utils/request.js'

var _service = {
    // 分页查询文章列表
    getArticles (params, resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/articleInfo/getArticles"),
            params  : params,
            method  : 'get',
            success : resolve,
            error   : reject
          })
    },
    // 查询文章详情
    getArticlesDetail (articleId, resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/articleInfo/getArticlesDetail"),
            params  : {
                articleId: articleId
            },
            method  : 'get',
            success : resolve,
            error   : reject
          })
    },
    // 新增文章
    saveArticle (info, resolve, reject) {
        _request.api({
            url     : _request.getServiceUrl("/articleInfo/saveArticle"),
            data    : info,
            method  : 'post',
            success : resolve,
            error   : reject
          })
    }
}

export default _service