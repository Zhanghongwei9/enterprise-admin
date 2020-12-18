<template>
    <div class="wapper">
        <div class="content-wapper">
            <div class="tips">
                <label>编辑栏目</label>
            </div>
            <mu-form ref="form" :model="info" class="mu-demo-form" label-position="top" label-width="100">
                <div class="content">
                    <mu-form-item prop="name" label="栏目名称" :rules="rules.name">
                        <mu-text-field v-model="info.name"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item prop="category" label="关联类别">
                        <mu-radio v-model="info.category" 
                            v-for="item in categories"
                            :key="item.id"
                            :value="item.id" :label="item.name"></mu-radio>
                    </mu-form-item>
                    <template v-if="info.category == 2">
                        <div class="tips">
                            <label>关联文章</label>
                            <span>
                                只关联一篇文章的话，用户端会直接跳转<br>
                                可拖动排序
                            </span>
                        </div>
                        <mu-form-item prop="input" label="关联文章">
                            <a href="javascript:void(0);" class="join" @click="selectArticle">关联文章</a>
                            <div class="info">
                                <vuedraggable v-model="info.articles">
                                    <span v-for="(item, index) in info.articles" :key="'article-' + item.id">
                                        {{item.title}}
                                        <a href="javascript:void(0);" @click="removeArticle(index)">删除此项</a>
                                    </span>
                                </vuedraggable>
                            </div>
                        </mu-form-item>
                    </template>
                    <template v-if="info.category == 3">
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
                                        <img :src="item.mainImage">
                                        <span class="name">{{item.name}}</span>
                                        <span class="spec">{{item.briefly}}</span>
                                        <span class="price">{{item.price / 100}}</span>
                                        <div class="remove">
                                            <a href="javascript:void(0);" @click="removeProduct(index)">删除此项</a>
                                        </div>
                                    </li>
                                </vuedraggable>
                            </ul>
                        </mu-form-item>
                    </template>
                    <template v-if="info.category == 4">
                        <div class="tips">
                            <label>关联活动</label>
                            <span>
                                活动与栏目为一对一关系
                            </span>
                        </div>
                        <mu-form-item prop="input" label="关联活动">
                            <a href="javascript:void(0);" class="join" @click="selectActivity">关联活动</a>
                            <div class="info">
                                <vuedraggable v-model="info.activities">
                                    <span v-for="(item, index) in info.activities" :key="'activity-' + item.id">
                                        {{item.name}}
                                        <a href="javascript:void(0);" @click="removeActivity(index)">删除此项</a>
                                    </span>
                                </vuedraggable>
                            </div>
                        </mu-form-item>
                    </template>
                </div>
            </mu-form>
            <a href="javascript:void(0);" class="save" @click="save">保存</a>
            <div class="bottom-wapper">
                <label>删除此栏目</label>
                <span>一旦删除，将删除此栏目以及此栏目一下所有栏目以及关联信息。请确认</span>
                <a href="javascript:void(0);" class="remove" @click="removeColumn">删除栏目</a>
            </div>
        </div>
        <!-- 添加产品 -->
        <selectProducts ref="selectProducts" @change="productChange"></selectProducts>
        <!-- 关联活动 -->
        <selectActivity ref="selectActivity" @change="activityChange"></selectActivity>
        <!-- 关联文章 -->
        <selectArticle ref="selectArticle" @change="articleChange"></selectArticle>
    </div>
</template>

<script>
    import vuedraggable from 'vuedraggable'
    import selectProducts from '@/views/share/select-products'
    import selectActivity from '@/views/share/select-activity'
    import selectArticle from '@/views/share/select-article'
    import _column from '@/service/column-service'
    export default {
        components: {
            vuedraggable,
            selectProducts,
            selectActivity,
            selectArticle
        },
        mounted () {
            _column.getCategories(response => {
                this.categories = response
            })
            if (this.$route.query.columnId) {
                let _loading = this.$loading({ fullscreen: true })
                _column.getColumnDetail(this.$route.query.columnId, response => {
                    this.info = response
                    _loading.close()
                }, response => {
                    _loading.close()
                    this.$toast.error(response)
                })
            }
        },
        data() {
            return {
                info: {
                    name: null,
                    category: null
                },
                rules: {
                    name: [
                        { validate: (val) => !!val, message: '栏目名称不能为空'},
                    ]
                },
                categories: null
            }
        },
        methods: {
            removeColumn () {
                this.$confirm('确定要删除此栏目吗？', '提示', {
                    type: 'warning'
                }).then(({ result }) => {
                    if (result) {
                        this.$toast.message('点击了确定');
                    }
                })
            },
            productChange (info) {
                this.$set(this.info, 'products', info.checkedInfos)
            },
            activityChange (info) {
                this.$set(this.info, 'activities', info.checkedInfos)
            },
            articleChange (info) {
                this.$set(this.info, 'articles', info.checkedInfos)
            },
            removeProduct(index) {
                this.info.products.splice(index, 1)
            },
            removeArticle(index) {
                this.info.articles.splice(index, 1)
            },
            removeActivity(index) {
                this.info.activities.splice(index, 1)
            },
            save () {
                 this.$refs.form.validate().then((valid) => {
                    if (!valid) {
                        return
                    }
                    let _loading = this.$loading({ fullscreen: true })
                    const data = Object.assign({}, this.info)
                    if (data.products) {
                        data.productIds = []
                        for (const item of data.products) {
                            data.productIds.push(item.id)
                        }
                    }
                    if (data.activities) {
                        data.activityIds = []
                        for (const item of data.activities) {
                            data.activityIds.push(item.id)
                        }
                    }
                    if (data.articles) {
                        data.articleIds = []
                        for (const item of data.articles) {
                            data.articleIds.push(item.id)
                        }
                    }
                    _column.updateColumn(data, () => {
                        _loading.close()
                        this.$toast.success('保存成功') 
                    }, response => {
                        _loading.close()
                        this.$toast.error(response) 
                    })
                })
            },
            selectProducts () {
                this.$refs.selectProducts.show(null, this.info.products)
            },
            selectActivity () {
                this.$refs.selectActivity.show(this.info.activities)
            },
            selectArticle () {
                this.$refs.selectArticle.show(this.info.articles)
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
    padding: 0 30px;
    height: 48px;
    line-height: 48px;
    display: block;
    background: #111;
    color: #fff;
    text-align: center;
    margin-bottom: 60px;
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
.content-wapper .info span a{
    position: absolute;
    right: 10px;
}
.content-wapper .info span {
    color: #111;
    display: block;
    padding: 10px;
    width: 100%;
    background-color: #f5f5f5;
    border-radius: 5px;
    margin-bottom: 15px;
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
    position: relative;
}
.product-wapper .product-item .remove {
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(256,256,256,0.7);
}
.product-wapper .product-item .remove a{
    display: inline-block;
    position: absolute;
    right: 5px;
    bottom: 5px;
}
.product-wapper .product-item:hover .remove{
    display: block;
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
    position: relative;
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
.bottom-wapper {
    padding: 30px 15px;
    position: relative;
    border: 1px solid #dfdfdf;
}
.bottom-wapper span, label {
    display: block;
}
.bottom-wapper label {
    font-size: 16px;
    font-weight: 500;
}
.remove {
    padding: 0 30px;
    height: 48px;
    line-height: 48px;
    display: inline-block;
    background: #f44336;
    color: #fff;
    text-align: center;
    position: absolute;
    right: 15px;
    top: 30px;
}
</style>