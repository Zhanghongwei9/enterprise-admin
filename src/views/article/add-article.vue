<template>
    <div class="wapper">
        <div class="content-wapper">
            <ul class="form">
                <li>
                    <mu-text-field label="文章标题" full-width label-float help-text="文章标题为6-12长度的字符"></mu-text-field>
                </li>
            </ul>
            <mavon-editor 
                ref="meditor"
                v-model="info.content"
                :boxShadow="false" 
                :toolbars='toolbars'
                @imgAdd="imageAdd"
                id="markdown-body"
            ></mavon-editor>
        </div>
        <a href="javascript:void(0);" class="save">保存</a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                info: {
                    content: ''
                },
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: false, // 上角标
                    subscript: false, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: false, // 沉浸式阅读
                    htmlcode: false, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: false, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: false, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: false, // 预览
                }
            }
        },
        methods: {
            imageAdd () {

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
    margin: 0 auto;
    padding-top: 30px;
}
.content-wapper .form li{
    display: block;
    margin-bottom: 15px;
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
</style>