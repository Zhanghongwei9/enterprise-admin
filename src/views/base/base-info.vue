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
            <mu-form ref="form" :model="info" class="mu-demo-form" label-width="200">
                <mu-form-item prop="name" label="企业名称" :rules="rules.name">
                    <mu-text-field v-model="info.name" :max-length="64"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="displayedName" label="展示名称" >
                    <mu-text-field v-model="info.displayedName" :max-length="64"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="fullDomainAddress" label="完整域名路径" >
                    <mu-text-field v-model="info.fullDomainAddress" :max-length="128" prefix="http://"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="mainDomainAddress" label="主域名路径" >
                    <mu-text-field v-model="info.mainDomainAddress" :max-length="128"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="" label="LOGO">
                    <img class="logo" :src="info.logoAddress" v-if="info.logoAddress">
                    <div class="upload-img">
                        <img src="@/assets/up-load.png">
                        请上传LOGO。支持格式png/jpeg/jpg
                        <input type="file" @change="uploadImage($event, 'logoAddress')" accept="image/jpeg,image/png,image/jpg">
                    </div>
                </mu-form-item>
                <mu-form-item prop="" label="ICO图标">
                    <div class="upload-img">
                        <img src="@/assets/up-load.png">
                        请上传ICO图标。支持格式ico
                        <input type="file" accept="image/jpeg,image/png,image/jpg">
                    </div>
                </mu-form-item>
                <mu-form-item prop="" label="联系方式（手机号）" >
                    <mu-text-field v-model="info.mobile" :max-length="11"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="" label="联系方式（邮箱）" >
                    <mu-text-field v-model="info.email" :max-length="64"></mu-text-field>
                </mu-form-item>
            </mu-form>
        </div>
        <a href="javascript:void(0);" class="save" @click="save">保存</a>
    </div>
</template>

<script>
    import _baseinfo from '@/service/baseinfo-service'
    import _file from '@/service/file-service'
    export default {
        data() {
            return {
                info: {
                    companyCode: 10000,
                    name: null,
                    displayedName: null,
                    logoAddress: null,
                    icoAddress: null,
                    fullDomainAddress: null,
                    mainDomainAddress: null,
                    email: null,
                    mobile: null
                },
                rules: {
                    name: [
                        { validate: (val) => !!val, message: '公司名称不能为空'},
                    ]
                }
            }
        },
        mounted () {
            _baseinfo.getBaseInfo(this.info.companyCode, response => {
                this.info = response
            }, response => {
                this.$toast.error(response)
            })
        },
        methods: {
            save () {
                this.$refs.form.validate().then((valid) => {
                    if (!valid) {
                        return
                    }
                    let _loading = this.$loading({ fullscreen: true })
                    _baseinfo.saveBaseInfo(this.info, () => {
                        this.$toast.success('保存成功')
                        _loading.close()
                    }, response => {
                        _loading.close()
                        this.$toast.error(response)
                    })
                })
            },
            uploadImage (event, field) {
                let _loading = this.$loading({ fullscreen: true })
                var file = event.target.files[0]
                _file.uploadImage(file, response => {
                    _loading.close()
                    this.info[field] = response
                }, response => {
                    _loading.close()
                    this.$toast.error(response)
                })
            }
        }
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
.logo {
    display: inline-block;
    height: 60px;
    margin-right: 30px;
}
</style>