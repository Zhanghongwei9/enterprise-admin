<template>
    <div class="wapper">
        <div class="title-wapper">
            <label>我的产品</label>
            <a href="javascript:void(0);" class="add" @click="add">添加新产品</a>
        </div>
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
                        <a href="javascript:void(0);" class="edit" @click="edit(item.id)"></a>
                        <a href="javascript:void(0);" class="remove"></a>
                    </div>
                </li>
                <infinite-loading @infinite="getInfoList" :distance="30" spinner="waveDots" ref="infiniteLoading">
                    <div slot="no-more">无更多内容</div>
                    <div slot="no-results">已加载完成</div>
                </infinite-loading>
            </ul>
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
                info: null
            }
        },
        methods: {
            add () {
                this.$router.push({
                    name: '/add-product'
                })
            },
            edit (productId) {
                this.$router.push({
                    name: '/add-product',
                    query: {
                        productId: productId
                    }
                })
            },
            getDetail (productId) {
                _product.getProductDetail(productId, response => {
                    this.info = response
                })
            },
            getInfoList ($state) {
                this.query.pageIndex++
                _product.getProductsPage(this.query, 
                    (response, total) => {
                        this.query.total = total
                        response.forEach(item => {
                            this.infos.push(item)
                        })
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
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
            }
        }
    }
</script>

<style scoped>
.wapper {
    width: 100%;
    height: 100%;
    padding: 15px;
    color: #383E43;
}
.title-wapper {
    display: block;
    margin-bottom: 15px;
    text-align: right;
    position: relative;
}
.title-wapper label {
    font-size: 22px;
    font-weight: bold;
    position: absolute;
    left: 0;
}
.title-wapper .add {
    display: inline-block;
    padding: 10px 15px;
    padding-right: 40px;
    border-radius: 3px;
    background-color: #ffda21;
    color: #383E43;
    position: relative;
}
.title-wapper .add::after {
    content: '';
    width: 10px;
    height: 10px;
    background: url(../../assets/add.png);
    background-size: 10px 10px;
    position: absolute;
    top: 15px;
    right: 10px;
    cursor: pointer;
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
.query-wapper .list {
    display: block;
    height: calc(100% - 60px);
    overflow-y: auto;
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
    width: 270px;
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
.query-wapper .list .list-item:hover {
    background-color: #111;
}
.query-wapper .list .list-item:hover label {
    color: #fff;
}
.query-wapper .list .list-item:hover .operator {
    display: inline-block;
}
.query-wapper .list .list-item .operator {
    margin-top: 10px;
    display: none;
}
.query-wapper .list .list-item .operator a {
    margin-right: 10px;
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #f3f4fb;
    position: relative;
}
.query-wapper .list .list-item .operator .edit::after {
    content: '';
    width: 20px;
    height: 20px;
    background: url(../../assets/edit.png);
    background-size: 20px 20px;
    position: absolute;
    top: 9px;
    left: 9px;
    cursor: pointer;
}
.query-wapper .list .list-item .operator .remove::after {
    content: '';
    width: 20px;
    height: 20px;
    background: url(../../assets/remove.png);
    background-size: 20px 20px;
    position: absolute;
    top: 9px;
    left: 9px;
    cursor: pointer;
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
    width: 320px;
    height: 320px;
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