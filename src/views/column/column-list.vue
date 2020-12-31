<template>
    <div class="wapper">
        <div class="tips">
            <label>配置我的栏目</label>
            <span>
                排序。拖拽目标栏目至想要的位置<br>
                置顶。置顶栏目最多为4个<br>
            </span>
        </div>
        <div class="column-wapper">
            <ul class="first">
                <vuedraggable @change="columnsRootSort" v-model="columnsRoot">
                    <li class="top-column" v-for="item in columnsRoot" :key="item.id">
                        <label @click="getColumnByParent('columnsSecond', item)">{{item.name}}</label>
                        <a href="javascript:void(0);" class="edit" @click="edit(item.id)">编辑</a>
                    </li>
                </vuedraggable>
                <li>
                    <a href="javascript:vpid(0);" @click="addColumn(null)">+新增栏目</a>
                </li>
            </ul>
            <template v-if="checked.columnRootCurr">
                <ul class="next">
                    <li class="title" >
                        <label>{{checked.columnRootCurr.name}}</label>
                    </li>
                    <vuedraggable @change="columnsSecondSort" v-model="columnsSecond">
                        <li class="top-column" v-for="item in columnsSecond" :key="item.id">
                            <label @click="getColumnByParent('columnsThird', item)">{{item.name}}</label>
                            <a href="javascript:void(0);" class="edit" @click="edit(item.id)">编辑</a>
                        </li>
                    </vuedraggable>
                    <li>
                        <a href="javascript:void(0);" @click="addColumn(checked.columnRootCurr.id)">+新增栏目</a>
                    </li>
                </ul>
            </template>
            <!-- <template v-else-if="columnRootCurr && columnRootCurr.category != 1">
                <div class="tips contet-tips">
                    <label>当前选择栏目不支持继续添加子栏目</label>
                    <span>
                        点击编辑，继续关联设置其他关联信息
                    </span>
                </div>
            </template> -->
            <ul class="next" v-if="checked.columnSecondCurr">
                <li class="title" >
                    <label>{{checked.columnSecondCurr.name}}</label>
                </li>
                <vuedraggable @change="columnsThirdSort" v-model="columnsThird">
                    <li class="top-column" v-for="item in columnsThird" :key="item.id">
                        <label>{{item.name}}</label>
                        <a href="javascript:void(0);" class="edit" @click="edit(item.id)">编辑</a>
                    </li>
                </vuedraggable>
                <li>
                    <a href="javascript:vpid(0);" @click="addColumn(checked.columnSecondCurr.id)">+新增栏目</a>
                </li>
            </ul>
        </div>
        <!-- 添加栏目 -->
        <addColumn ref="addColumn" @refresh="refresh"></addColumn>
    </div>
</template>

<script>
    import vuedraggable from 'vuedraggable'
    import _column from '@/service/column-service'
    import addColumn from '@/views/column/add-column'
    export default {
        components: {
            vuedraggable,
            addColumn
        },
        data() {
            return {
                columnsRoot: null,
                columnsSecond: null,
                columnsThird: null,
                checked: {
                    columnRootCurr: null,
                    columnSecondCurr: null,
                }
            }
        },
        mounted () {
            this.checked = this.$getParams()
            if (!this.checked) {
                this.checked = {
                    columnRootCurr: null,
                    columnSecondCurr: null,
                }
            }
            this.getColumns()
        },
        methods: {
            getColumns () {
                _column.getColumnRoot(response => {
                    this.columnsRoot = response
                }, response => {
                    this.$toast.error(response)
                })
                if (this.checked) {
                    if (this.checked.columnRootCurr) {
                        _column.getColumnByParent(this.checked.columnRootCurr.id, response => {
                            this.columnsSecond = response
                        }, response => {
                            this.$toast.error(response)
                        })
                    }
                    if (this.checked.columnSecondCurr) {
                        _column.getColumnByParent(this.checked.columnSecondCurr.id, response => {
                            this.columnsThird = response
                        }, response => {
                            this.$toast.error(response)
                        })
                    }
                }
            },
            edit (columnId) {
                this.$saveParams(this.checked)
                this.$router.push({
                    name: '/edit-column',
                    query: {
                        columnId: columnId
                    }
                })
            },
            columnsRootSort (event) {
                let _loading = this.$loading({ fullscreen: true })
                var params = {
                    columnId: this.columnsRoot[event.moved.newIndex].id,
                    index: event.moved.newIndex
                }
                _column.updateSort(params, () => {
                    this.$toast.success('修改成功') 
                    _loading.close()
                }, response => {
                    _loading.close()
                    this.$toast.success(response) 
                })
            },
            columnsSecondSort (event) {
                let _loading = this.$loading({ fullscreen: true })
                var params = {
                    columnId: this.columnsSecond[event.moved.newIndex].id,
                    index: event.moved.newIndex
                }
                _column.updateSort(params, () => {
                    this.$toast.success('修改成功') 
                    _loading.close()
                }, response => {
                    _loading.close()
                    this.$toast.success(response) 
                })
            },
            columnsThirdSort (event) {
                let _loading = this.$loading({ fullscreen: true })
                var params = {
                    columnId: this.columnsThird[event.moved.newIndex].id,
                    index: event.moved.newIndex
                }
                _column.updateSort(params, () => {
                    this.$toast.success('修改成功') 
                    _loading.close()
                }, response => {
                    _loading.close()
                    this.$toast.success(response) 
                })
            },
            getColumnByParent (field, item) {
                _column.getColumnByParent(item.id, response => {
                    if (field == 'columnsSecond') {
                        this.checked.columnRootCurr = item
                        this.checked.columnSecondCurr = null
                        this.columnsSecond = null
                        this.columnsThird = null
                    }
                    if (field == 'columnsThird') {
                        this.checked.columnSecondCurr = item
                        this.checked.columnsThird = null
                    }
                    this[field] = response
                }, response => {
                    this.$toast.error(response)
                })
            },
            addColumn (parentId) {
                this.$refs.addColumn.show(parentId)
            },
            refresh () {
                _column.getColumnRoot(response => {
                    this.columnsRoot = response
                }, response => {
                    this.$toast.error(response)
                })
                if (this.checked) {
                    if (this.checked.columnRootCurr) {
                        _column.getColumnByParent(this.checked.columnRootCurr.id, response => {
                            this.columnsSecond = response
                        }, response => {
                            this.$toast.error(response)
                        })
                    }
                    if (this.checked.columnSecondCurr) {
                        _column.getColumnByParent(this.checked.columnSecondCurr.id, response => {
                            this.columnsThird = response
                        }, response => {
                            this.$toast.error(response)
                        })
                    }
                }
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
.tips {
    color: #111;
    padding: 10px 0;
    padding-left: 50px;
}
.tips label {
    font-size: 18px;
    display: block;
    margin-bottom: 15px;
}
.contet-tips {
    display: inline-block;
    padding-top: 0;
}
.column-wapper {
    display: inline-block;
    height: calc(100% - 105px);
    padding-top: 50px;
}
.column-wapper ul li label {
    cursor: pointer;
    vertical-align: top;
}
.column-wapper ul li label:hover {
    text-decoration: underline;
}
.column-wapper ul {
    display: inline-block;
    width: 300px;
    height: 100%;
    padding-left: 50px;
    vertical-align: top;
}
.column-wapper .edit {
    margin-left: 5px;
}
.column-wapper .first li{
    margin-bottom: 10px;
}
.column-wapper .first li label{
    font-size: 16px;
    color: #383E43;
    font-weight: 700;
    margin-bottom: 10px;
}
.column-wapper .first li:nth-child(-n+4) {
    margin-bottom: 20px;
}
.column-wapper .first li:nth-child(-n+4) label {
    font-size: 24px;
    position: relative;
    padding-left: 40px;
}
.column-wapper .first li:nth-child(-n+4) label::after {
    content: '置顶';
    display: inline-block;
    padding: 2px 5px;
    border-radius: 5px;
    background: #ffda21;
    font-size: 12px;
    position: absolute;
    left: 0;
    top: 5px;
}
.column-wapper .first li{
    margin-bottom: 10px;
}
.column-wapper .next li {
    margin-bottom: 10px;
}
.column-wapper .next .title label {
    font-size: 24px;
    font-weight: 700;
}
.column-wapper .next .title label:hover {
    text-decoration: none;
    cursor: text;
}
</style>