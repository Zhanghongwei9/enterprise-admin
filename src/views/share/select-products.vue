<template>
    <mu-dialog title="添加产品" width="1080" :open.sync="openSimple">
        <div class="wapper">
            <div class="query-wapper">
                <div class="top">
                    <input type="input" placeholder="输入关键字查询...">
                    <a href="javascript:void(0);" class="search"></a>
                </div>
                <ul class="list">
                    <li class="list-item">
                        <div class="image">
                            <img src="" alt="">
                        </div>
                        <div class="info">
                            <label>KUNGSFORS 康福斯</label>
                            <span>5钩挂杆/1容器, 不锈钢40 厘米</span>
                        </div>
                    </li>
                    <li class="list-item">
                        <div class="image">
                            <img src="" alt="">
                        </div>
                        <div class="info">
                            <label>KUNGSFORS 康福斯</label>
                            <span>5钩挂杆/1容器, 不锈钢40 厘米</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="product-wapper">
                <!-- 基础信息 -->
                <div class="top">
                    <img src="https://www.ikea.cn/cn/zh/images/products/kungsfors-kang-fu-si-5gou-gua-gan-1rong-qi-bu-xiu-gang__0755315_PE748361_S5.JPG">
                    <ul class="info">
                        <li>
                        <label class="name">KUNGSFORS 康福斯</label>
                        <div class="price-wapper">
                                <span class="price">2,800</span>
                                <span class="price original-price">￥2,800</span>
                        </div>
                        </li>
                        <li>
                            <div class="specs">
                                一桌四椅, 深褐色/欧斯塔 淡灰色120/180 厘米
                                2020年08月13日2021年07月31日售完即止。
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 图集 -->
                <div class="images">
                    <ul>
                        <li class="image">图片</li>
                        <li class="image">图片</li>
                    </ul>
                </div>
                <!-- 详情内容 -->
                <div class="detail" v-html="info.detail"></div>
            </div>
        </div>
    </mu-dialog>
</template>

<script>
    export default {
        data() {
            return {
                openSimple: false,
                info: {
                    detail: '<img src="https://www.ikea.cn/cn/zh/images/products/kungsfors-kang-fu-si-5gou-gua-gan-1rong-qi-bu-xiu-gang__0755315_PE748361_S5.JPG">'
                }
            }
        },
        methods: {
            show () {
                this.openSimple = true
            }
        }
    }
</script>

<style scoped>
.wapper {
    width: 100%;
    height: 600px;
    padding: 15px;
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
    width: 320px;
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
.query-wapper .list .list-item .info{
    display: inline-block;
    vertical-align: top;
    width: 220px;
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
.product-wapper{
    display: inline-block;
    width: calc(100% - 350px);
    height: 100%;
    margin-left: 30px;
    vertical-align: top;
    overflow-y: auto;
}
.product-wapper .top {
    width: 100%;
    background: #fff;
    margin-bottom: 15px;
}
.product-wapper .top img{
    width: 220px;
    height: 220px;
    display: inline-block;
    vertical-align: top;
    object-fit: cover;
}
.product-wapper .info {
    display: inline-block;
    width: calc(100% - 220px);
}
.product-wapper .info li {
    display: block;
    margin: 15px;
}
.product-wapper .info li .name {
    display: inline-block;
    font-size: 22px;
    font-weight: 700;
    width: 290px;
    vertical-align: top;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.product-wapper .info li .price-wapper {
    display: inline-block;
    vertical-align: top;
    text-align: right;
}
.product-wapper .info li .price {
    display: block;
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
    font-size: 14px;
    font-weight: normal;
    color: #484848;
    text-decoration: line-through;
}
.product-wapper .info li .original-price::after {
    display: none;
}
.product-wapper .info li .specs {
    width: 100%;
    font-weight: 400;
    color: #484848;
    font-size: 14px;
}
.product-wapper .images {
    padding: 15px;
    background-color: #fff;
    margin-bottom: 15px;
}
.product-wapper .images li {
    display: inline-block;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    vertical-align: middle;
    margin-right: 15px;
    background-color: #f3f4fb;
}
.product-wapper .detail {
    background-color: #fff;
    margin-bottom: 180px;
    width: 100%;
}
.product-wapper .detail>>>img {
    width: 100%;
}
</style>