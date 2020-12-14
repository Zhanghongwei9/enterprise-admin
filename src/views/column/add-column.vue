<template>
    <mu-dialog title="添加栏目" width="360" :open.sync="openSimple">
         <mu-form ref="form" :model="info" class="mu-demo-form" label-position="top" label-width="100">
            <div class="content">
                <mu-form-item prop="name" label="栏目名称" :rules="rules.name">
                    <mu-text-field v-model="info.name"></mu-text-field>
                </mu-form-item>
            </div>
        </mu-form>
        <div class="bottom-wapper">
            <a href="javascript:void(0);" class="save" @click="save">保存</a>
        </div>
    </mu-dialog>
</template>

<script>
    import _column from '@/service/column-service'
    export default {
        data() {
            return {
                openSimple: false,
                info: {
                    name: null,
                    parentId: null
                },
                rules: {
                    name: [
                        { validate: (val) => !!val, message: '栏目名称不能为空'},
                    ]
                }
            }
        },
        methods: {
            show (parentId) {
                this.info = {
                    name: null,
                    parentId: parentId ? parentId : 0
                }
                this.openSimple = true
            },
            save () {
                this.$refs.form.validate().then((valid) => {
                    if (!valid) {
                        return
                    }
                    let _loading = this.$loading({ fullscreen: true })
                    _column.addColumn(this.info, () => {
                        this.openSimple = false
                        _loading.close()
                        this.$toast.success('添加成功') 
                        this.$emit('refresh')
                    }, response => {
                        _loading.close()
                        this.$toast.error(response) 
                    })
                })
            }
        }
    }
</script>

<style scoped>
.bottom-wapper {
    position: relative;
    height: 40px;
}
.save {
    display: inline-block;
    padding: 10px 40px;
    border-radius: 30px;
    background-color: #111;
    color: #fff;
    position: absolute;
    right: 0;
}
</style>