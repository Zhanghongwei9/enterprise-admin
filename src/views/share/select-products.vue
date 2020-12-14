<template>
    <mu-dialog title="添加产品" width="1080" :open.sync="openSimple">
        <div class="wapper">
            <div class="query-wapper">
                <div class="top">
                    <input type="input" placeholder="输入关键字查询..." v-model="query.name">
                    <a href="javascript:void(0);" class="search" @click="queryInfo"></a>
                </div>
                <ul class="list">
                    <li class="list-item" v-for="item in infos" :key="item.id" @click="getDetail(item.id)">
                        <div class="image">
                            <img :src="item.mainImage">
                        </div>
                        <div class="info">
                            <label>{{item.name}}</label>
                            <span>{{item.briefly}}</span>
                        </div>
                        <div class="operator">
                            <mu-checkbox v-model="item.checked"></mu-checkbox>
                        </div>
                    </li>
                </ul>
                <infinite-loading @infinite="getInfoList" :distance="30" spinner="waveDots" ref="infiniteLoading">
                    <div slot="no-more">无更多内容</div>
                    <div slot="no-results">已加载完成</div>
                </infinite-loading>
            </div>
            <div class="product-wapper" v-if="info">
                <!-- 图集 -->
                <div class="images">
                    <ul>
                        <template v-for="(item, index) in info.images">
                            <li class="image" :key="index">
                                <img :src="item">
                            </li>
                        </template>
                    </ul>
                </div>
                <!-- 基础信息 -->
                <div class="top">
                    <ul class="info">
                        <li>
                        <label class="name">{{info.name}}</label>
                        <div class="price-wapper">
                            <span class="price">{{info.price / 100}}</span>
                            <span class="price original-price" v-if="info.originalPrice">￥{{info.originalPrice / 100}}</span>
                        </div>
                        </li>
                        <li>
                            <div class="specs">{{info.briefly}}</div>
                        </li>
                    </ul>
                </div>
                <!-- 详情内容 -->
                <div class="detail" v-html="info.content"></div>
            </div>
        </div>
        <div class="bottom-wapper">
            <a href="javascript:void(0);" class="save" @click="save">确认选择</a>
        </div>
    </mu-dialog>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading' 
    import _product from '@/service/product-service'
    export default {
        components: {
            InfiniteLoading
        },
        data() {
            return {
                query: {
                    name: null,
                    pageIndex: 0,
                    pageSize: 20
                },
                infos: [],
                checkedInfos: [],
                info: null,
                params: null,
                openSimple: false
            }
        },
        methods: {
            show (params, checkedInfos) {
                this.params = params
                if (checkedInfos) {
                    this.checkedInfos = checkedInfos
                }
                this.openSimple = true
                this.reset()
            },
            getDetail (productId) {
                _product.getProductDetail(productId, response => {
                    this.info = response
                })
            },
            save () {
                let _loading = this.$loading({ fullscreen: true })
                var checkedInfos = []
                for (const item of this.infos) {
                    if (item.checked) {
                        checkedInfos.push(item)
                    }
                }
                this.$emit('change', {
                    checkedInfos: checkedInfos,
                    params: this.params
                })
                _loading.close()
                this.openSimple = false
            },
            getInfoList ($state) {
                this.query.pageIndex++
                _product.getProductsPage(this.query, 
                    (response, total) => {
                        for (let product of response) {
                            product.checked = this.checkedInfos.findIndex(item => item.id == product.id) != -1
                            this.infos.push(product)
                        }
                        this.query.total = total
                        $state.loaded()
                        if (response == null || response.length == 0) {
                            $state.complete()
                        }
                        if (response.length > 0) {
                            this.getDetail(response[0].id)
                        }
                }, () => {
                    $state.complete()
                })
            },
            queryInfo () {
                this.query.pageIndex = 0
                this.infos = []
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
            },
            reset () {
                this.query = {
                    name: null,
                    pageIndex: 0,
                    pageSize: 20
                },
                this.infos = []
            }
        }
    }
</script>

<style scoped>
.wapper {
    width: 100%;
    height: 600px;
    padding: 15px;
    position: relative;
}
.bottom-wapper {
    text-align: right;
}
.save {
    display: inline-block;
    padding: 15px 40px;
    border-radius: 30px;
    background-color: #111;
    color: #fff;
}
.tips {
    color: #484848;
    padding: 10px 0;
}
.tips label {
    font-size: 18px;
}
.query-wapper {
    display: inline-block;
    vertical-align: top;
    width: 450px;
    height: calc(100% - 60px);
}
.query-wapper .top {
    margin-bottom: 30px;
}
.query-wapper .top input {
    display: inline-block;
    width: calc(100% - 55px);
    background-color: #f3f4fb;
    height: 50px;
    border-radius: 25px;
    padding: 0 20px;
    margin-right: 15px;
    vertical-align: top;
}
.query-wapper .top .search {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #484848;
    position: relative;
    background-color: #fff;
    margin-top: 5px;
    vertical-align: top;
}
.query-wapper .top .search::after {
    content: '';
    width: 20px;
    height: 20px;
    background: url(../../assets/search.png);
    background-size: 20px 20px;
    position: absolute;
    top: 9px;
    left: 9px;
    cursor: pointer;
}
.query-wapper .list .list-item{
    width: 100%;
    background-color: #f3f4fb;
    margin-bottom: 10px;
    padding: 10px;
    cursor: pointer;
    position: relative;
}
.query-wapper .list .list-item .image {
    display: inline-block;
    vertical-align: top;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #fff;
}
.query-wapper .list .list-item .image img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
}
.query-wapper .list .list-item .info{
    display: inline-block;
    vertical-align: top;
    width: 345px;
    padding: 0 15px;
}
.query-wapper .list .list-item .info label,span {
    display: block;
}
.query-wapper .list .list-item .info label {
    font-size: 14px;
    font-weight: 500;
}
.query-wapper .list .list-item .info span{
    font-size: 12px;
    color: #484848;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.query-wapper .operator {
    display: inline-block;
}
.product-wapper{
    display: inline-block;
    width: calc(100% - 480px);
    height: calc(100% - 60px);
    margin-left: 30px;
    vertical-align: top;
    overflow-y: auto;
}
.product-wapper .top {
    width: 100%;
    background: #fff;
    margin-bottom: 15px;
}
.product-wapper .info {
    display: inline-block;
    width: 100%;
    position: relative;
}
.product-wapper .info li {
    display: block;
    margin: 15px;
}
.product-wapper .info li .name {
    display: inline-block;
    font-size: 22px;
    font-weight: 700;
    width: 480px;
    vertical-align: top;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.product-wapper .info li .price-wapper {
    display: inline-block;
    vertical-align: top;
    padding-left: 10px;
    text-align: right;
    position: absolute;
    right: 15px;
}
.product-wapper .info li .price {
    display: inline-block;
    font-size: 18px;
    font-weight: 700;
    position: relative;
    padding-left: 12px;
}
.product-wapper .info li .price::after {
    content: '￥';
    font-size: 12px;
    position: absolute;
    left: 0;
    top: 2px;
}
.product-wapper .info li .original-price {
    display: block;
    font-size: 14px;
    font-weight: normal;
    color: #484848;
    text-decoration: line-through;
}
.product-wapper .info li .original-price::after {
    display: none;
}
.product-wapper .info li .specs {
    width: 290px;
    font-weight: 400;
    color: #484848;
}
.product-wapper .images {
    background-color: #fff;
    margin-bottom: 15px;
}
.product-wapper .images li {
    display: inline-block;
    width: 246px;
    height: 246px;
    margin-right: 15px;
    margin-bottom: 15px;
}
.product-wapper .images li img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.product-wapper .detail {
    background-color: #fff;
    margin-bottom: 180px;
    width: 100%;
    padding: 15px;
}
.product-wapper .detail>>>img {
    width: 100%;
}
.product-wapper .detail>>>p,span {
    line-height: 19px;
}
</style>