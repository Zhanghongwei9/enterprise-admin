<template>
    <li>
        <!-- 节点名称 -->
        <div class="content">
            <label>{{item.name}}</label>
            <a href="javascript:void(0);">+子栏目</a>
        </div>
        <ul>
            <tree-item
                v-for="(child, index) in item.children"
                :key="index"
                :item="child">
            </tree-item>
        </ul>
    </li>
</template>

<script>
    export default {
        name: 'tree-item',
        props: {
            item: Object
        }
    }
</script>

<style scoped>
ul {
  padding-left: 30px;
  line-height: 2em;
  list-style-type: dot;
}
.item {
    display: inline-block;
    width: 100%;
    line-height: 40px;
    padding-left: 15px;
    position: relative;
}
span {
    margin-left: 10px;
}
.content {
    display: block;
    margin: 15px 0;
    padding: 15px;
    border: 1px solid #e1e2e2;
    border-left: 3px solid #bbdefb;
    position: relative;
}
.content a {
    position: absolute;
    right: 15px;
}
</style>