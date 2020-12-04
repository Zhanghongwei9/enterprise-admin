<template>
    <div class="wapper">
        <div class="title-wapper">
            <label>我的产品</label>
            <a href="javascript:void(0);" class="add" @click="add">添加新产品</a>
        </div>
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
                    <div class="operator">
                        <a href="javascript:void(0);" class="edit"></a>
                        <a href="javascript:void(0);" class="remove"></a>
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
                    <div class="operator">
                        <a href="javascript:void(0);" class="edit"></a>
                        <a href="javascript:void(0);" class="remove"></a>
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
</template>

<script>
    export default {
        data() {
            return {
                info: {
                    detail: '<img src="https://www.ikea.cn/cn/zh/images/products/kungsfors-kang-fu-si-5gou-gua-gan-1rong-qi-bu-xiu-gang__0755315_PE748361_S5.JPG">'
                }
            }
        },
        methods: {
            add () {
                this.$router.push({
                    name: '/add-product'
                })
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
    width: 400px;
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
    width: calc(100% - 430px);
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
.product-wapper .top img{
    width: 320px;
    height: 320px;
    display: inline-block;
    vertical-align: top;
    object-fit: cover;
}
.product-wapper .info {
    display: inline-block;
    width: calc(100% - 320px);
    height: 320px;
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
    padding-left: 10px;
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
    width: 290px;
    font-weight: 400;
    color: #484848;
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