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
            <mu-form ref="form" :model="info" class="mu-demo-form" label-position="top" label-width="100">
                <mu-form-item prop="name" label="活动名称" :rules="rules.name">
                    <mu-text-field v-model="info.name" :max-length="128"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="mainImage" label="活动主图">
                    <img class="mainImage" :src="info.mainImage" v-if="info.mainImage">
                    <div class="upload-img">
                        <img src="@/assets/up-load.png">
                        请上传活动主图。支持格式png/jpeg/jpg
                        <input type="file" @change="uploadImage($event, 'logoAddress')" accept="image/jpeg,image/png,image/jpg">
                    </div>
                </mu-form-item>
                <ul class="floor-wapper">
                    <li class="floor-item" v-for="(item, index) in info.activityFloorVos" :key="index">
                        <div class="title">
                            楼层[{{index + 1}}]
                        </div>
                        <div class="content">
                            <mu-form-item prop="category" label="类别">
                                <mu-radio v-model="item.category" :value="1" label="图文"></mu-radio>
                                <mu-radio v-model="item.category" :value="2" label="产品"></mu-radio>
                                <mu-radio v-model="item.category" :value="3" label="文章"></mu-radio>
                            </mu-form-item>
                            <template v-if="item.category == 1">
                                <div class="tips">
                                    <label>图文模式</label>
                                    <span>
                                        内容数量可选择三种模式。数量将会影响展示样式<br>
                                        查看三种模式样式
                                    </span>
                                </div>
                                <mu-form-item prop="input" label="内容">
                                    <my-editor v-model="item.content"></my-editor>
                                </mu-form-item>
                            </template>
                            <template v-if="item.category == 2">
                                <div class="tips">
                                    <label>产品模式</label>
                                    <span>
                                        内容数量可选择两种模式。数量将会影响展示样式<br>
                                        数量分别为 4 / 5~12 <br>
                                        排序。可拖拽为产品排序
                                    </span>
                                </div>
                                <mu-form-item prop="input" label="关联产品">
                                    <a href="javascript:void(0);" class="join" @click="selectProducts(index, item.products)">关联产品</a>
                                    <ul class="product-wapper">
                                        <vuedraggable v-model="item.products">
                                            <li class="product-item" v-for="(product, productIndex) in item.products" :key="productIndex">
                                                <img :src="product.mainImage">
                                                <span class="name">{{product.name}}</span>
                                                <span class="spec">{{product.briefly}}</span>
                                                <span class="price">{{product.price / 100}}</span>
                                                <div class="remove">
                                                    <a href="javascript:void(0);" @click="removeProduct(index, productIndex)">删除此项</a>
                                                </div>
                                            </li>
                                        </vuedraggable>
                                    </ul>
                                </mu-form-item>
                            </template>
                            <template v-if="item.category == 3">
                                <div class="tips">
                                    <label>关联文章</label>
                                    <span>
                                        只关联一篇文章的话，用户端会直接跳转<br>
                                        可拖动排序
                                    </span>
                                </div>
                                <mu-form-item prop="input" label="关联文章">
                                    <a href="javascript:void(0);" class="join" @click="selectArticle(index, item.articles)">关联文章</a>
                                    <div class="info-wapper">
                                        <vuedraggable v-model="item.articles">
                                            <span v-for="(article, articleIndex) in item.articles" :key="'article-' + article.id">
                                                {{article.title}}
                                                <a href="javascript:void(0);" @click="removeArticle(index, articleIndex)">删除此项</a>
                                            </span>
                                        </vuedraggable>
                                    </div>
                                </mu-form-item>
                            </template>
                        </div>
                    </li>
                </ul>
                <a href="javascript:void(0);" class="add" @click="addFloor">增加楼层</a>
            </mu-form>
        </div>
        <a href="javascript:void(0);" class="save" @click="save">保存</a>
        <!-- 添加产品 -->
        <selectProducts ref="selectProducts" @change="productChange"></selectProducts>
        <!-- 关联文章 -->
        <selectArticle ref="selectArticle" @change="articleChange"></selectArticle>
    </div>
</template>

<script>
    import vuedraggable from 'vuedraggable'
    import selectProducts from '@/views/share/select-products'
    import selectArticle from '@/views/share/select-article'
    import _activity from '@/service/activity-service'
    import _file from '@/service/file-service'
    export default {
        components: {
            vuedraggable,
            selectArticle,
            selectProducts
        },
        mounted () {
            if (this.$route.query.activityId) {
                let _loading = this.$loading({ fullscreen: true })
                _activity.getActivityDetail(this.$route.query.activityId, response => {
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
                    id: null,
                    name: null,
                    mainImage: null,
                    activityFloorVos: [
                        {
                            category: 1,
                            returnUrl: null,
                            content: '',
                            productIds: []
                        }
                    ]
                },
                rules: {
                    name: [
                        { validate: (val) => !!val, message: '活动名称不能为空'},
                    ],
                    mainImage: [
                        { validate: (val) => !!val, message: '请上传活动主图'},
                    ]
                }
            }
        },
        methods: {
            uploadImage (event) {
                let _loading = this.$loading({ fullscreen: true })
                var file = event.target.files[0]
                _file.uploadImage(file, response => {
                    _loading.close()
                    this.info.mainImage = response
                }, response => {
                    _loading.close()
                    this.$toast.error(response)
                })
            },
            productChange (info) {
                if (this.info.activityFloorVos[info.params].products) {
                    var currNums = this.info.activityFloorVos[info.params].products.length + 
                        info.checkedInfos.length
                    if (currNums > 12) {
                        this.$toast.error('每个楼层最多可关联12个产品') 
                        return
                    }
                }
                this.$set(this.info.activityFloorVos[info.params], 'products', info.checkedInfos)
            },
            articleChange (info) {
                this.$set(this.info.activityFloorVos[info.params], 'articles', info.checkedInfos)
            },
            removeProduct (floorIndex, productIndex) {
                this.info.activityFloorVos[floorIndex].products.splice(productIndex, 1)
            },
            removeArticle(floorIndex, articleIndex) {
                this.info.activityFloorVos[floorIndex].articles.splice(articleIndex, 1)
            },
            save () {
                this.$refs.form.validate().then((valid) => {
                    if (!valid) {
                        return
                    }
                    let _loading = this.$loading({ fullscreen: true })
                    const data = Object.assign({}, this.info)
                    for (const floor of data.activityFloorVos) {
                        if (floor.products) {
                            floor.productIds = []
                            for (const item of floor.products) {
                                floor.productIds.push(item.id)
                            }
                        }
                        if (floor.articles) {
                            floor.articleIds = []
                            for (const item of floor.articles) {
                                floor.articleIds.push(item.id)
                            }
                        }
                    }
                    _activity.saveActivity(data, () => {
                        _loading.close()
                        this.$toast.success('保存成功')
                        this.$router.push({
                            name: '/activity-list'
                        })
                    }, response => {
                        _loading.close()
                        this.$toast.error(response) 
                    })
                })
            },
            selectProducts (floorIndex, checkedInfos) {
                this.$refs.selectProducts.show(floorIndex, checkedInfos)
            },
            selectArticle (floorIndex, checkedInfos) {
                this.$refs.selectArticle.show(floorIndex, checkedInfos)
            },
            addFloor () {
                this.info.activityFloorVos.push({
                    category: 1,
                    nums: 1,
                    returnUrl: null,
                    content: null,
                    productIds: []
                })
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
.add {
    display: inline-block;
    padding: 10px 15px;
    padding-right: 40px;
    border-radius: 3px;
    background-color: #ffda21;
    color: #383E43;
    position: relative;
}
.add::after {
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
    padding-bottom: 60px;
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
.upload-img {
    width: 330px;
    height: 60px;
    line-height: 60px;
    border: 2px dotted #e0e0e0;
    border-radius: 5px;
    font-size: 12px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    position: relative;
}
.upload-img input {
    display: block;
    width: 330px;
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
}
.upload-img img {
    width: 30px;
}
.mainImage {
    width: 100%;
    margin-bottom: 15px;
}
.info-wapper {
    display: block;
    width: 100%;
}
.info-wapper span a{
    position: absolute;
    right: 10px;
}
.info-wapper span {
    color: #111;
    display: block;
    padding: 10px;
    width: 100%;
    background-color: #f5f5f5;
    border-radius: 5px;
    margin-bottom: 15px;
}
</style>