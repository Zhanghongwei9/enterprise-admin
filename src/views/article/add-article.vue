<template>
    <div class="wapper">
        <div class="content-wapper">
            <mu-form ref="form" :model="info" class="mu-demo-form" label-width="200">
                <ul class="form">
                    <li>
                        <mu-form-item prop="title" label-float label="文章标题" :rules="rules.title">
                            <mu-text-field v-model="info.title" :max-length="128"></mu-text-field>
                        </mu-form-item>
                    </li>
                </ul>
                <my-editor v-model="info.content"></my-editor>
            </mu-form>
        </div>
        <a href="javascript:void(0);" class="save" @click="save">保存</a>
    </div>
</template>

<script>
    import _article from '@/service/article-service'
    export default {
        mounted () {
            if (this.$route.query.articleId) {
                let _loading = this.$loading({ fullscreen: true })
                _article.getArticlesDetail(this.$route.query.articleId, response => {
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
                    title: null,
                    content: null
                },
                rules: {
                    title: [
                        { validate: (val) => !!val, message: '文章标题不能为空'},
                    ]
                }
            }
        },
        methods: {
            save () {
                this.$refs.form.validate().then((valid) => {
                    if (!valid) {
                        return
                    }
                    let _loading = this.$loading({ fullscreen: true })
                    _article.saveArticle(this.info, () => {
                        _loading.close()
                        this.$toast.success('保存成功')
                        this.$router.push({
                            name: '/article-list'
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