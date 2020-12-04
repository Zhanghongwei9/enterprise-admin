<template>
    <div class="wapper">
        <div class="content-wapper">
            <!-- 基础信息 -->
            <div class="top">
                <img src="https://www.ikea.cn/cn/zh/images/products/kungsfors-kang-fu-si-5gou-gua-gan-1rong-qi-bu-xiu-gang__0755315_PE748361_S5.JPG">
                <ul class="info">
                    <li>
                        <mu-text-field label="产品名称" full-width label-float help-text="产品名称为6-12长度的字符"></mu-text-field>
                    </li>
                    <li>
                        <mu-text-field label="规格描述" full-width label-float help-text="规格描述为6-12长度的字符"></mu-text-field>
                    </li>
                    <li>
                        <mu-text-field label="产品价格" full-width label-float help-text="产品价格单位为“元”"></mu-text-field>
                    </li>
                    <li>
                        <mu-text-field label="产品原始价格" full-width label-float help-text="产品原始价格单位为“元”"></mu-text-field>
                    </li>
                </ul>
            </div>
            <!-- 图集 -->
            <div class="images">
                <div class="tips">
                    <label>产品图集</label>
                    <span>用于产品详情页展示。最多支持上传4张图片</span>
                </div>
                <ul>
                    <li class="upload">点击上传图片</li>
                </ul>
            </div>
            <!-- 详情内容 -->
            <div class="detail">
                <quillEditor v-model="info.intro" ref="editor" :options="toolbar"></quillEditor>
            </div>
            <a href="javascript:void(0);" class="save">保存</a>
        </div>
    </div>
</template>

<script>
    import {quillEditor} from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    export default {
        components: {
            quillEditor
        },
        data() {
            return {
                toolbar: {
                    modules: {
                        toolbar:[
                            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                            ['blockquote', 'code-block'],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'color': [] }, { 'background': [] }],
                            ['image', 'video']
                        ],
                    }
                },
                info: {
                    intro: '请输入产品详情描述。'
                }
            }
        }
    }
</script>

<style scoped>
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
.content-wapper .top img{
    width: 400px;
    height: 400px;
    display: inline-block;
    vertical-align: top;
    object-fit: cover;
}
.content-wapper .info {
    display: inline-block;
    width: calc(100% - 400px);
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
.content-wapper .images li {
    display: inline-block;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    vertical-align: middle;
}
.content-wapper .images .upload {
    background-color: #f3f4fb;
    font-size: 12px;
    cursor: pointer;
    color: #484848;
}
.content-wapper .detail {
    background-color: #fff;
    margin-bottom: 180px;
}
</style>