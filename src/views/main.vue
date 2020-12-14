<template>
    <div class="wapper">
        <div class="top-wapper">
            <div>
                <label>企业管理后台</label>
            </div>
        </div>
        <div class="menu-wapper">
            <div class="item-group">
                <ul>
                    <li>
                        <router-link :to="{ name: '/base-info'}">
                            <img src="@/assets/setting.png">
                            基础设置
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: '/column-list'}">
                            <img src="@/assets/tree.png">
                            栏目管理
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: '/products-list'}">
                            <img src="@/assets/goods.png">
                            产品管理
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: '/article-list'}">
                            <img src="@/assets/article.png">
                            文章管理
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: '/activity-list'}">
                            <img src="@/assets/activity.png">
                            活动管理
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="item-group">
                <ul>
                    <li>
                        <a href="javascript:;" @click="loginOut">
                            <img src="@/assets/out.png">
                            退出登录
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content-wapper">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import _cookies from 'js-cookie' 
    export default {
        methods: {
            loginOut () {
                _cookies.remove('enterprise-login-token')
                window.location.href = '/login'
            }
        }
    }
</script>

<style scoped>
.wapper {
    width: 100%;
    height: 100%;
}
.top-wapper {
    padding: 0 15px;
    height: 60px;
    line-height: 60px;
    vertical-align: middle;
    box-shadow: inset 0px -1px 0px #e1e2e2;
}
.menu-wapper {
    width: 260px;
    height: calc(100% - 60px);
    display: inline-block;
    padding: 15px;
    border-right: 1px solid #d6dbe5;
}
.menu-wapper .item-group {
    box-shadow: inset 0px -1px 0px #e1e2e2;
    padding: 30px 0;
}
.menu-wapper .item-group:last-child {
    box-shadow: none;
}
.menu-wapper img {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-top: -3px;
    margin-right: 5px;
    vertical-align: middle;
}
.item-group li {
    display: block;
    width: 100%;
    position: relative;
}
.item-group:first-child {
    padding-top: 0;
}
.item-group li a{
    display: inline-block;
    color: #0b1d1e;
    padding: 10px 20px;
    padding-right: 50px;
}
.content-wapper {
    width: calc(100% - 260px);
    height: calc(100% - 60px);
    display: inline-block;
    vertical-align: top;
}
.router-link-active {
   color: #ff4081 !important;
}
</style>