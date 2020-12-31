<template>
    <a href="javascript:void(0);" @click="back"></a>
</template>

<script>
    export default {
        name: 'my-back',
        props: ['to'],
        methods: {
            back () {
                this.$router.push({
                    path: this.to.path
                })
            }
        }
    }
</script>

<style scoped>
a {
    width: 30px;
    height: 30px;
    display: inline-block;
    position: relative;
    border-radius: 50%;
    margin-right:15px;
}
a:hover {
    background: #dfdfdf;
}
a::after {
    content: '';
    width: 25px;
    height: 25px;
    display: block;
    background: url(../../assets/back.png);
    background-size: 25px 25px;
    background-repeat: no-repeat;
    position: absolute;
    top: calc(5px / 2);
    left: calc(5px / 2);
}
</style>