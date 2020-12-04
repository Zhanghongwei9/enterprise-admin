<template>
    <div class="wapper">
        <div class="content-wapper">
            <div class="tips">
                <label>新增栏目</label>
            </div>
            <mu-form :model="info" class="mu-demo-form" label-position="top" label-width="100">
                <div class="content">
                    <mu-form-item prop="input" label="栏目名称">
                        <mu-text-field v-model="info.input"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item prop="radio" label="关联类别">
                        <mu-radio v-model="info.radio" value="1" label="仅展示"></mu-radio>
                        <mu-radio v-model="info.radio" value="2" label="文章"></mu-radio>
                        <mu-radio v-model="info.radio" value="3" label="产品"></mu-radio>
                        <mu-radio v-model="info.radio" value="4" label="活动"></mu-radio>
                    </mu-form-item>
                    <div class="tips">
                        <label>关联文章</label>
                        <span>
                            文章与栏目为一对一关系
                        </span>
                    </div>
                    <mu-form-item prop="input" label="关联文章">
                        <a href="javascript:void(0);" class="join" @click="selectArticle">关联文章</a>
                        <div class="info">
                            <label>文章标题：</label>
                            <span>Let's play 玩在一起</span>
                        </div>
                    </mu-form-item>
                    <div class="tips">
                        <label>关联活动</label>
                        <span>
                            活动与栏目为一对一关系
                        </span>
                    </div>
                    <mu-form-item prop="input" label="关联活动">
                        <a href="javascript:void(0);" class="join" @click="selectActivity">关联活动</a>
                        <div class="info">
                            <label>活动标题：</label>
                            <span>Let's play 玩在一起</span>
                        </div>
                    </mu-form-item>
                    <div class="tips">
                        <label>关联产品</label>
                        <span>
                            排序。可拖拽为产品排序
                        </span>
                    </div>
                    <mu-form-item prop="input" label="关联产品">
                        <a href="javascript:void(0);" class="join" @click="selectProducts">添加产品</a>
                        <ul class="product-wapper">
                            <vuedraggable v-model="info.products">
                                <li class="product-item" v-for="(item, index) in info.products" :key="index">
                                    <img src="https://www.ikea.cn/cn/zh/images/products/kungsfors-kang-fu-si-5gou-gua-gan-1rong-qi-bu-xiu-gang__0755315_PE748361_S5.JPG">
                                    <span class="name">KUNGSFORS 康福斯[{{index}}]</span>
                                    <span class="spec">5钩挂杆/1容器, 不锈钢40 厘米</span>
                                    <span class="price">2,800</span>
                                </li>
                            </vuedraggable>
                        </ul>
                    </mu-form-item>
                </div>
            </mu-form>
        </div>
        <a href="javascript:void(0);" class="save" @click="save">保存</a>
        <!-- 添加产品 -->
        <selectProducts ref="selectProducts"></selectProducts>
        <!-- 关联活动 -->
        <selectActivity ref="selectActivity"></selectActivity>
        <!-- 关联文章 -->
        <selectArticle ref="selectArticle"></selectArticle>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import vuedraggable from 'vuedraggable'
    import selectProducts from '@/views/share/select-products'
    import selectActivity from '@/views/share/select-activity'
    import selectArticle from '@/views/share/select-article'
    export default {
        components: {
            vuedraggable,
            selectProducts,
            selectActivity,
            selectArticle
        },
        data() {
            return {
                info: {
                    intro: '请输入描述。',
                    products: [
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {}
                    ]
                },
            }
        },
        methods: {
            save () {

            },
            selectProducts () {
                this.$refs.selectProducts.show()
            },
            selectActivity () {
                this.$refs.selectActivity.show()
            },
            selectArticle () {
                this.$refs.selectArticle.show()
            }
        }
    }
</script>

<style scoped>
.wapper {
    width: 100%;
    overflow-y: auto;
}
.save {
    display: inline-block;
    padding: 15px 40px;
    border-radius: 30px;
    background-color: #111;
    color: #fff;
    position: fixed;
    bottom: 30px;
    right: 15px;
}
.join {
    display: inline-block;
    padding: 5px 15px;
    padding-right: 30px;
    border-radius: 15px;
    background-color: #111;
    position: relative;
    color: #fff;
    margin: 10px 0 20px 0;
}
.join::after {
    content: '';
    width: 15px;
    height: 15px;
    background: url(../../assets/add-white.png);
    background-size: 15px 15px;
    background-repeat: no-repeat;
    position: absolute;
    top: 8px;
    right: 10px;
    cursor: pointer;
}
.content-wapper {
    width: 800px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
}
.tips {
    color: #111;
    padding: 10px 0;
}
.tips label {
    font-size: 18px;
    display: block;
    margin-bottom: 15px;
}
.content-wapper .info {
    display: block;
    width: 100%;
}
.content-wapper .info span {
    color: #111;
    font-weight: 500;
}
.quill-editor {
    width: 100%;
}
.product-wapper {
    width: 100%;
}
.product-wapper .product-item {
    display: inline-block;
    width: 160px;
    margin: 0 15px 15px 15px;
}
.product-wapper .product-item img {
    width: 100%;
    height: 160px;
    object-fit: cover;
}
.product-wapper .product-item span {
    display: block;
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.product-wapper .product-item .name {
    color: #111;
    font-size: 14px;
    font-weight: 500;
}
.product-wapper .product-item .spec {
    font-size: 12px;
}
.product-wapper .product-item .price {
    color: #111;
    font-size: 18px;
    font-weight: 500;
    padding-left: 10px;
    position: relative;
}
.product-wapper .product-item .price::after {
    content: '￥';
    font-size: 12px;
    position: absolute;
    left: 0;
    top: 2px;
}
.content-wapper .list {
    width: 100%;
    color: #383E43 !important;
}
.content-wapper .list tr {
    border-top: 1px solid #eee;
}
.content-wapper .list tr:last-child {
    border-bottom: 1px solid #eee;
}
.content-wapper .list td {
    padding: 10px 15px;
}
.content-wapper .list .title {
    cursor: pointer;
}
.content-wapper .list .title:hover {
    text-decoration: underline;
}
</style>