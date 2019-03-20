<template>
    <div class="my-tree">
        <input type="text" class="form-control" @click="showTree">
        <div class="tree-box" v-show="show">
            <el-tree :data="data" :props="props" :load="loadNode" lazy accordion show-checkbox check-strictly @node-expand="nodeExpand" @check-change="handleCheckChange">
            </el-tree>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Tree } from 'element-ui'
Vue.use(Tree)

export default {
    name: 'MyTree',
    components: {
        // Tree
    },
    data() {
        return {
            regions: [{
                'name': 'region1',
                'children': [{'name': '666'}]
            }, {
                'name': 'region2',
                'children': []
            }],
            data: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                        label: '三级 1-1-1'
                    }]
                }]
            }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                        label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                        label: '三级 2-2-1'
                    }]
                }]
            }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                        label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                        label: '三级 3-2-1'
                    }]
                }]
            }],
            props: {
                label: 'name',
                children: 'zones'
            },
            show: false
        }
    },
    methods: {
        showTree() {
            this.show = !this.show
        },
        handleCheckChange(data, checked, indeterminate) {
            
        },
        handleNodeClick(data) {
            console.log(data);
        },
        loadNode(node, resolve) {
            this.$emit('lode', node, resolve)
        },
        // getCheckedNodes(arr) {
        //     console.log(arr)
        // },

        nodeExpand(data, node, self) {
            console.log(data)
            console.log(node)
            console.log(self)
            console.log('节点展开了')
            this.$emit('expand', data, node, self)
        }

    }
}

</script>
<style>
.my-tree {
    position: relative;
}
.tree-box {
    position: absolute;
    width: 100%
}
</style>


