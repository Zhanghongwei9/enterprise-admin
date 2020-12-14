<template>
    <div class="wapper">
        <div class="title-wapper">
            <label>活动管理</label>
            <a href="javascript:void(0);" class="add" @click="add">创建新活动</a>
        </div>
        <div class="content-wapper">
            <div class="top">
                <input type="input" placeholder="输入关键字查询..." v-model="query.name">
                <a href="javascript:void(0);" class="search" @click="queryInfo"></a>
            </div>
            <table class="list">
                <tr v-for="item in infos" :key="item.id">
                    <td class="title">{{item.name}}</td>
                    <td>{{item.gmtCreate}}</td>
                    <td>
                        <a href="javascript:void(0);" @click="edit(item.id)">编辑</a>
                    </td>
                </tr>
            </table>
            <infinite-loading @infinite="getInfoList" :distance="30" spinner="waveDots" ref="infiniteLoading">
                <div slot="no-more">无更多内容</div>
                <div slot="no-results">已加载完成</div>
            </infinite-loading>
        </div>
    </div>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading' 
    import _activity from '@/service/activity-service'
    export default {
        components: {
            InfiniteLoading
        },
        data() {
            return {
                query: {
                    name: null,
                    pageIndex: 0,
                    pageSize: 20
                },
                infos: []
            }
        },
        methods: {
            add () {
                this.$router.push({
                    name: '/add-activity'
                })
            },
            edit (activityId) {
                this.$router.push({
                    name: '/add-activity',
                    query: {
                        activityId: activityId
                    }
                })
            },
            getInfoList ($state) {
                this.query.pageIndex++
                _activity.getActivities(this.query, 
                    (response, total) => {
                        this.query.total = total
                        response.forEach(item => {
                            this.infos.push(item)
                        })
                        $state.loaded()
                        if (response == null || response.length == 0) {
                            $state.complete()
                        }
                }, () => {
                    $state.complete()
                })
            },
            queryInfo () {
                this.query.pageIndex = 0
                this.infos = []
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
            },
            reset () {
                this.query = {
                    name: null,
                    pageIndex: 0,
                    pageSize: 20
                },
                this.infos = []
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
            }
        }
    }
</script>

<style scoped>
.wapper {
    width: 100%;
    height: 100%;
    padding: 15px;
}
.title-wapper {
    display: block;
    margin-bottom: 15px;
    text-align: right;
    position: relative;
}
.title-wapper label {
    font-size: 22px;
    font-weight: bold;
    position: absolute;
    left: 0;
}
.title-wapper .add {
    display: inline-block;
    padding: 10px 15px;
    padding-right: 40px;
    border-radius: 3px;
    background-color: #ffda21;
    color: #383E43;
    position: relative;
}
.title-wapper .add::after {
    content: '';
    width: 10px;
    height: 10px;
    background: url(../../assets/add.png);
    background-size: 10px 10px;
    position: absolute;
    top: 15px;
    right: 10px;
    cursor: pointer;
}
.content-wapper {
    width: 100%;
}
.content-wapper .top {
    display: inline-block;
    vertical-align: top;
    width: 400px;
    height: calc(100% - 60px);
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