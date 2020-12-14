<template>
    <div class="wapper">
        <div class="content">
            <label class="title">登录</label>
            <ul>
                <li>
                    <label>手机号</label>
                    <input type="text" v-model="info.mobile">
                </li>
                <li>
                    <label>密码</label>
                    <input type="password" v-model="info.password">
                </li>
                <li>
                    <a href="javascript:void(0);" @click="login">登录</a>
                    <span class="tips">{{message}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import _userInfo from '@/service/userinfo-service'
    import _cookies from 'js-cookie' 
    export default {
        data() {
            return {
                info: {
                    mobile: null,
                    password: null
                },
                message: null
            }
        },
        methods: {
            login () {
                if (this.info.mobile == null || this.info.mobile == '') {
                    this.message = '请输入手机号'
                    return
                }
                if (this.info.password == null || this.info.password == '') {
                    this.message = '请输入密码'
                    return
                }
                let _loading = this.$loading({ fullscreen: true })
                _userInfo.loginByMobile(this.info, response => {
                    _loading.close()
                    _cookies.set('enterprise-login-token', response)
                    this.$router.push({
                        path: '/'
                    })
                }, response => {
                    _loading.close()
                    this.message = response
                })
            }
        }
    }
</script>

<style scoped>
.wapper {
    width: 100%;
    height: 100%;
}
.content {
    width: 480px;
    margin: 0 auto;
    padding-top: 180px;
}
.content .title {
    font-size: 26px;
    font-weight: bold;
    display: block;
    text-align: center;
}
.content li {
    display: block;
    margin-bottom: 15px;
}
.content li label {
    display: block;
}
.content input {
    border: 1px solid #cccccc;
    width: 100%;
    height: 48px;
    padding: 0 15px;
}
.content a {
    background: #407ab1;
    width: 100%;
    height: 48px;
    line-height: 48px;
    display: block;
    text-align: center;
    color: #fff;
    font-weight: bold;
    margin-top: 60px;
}
.tips {
    color: #f44336;
}
</style>