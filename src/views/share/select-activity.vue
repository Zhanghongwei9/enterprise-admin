<template>
    <mu-dialog title="关联活动" width="1080" :open.sync="openSimple">
        <div class="content-wapper">
            <div class="top">
                <input type="input" placeholder="输入关键字查询...">
                <a href="javascript:void(0);" class="search"></a>
            </div>
            <table class="list">
                <tr v-for="item in infos" :key="item.id">
                    <td class="title">{{item.name}}</td>
                    <td>{{item.gmtCreate}}</td>
                    <td>
                        <mu-checkbox v-model="item.checked"></mu-checkbox>
                    </td>
                </tr>
            </table>
            <infinite-loading @infinite="getInfoList" :distance="30" spinner="waveDots" ref="infiniteLoading">
                <div slot="no-more">无更多内容</div>
                <div slot="no-results">已加载完成</div>
            </infinite-loading>
        </div>
        <div class="bottom-wapper">
            <a href="javascript:void(0);" class="save" @click="save">确认选择</a>
        </div>
    </mu-dialog>
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
                openSimple: false,
                query: {
                    name: null,
                    pageIndex: 0,
                    pageSize: 20
                },
                infos: [],
                checkedInfos: null
            }
        },
        methods: {
            show (checkedInfos) {
                this.checkedInfos = checkedInfos
                this.openSimple = true
                this.reset()
            },
            save () {
                let _loading = this.$loading({ fullscreen: true })
                var checkedInfos = []
                for (const item of this.infos) {
                    if (item.checked) {
                        checkedInfos.push(item)
                    }
                }
                this.$emit('change', {
                    checkedInfos: checkedInfos,
                    params: this.params
                })
                _loading.close()
                this.openSimple = false
            },
            getInfoList ($state) {
                this.query.pageIndex++
                _activity.getActivities(this.query, 
                    (response, total) => {
                        this.query.total = total
                        for (let activity of response) {
                            if (this.checkedInfos) {
                                activity.checked = this.checkedInfos.findIndex(item => item.id == activity.id) != -1
                            }
                            this.infos.push(activity)
                        }
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
            }
        }
    }
</script>

<style scoped>
.bottom-wapper {
    text-align: right;
}
.save {
    display: inline-block;
    padding: 15px 40px;
    border-radius: 30px;
    background-color: #111;
    color: #fff;
}
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
