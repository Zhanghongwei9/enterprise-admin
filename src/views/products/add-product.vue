<template>
    <div class="wapper">
        <div class="content-wapper">
            <mu-form ref="form" :model="info" class="mu-demo-form" label-width="200">
                <!-- 图集 -->
                <div class="images">
                    <div class="tips">
                        <label>产品图集</label>
                        <span>用于产品详情页展示。最多支持上传6张图片</span><br>
                        <span>第一张默认为主图。拖动排序</span>
                    </div>
                    <div class="upload-img">
                        <img src="@/assets/up-load.png">
                        请上传产品图片。拖动排序
                        <input type="file" accept="image/jpeg,image/png,image/jpg"
                            @change="uploadImage">
                    </div>
                    <mu-form-item prop="images" :rules="rules.images">
                        <ul>
                            <vuedraggable v-model="info.images">
                                <li v-for="(item, index) in info.images" :key="index">
                                    <img :src="item">
                                    <a href="javascript:void(0);" @click="removeImage(index)">删除</a>
                                </li>
                            </vuedraggable>
                        </ul>
                    </mu-form-item>
                </div>
                <!-- 基础信息 -->
                <div class="top">
                    <ul class="info">
                        <li>
                            <mu-form-item prop="name" label-float label="产品名称" :rules="rules.name">
                                <mu-text-field full-width :max-length="128" v-model="info.name"></mu-text-field>
                            </mu-form-item>
                        </li>
                        <li>
                            <mu-form-item prop="briefly" label-float label="规格描述">
                                <mu-text-field full-width :max-length="512" v-model="info.briefly"></mu-text-field>
                            </mu-form-item>
                        </li>
                        <li>
                            <mu-form-item prop="price" label-float label="产品价格" :rules="rules.price">
                                <mu-text-field full-width v-model="info.price" suffix="元"></mu-text-field>
                            </mu-form-item>
                        </li>
                        <li>
                            <mu-form-item prop="originalPrice" label-float label="产品原始价格">
                                <mu-text-field full-width v-model="info.originalPrice" suffix="元"></mu-text-field>
                            </mu-form-item>
                        </li>
                    </ul>
                </div>
                <!-- 详情内容 -->
                <div class="detail">
                    <quillEditor v-model="info.content" ref="editor" :options="toolbar"></quillEditor>
                </div>
            </mu-form>
            <a href="javascript:void(0);" class="remove" @click="remove">删除产品</a>
            <a href="javascript:void(0);" class="save" @click="save">保存</a>
        </div>
    </div>
</template>

<script>
    import {quillEditor, Quill} from 'vue-quill-editor'
    import {ImageExtend} from 'quill-image-extend-module'
    import {quillRedefine} from 'vue-quill-editor-upload'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import _file from '@/service/file-service'
    import _product from '@/service/product-service'
    import _request from '@/utils/request'
    import vuedraggable from 'vuedraggable'
    export default {
        components: {
            quillEditor,
            vuedraggable
        },
        data() {
            Quill.register('modules/ImageExtend', ImageExtend)
            return {
                toolbar: null,
                info: {
                    id: null,
                    name: null,
                    briefly: null,
                    price: null,
                    originalPrice: null,
                    imageUrl: null,
                    content: null,
                    images: []
                },
                rules: {
                    name: [
                        { validate: (val) => !!val, message: '产品名称不能为空'},
                    ],
                    price: [
                        { validate: (val) => !!val, message: '产品价格不能为空'},
                        { 
                            validate: (val) => {
                                var pattern = /^\d+(\.\d{1,2})?$/
                                return pattern.test(val)
                            }, 
                            message: '产品价格只能为数字。最多两位小数'
                        },
                    ],
                    images: [
                        {
                            validate: (val) => {
                                return val.length > 0
                            }, 
                            message: '请上传产品图片。至少一张图片'
                        }
                    ]
                }
            }
        },
        created () {
            this.toolbar = quillRedefine({
                // 图片上传的设置
                uploadConfig: {
                    loading: true,
                    name: 'file',
                    accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',
                    // header: xhr => {
                    //     // 上传图片请求需要携带token的 在xhr.setRequestHeader中设置
                    //     xhr.setRequestHeader(
                    //         "staff_center_login_key", _cookies.get('staff_center_login_key')
                    //     )
                    // },
                    action: _request.getServiceUrl("/file/uploadImage"),  // 必填参数 图片上传地址
                    res: (respnse) => {
                        return respnse.data;
                    },
                    sizeError: () => {}, // 图片超过大小的回调
                    start: () => {}, // 可选参数 自定义开始上传触发事件
                    end: () => {}, // 可选参数 自定义上传结束触发的事件，无论成功或者失败
                    error: () => {}, // 可选参数 上传失败触发的事件
                    success: () => {}, // 可选参数  上传成功触发的事件
                }
            })
        },
        mounted () {
            if (this.$route.query.productId) {
                // 编辑
                let _loading = this.$loading({ fullscreen: true })
                _product.getProductDetail(this.$route.query.productId, response => {
                    response.price = response.price / 100
                    if (response.originalPrice) {
                        response.originalPrice = response.originalPrice / 100
                    }
                    this.info = response
                    _loading.close()
                }, response => {
                    _loading.close()
                    this.$toast.error(response)
                })
            }
        },
        methods: {
            remove () {
                this.$confirm('确定要删除此产品吗？', '提示', {
                    type: 'warning'
                }).then(({ result }) => {
                    if (result) {
                        this.$toast.message('点击了确定');
                    }
                })
            },
            uploadImage (event) {
                let _loading = this.$loading({ fullscreen: true })
                var file = event.target.files[0]
                _file.uploadImage(file, response => {
                    _loading.close()
                    this.info.images.push(response)
                }, response => {
                    _loading.close()
                    this.$toast.error(response)
                })
            },
            removeImage(index) {
                this.info.images.splice(index, 1)
            },
            save () {
                this.$refs.form.validate().then((valid) => {
                    if (!valid) {
                        return
                    }
                    let _loading = this.$loading({ fullscreen: true })
                    this.info.imageUrl = this.info.images[0]
                    const data = Object.assign({}, this.info)
                    data.price = data.price * 100
                    if (data.originalPrice) {
                        data.originalPrice = data.originalPrice * 100
                    }
                    _product.saveProduct(data, () => {
                        _loading.close()
                        this.$toast.success('保存成功')
                        this.$router.push({
                            name: '/products-list'
                        })
                    }, response => {
                        _loading.close()
                        this.$toast.error(response) 
                    })
                })
            }
        }
    }
</script>

<style scoped>
.remove {
    width: 100%;
    height: 48px;
    line-height: 48px;
    display: block;
    background: #f44336;
    color: #fff;
    text-align: center;
}
.wapper {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
.content-wapper {
    width: 800px;
    padding-top: 30px;
    margin: 0 auto;
}
.tips {
    color: #484848;
    padding: 10px 0;
}
.tips label {
    font-size: 18px;
    display: block;
}
.content-wapper .save {
    display: inline-block;
    padding: 15px 40px;
    border-radius: 30px;
    background-color: #111;
    color: #fff;
    position: fixed;
    bottom: 30px;
    right: 15px;
}
.content-wapper .top {
    width: 100%;
    background: #fff;
    margin-bottom: 15px;
}
.content-wapper .info {
    display: inline-block;
    width: 100%;
}
.content-wapper .info li {
    display: block;
    margin: 15px;
}
.content-wapper .images {
    padding: 15px;
    background-color: #fff;
    margin-bottom: 15px;
}
.content-wapper .images ul {
    display: block;
    margin-top: 15px;
}
.content-wapper .images li {
    display: inline-block;
    width: 385px;
    height: 385px;
    padding: 10px;
    text-align: center;
    vertical-align: middle;
    position: relative;
}
.content-wapper .images li a {
    width: 365px;
    height: 50px;
    line-height: 50px;
    vertical-align: middle;
    background: rgba(0,0,0,0.3);
    color: #fff;
    position: absolute;
    bottom: 10px;
    left: 10px;
}
.content-wapper .images li img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.content-wapper .images .upload {
    font-size: 12px;
    cursor: pointer;
    border: 2px dotted #e0e0e0;
    border-radius: 5px;
}
.content-wapper .detail {
    background-color: #fff;
    margin-bottom: 180px;
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
</style>