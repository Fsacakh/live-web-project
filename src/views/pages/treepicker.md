<template>
    <div class="animated fadeIn">
        <b-card>
            <div slot="header">
                <strong>测试树形选择框</strong>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <treepicker :clearButton="true" :options="options" placeholder="选择区域" @data-change="handleDataChange"></treepicker>
                    // clearButton: 是否显示清除数据按钮
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
    import treepicker from '../../components/treepicker/treepicker.vue'
    export default {
        data: function() {
            return {
                options: {
                    treeData: [{  // 树形初始化数据
                            'name': 'region1'
                        },
                        {
                            'name': 'region2'
                        },
                    ],
                    treeProps: {  // 树形节点参数名
                       label: 'name',
                       children: 'zones'
                    },
                    loadNode: this.loadChildren  // 加载节点数据函数
                }
            }
        },
        methods: {
            loadChildren(node, resolve) { // 加载节点数据方法(node: 节点数据, resolve: 加载节点数据回调函数)
                if (node.level === 0) {
                    return resolve([{
                        name: 'region1'
                    }, {
                        name: 'region2'
                    }]);
                }
                if (node.level > 3) return resolve([]);
                var hasChild;
                if (node.data.name === 'region1') {
                    hasChild = true;
                } else if (node.data.name === 'region2') {
                    hasChild = false;
                } else {
                    hasChild = Math.random() > 0.5;
                }
                setTimeout(() => {
                    var data;
                    if (hasChild) {
                        data = [{
                            name: 'zone' + this.count++
                        }, {
                            name: 'zone' + this.count++
                        }];
                    } else {
                        data = [];
                    }
                    resolve(data);
                }, 0);
            },
            handleDataChange(data, checked, indeterminate) {  // 多选框选择数据响应方法(data: 节点数据, checked: 节点是否被选择, indeterminate: checkbox是否处于模糊状态)
                console.log( data + ' ' + checked + ' ' + indeterminate)
            }
        },
        components: {
            treepicker
        }
    }
</script>