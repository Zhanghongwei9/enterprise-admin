<template>
    <ul>
        <li 
            v-for="(item, index) in data"
            :key="index">
            <treeItem :item="item"></treeItem>
        </li>
    </ul>
</template>

<script>
    import treeItem from '@/components/tree-item'
    export default {
        name: 'tree-data',
        components: {
            treeItem
        },
        props: {
            data: Array
        }
    }
</script>

<style scoped>

</style>