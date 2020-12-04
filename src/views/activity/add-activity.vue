<template>
    <div class="wapper">
        <div class="content-wapper">
            <div class="tips">
                <label>创建活动</label>
                <span>
                    配置楼层需要展示的信息。<br>
                    配置完成后，点击保存
                </span>
            </div>
            <mu-form :model="info" class="mu-demo-form" label-position="top" label-width="100">
                <mu-form-item prop="input" label="活动名称">
                    <mu-text-field v-model="info.input"></mu-text-field>
                </mu-form-item>
                <ul class="floor-wapper">
                    <li class="floor-item">
                        <div class="title">
                            楼层[1]
                        </div>
                        <div class="content">
                            <mu-form-item prop="radio" label="类别">
                                <mu-radio v-model="info.radio" value="2" label="图文"></mu-radio>
                                <mu-radio v-model="info.radio" value="3" label="产品"></mu-radio>
                            </mu-form-item>
                            <div class="tips">
                                <label>图文模式</label>
                                <span>
                                    内容数量可选择三种模式。数量将会影响展示样式<br>
                                    查看三种模式样式
                                </span>
                            </div>
                            <mu-form-item prop="input" label="内容数量">
                               <mu-select v-model="info.select">
                                    <mu-option label="1" value="1"></mu-option>
                                    <mu-option label="2" value="2"></mu-option>
                                    <mu-option label="3" value="3"></mu-option>
                                </mu-select>
                            </mu-form-item>
                            <mu-form-item prop="input" label="内容[1]">
                                <my-editor :intro="info.intro"></my-editor>
                            </mu-form-item>
                            <mu-form-item prop="input" label="跳转链接[1]">
                                <mu-text-field v-model="info.input"></mu-text-field>
                            </mu-form-item>
                        </div>
                    </li>
                    <li class="floor-item">
                        <div class="title">
                            楼层[2]
                        </div>
                        <div class="content">
                            <mu-form-item prop="radio" label="类别">
                                <mu-radio v-model="info.radio" value="2" label="图文"></mu-radio>
                                <mu-radio v-model="info.radio" value="3" label="产品"></mu-radio>
                            </mu-form-item>
                            <div class="tips">
                                <label>产品模式</label>
                                <span>
                                    内容数量可选择两种模式。数量将会影响展示样式<br>
                                    查看两种模式样式<br>
                                    排序。可拖拽为产品排序
                                </span>
                            </div>
                            <mu-form-item prop="input" label="产品数量">
                               <mu-select v-model="info.select">
                                    <mu-option label="4" value="4"></mu-option>
                                    <mu-option label="5 ~ 12" value="5 ~ 12"></mu-option>
                                </mu-select>
                            </mu-form-item>
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
                    </li>
                </ul>
            </mu-form>
        </div>
        <a href="javascript:void(0);" class="save" @click="save">保存</a>
        <!-- 添加产品 -->
        <selectProducts ref="selectProducts"></selectProducts>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import vuedraggable from 'vuedraggable'
    import selectProducts from '@/views/share/select-products'
    export default {
        components: {
            vuedraggable,
            selectProducts
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
.floor-wapper .floor-item{
    display: block;
    background: #fff;
    margin-bottom: 15px;
}
.floor-wapper .floor-item .title {
    padding: 15px;
    border-bottom: 1px solid #f3f4fb;
    font-size: 16px;
    font-weight: 500;
}
.floor-wapper .floor-item .content {
    background: #fff;
    padding: 15px;
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
</style>