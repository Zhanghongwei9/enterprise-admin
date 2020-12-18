<template>
    <quillEditor v-bind:content="value" ref="editor" :options="toolbar" 
        v-on:change="$emit('change', $event.html)"></quillEditor>
</template>

<script>
    import {quillEditor, Quill} from 'vue-quill-editor'
    import {ImageExtend} from 'quill-image-extend-module'
    import {quillRedefine} from 'vue-quill-editor-upload'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import _request from '@/utils/request'
    import _cookies from 'js-cookie' 
    export default {
        name: 'my-editor',
        components: {
            quillEditor
        },
        model: {
            props: 'value',
            event: 'change'
        },
        props: {
            value: String
        },
        created () {
            this.toolbar = quillRedefine({
                // 图片上传的设置
                uploadConfig: {
                    loading: true,
                    name: 'file',
                    accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',
                    header: xhr => {
                        // 上传图片请求需要携带token的 在xhr.setRequestHeader中设置
                        xhr.setRequestHeader(
                            "enterprise-login-token", _cookies.get('enterprise-login-token') || ''
                        )
                    },
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
        data() {
            Quill.register('modules/ImageExtend', ImageExtend)
            return {
                toolbar: null
            }
        }
    }
</script>

<style>
.ql-editor {
    min-height: 160px !important;
    color: #383E43;
}
</style>