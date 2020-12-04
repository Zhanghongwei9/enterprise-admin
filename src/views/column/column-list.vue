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
                <vuedraggable>
                    <li class="top-column">
                        <label>所有产品</label>
                        <a href="javascript:void(0);" class="edit">编辑</a>
                    </li>
                    <li class="top-column">
                        <label>房间</label>
                    </li>
                    <li class="top-column">
                        <label>优惠</label>
                    </li>
                    <li class="top-column">
                        <label>活动和特惠</label>
                    </li>
                    <li>
                        <label>家居灵感</label>
                    </li>
                    <li>
                        <label>新品</label>
                    </li>
                    <li>
                        <label>客户服务</label>
                    </li>
                    <li>
                        <label>联系我们</label>
                    </li>
                </vuedraggable>
                <li>
                    <a href="javascript:vpid(0);">+新增栏目</a>
                </li>
            </ul>
            <ul class="next">
                <li class="titile">
                    <label>所有产品</label>
                </li>
                <vuedraggable>
                    <li>
                        <label>房间</label>
                        <a href="javascript:void(0);" class="edit">编辑</a>
                    </li>
                    <li>
                        <label>优惠</label>
                    </li>
                    <li>
                        <label>活动和特惠</label>
                    </li>
                    <li>
                        <label>家居灵感</label>
                    </li>
                    <li>
                        <label>新品</label>
                    </li>
                    <li>
                        <label>客户服务</label>
                    </li>
                    <li>
                        <label>联系我们</label>
                    </li>
                </vuedraggable>
                <li>
                    <a href="javascript:vpid(0);">+新增栏目</a>
                </li>
            </ul>
            <ul class="next">
                <li class="titile">
                    <label>房间</label>
                </li>
                <vuedraggable>
                    <li>
                        <label>优惠</label>
                    </li>
                    <li>
                        <label>活动和特惠</label>
                    </li>
                    <li>
                        <label>家居灵感</label>
                    </li>
                    <li>
                        <label>新品</label>
                    </li>
                    <li>
                        <label>客户服务</label>
                    </li>
                    <li>
                        <label>联系我们</label>
                    </li>
                </vuedraggable>
                <li>
                    <a href="javascript:vpid(0);" @click="add">+新增栏目</a>
                </li>
            </ul>
        </div>
        <a href="javascript:void(0);" class="save">保存并刷新</a>
    </div>
</template>

<script>
    import vuedraggable from 'vuedraggable'
    export default {
        components: {
            vuedraggable
        },
        data() {
            return {
                
            }
        },
        methods: {
            add () {
                this.$router.push({
                    name: '/add-column'
                })
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
    padding-left: 50px;
}
.tips label {
    font-size: 18px;
    display: block;
    margin-bottom: 15px;
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
.column-wapper .next .titile label {
    font-size: 24px;
    font-weight: 700;
}
.column-wapper .next .titile label:hover {
    text-decoration: none;
    cursor: text;
}
</style>