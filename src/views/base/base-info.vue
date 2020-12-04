<template>
    <div class="wapper">
        <div class="content-wapper">
            <div class="tips">
                <label>配置企业基础信息</label>
                <span>
                    填写基础配置信息<br>
                    点击保存<br>
                </span>
            </div>
            <mu-form :model="info" class="mu-demo-form" label-width="200">
                <mu-form-item prop="" label="企业名称" label-float>
                    <mu-text-field v-model="info.name"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="" label="展示名称" label-float>
                    <mu-text-field v-model="info.name"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="" label="完整域名路径" label-float>
                    <mu-text-field v-model="info.name"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="" label="主域名路径" label-float>
                    <mu-text-field v-model="info.name"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="" label="LOGO">
                    <div class="upload-img">
                        请上传LOGO
                    </div>
                </mu-form-item>
                <mu-form-item prop="" label="ICO图标">
                    <div class="upload-img">
                        请上传ICO图标
                    </div>
                </mu-form-item>
                <mu-form-item prop="" label="联系方式（手机号）" label-float>
                    <mu-text-field v-model="info.name"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="" label="联系方式（邮箱）" label-float>
                    <mu-text-field v-model="info.name"></mu-text-field>
                </mu-form-item>
            </mu-form>
        </div>
        <a href="javascript:void(0);" class="save">保存</a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                info: {
                    name: ''
                }
            }
        },
    }
</script>

<style scoped>
.wapper {
    padding: 15px;
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
.tips {
    color: #111;
    padding: 10px 0;
}
.tips label {
    font-size: 18px;
    display: block;
    margin-bottom: 15px;
}
.content-wapper {
    width: 800px;
    margin: 0 auto;
}
.upload-img {
    width: 130px;
    height: 60px;
    line-height: 60px;
    border: 1px solid #e1e2e2;
    font-size: 12px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
}
</style>