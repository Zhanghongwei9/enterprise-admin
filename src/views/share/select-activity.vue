<template>
    <mu-dialog title="关联活动" width="1080" :open.sync="openSimple">
        <div class="content-wapper">
            <div class="top">
                <input type="input" placeholder="输入关键字查询...">
                <a href="javascript:void(0);" class="search"></a>
            </div>
            <table class="list">
                <tr>
                    <td class="title">Let's play 玩在一起</td>
                    <td>2019-04-06</td>
                    <td>
                        <a href="javascript:void(0);">选择</a>
                    </td>
                </tr>
                <tr>
                    <td class="title">我们的超值低价</td>
                    <td>2019-04-06</td>
                    <td>
                        <a href="javascript:void(0);">选择</a>
                    </td>
                </tr>
            </table>
        </div>
    </mu-dialog>
</template>

<script>
    export default {
        data() {
                return {
                    openSimple: false
                }
        },
        methods: {
            show () {
                this.openSimple = true
            }
        }
    }
</script>

<style scoped>
.content-wapper {
    width: 100%;
    height: 600px;
}
.content-wapper .top {
    display: inline-block;
    vertical-align: top;
    width: 400px;
    height: 55px;
    margin-bottom: 30px;
}
.content-wapper .top input {
    display: inline-block;
    width: calc(100% - 55px);
    background-color: #f3f4fb;
    height: 50px;
    border-radius: 25px;
    padding: 0 20px;
    margin-right: 15px;
    vertical-align: top;
}
.content-wapper .top .search {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #484848;
    position: relative;
    background-color: #fff;
    margin-top: 5px;
    vertical-align: top;
}
.content-wapper .top .search::after {
    content: '';
    width: 20px;
    height: 20px;
    background: url(../../assets/search.png);
    background-size: 20px 20px;
    position: absolute;
    top: 9px;
    left: 9px;
    cursor: pointer;
}
.content-wapper .list {
    width: 100%;
}
.content-wapper .list tr {
    border-top: 1px solid #eee;
}
.content-wapper .list tr:last-child {
    border-bottom: 1px solid #eee;
}
.content-wapper .list td {
    padding: 10px 15px;
}
.content-wapper .list .title {
    cursor: pointer;
}
.content-wapper .list .title:hover {
    text-decoration: underline;
}
</style>