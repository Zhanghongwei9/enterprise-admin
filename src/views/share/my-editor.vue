<template>
    <quillEditor v-model="intro" ref="editor" :options="toolbar"></quillEditor>
</template>

<script>
    import {quillEditor} from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    export default {
        name: 'my-editor',
        components: {
            quillEditor
        },
        props: {
            intro: String
        },
        data() {
            return {
                toolbar: {
                    modules: {
                        toolbar:[
                            ['bold', 'italic', 'underline', 'strike', 'link'],
                            ['blockquote', 'code-block'],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'color': [] }, { 'background': [] }],
                            ['image', 'video']
                        ],
                    }
                }
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