<template>
    <b-modal id="update" ref="update" title="编辑商品分类" size="lg" @ok="handleOk" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-6">
                <el-tree :data="treeData" :props="propOption" :load="loadNode" lazy accordion check-strictly @node-click="handleNodeClick" @node-expand="expandClick">
                </el-tree>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="商品分类编码" :label-cols="4" class="text-right">
                    <b-form-input v-model="insertParams.categoryCode" readonly/>
                </b-form-fieldset>
                <b-form-fieldset horizontal label="商品分类名称" :label-cols="4" class="text-right">
                    <b-form-input v-model="insertParams.categoryName" />
                </b-form-fieldset>
                <b-form-fieldset horizontal label="父级商品分类编码" :label-cols="4" class="text-right">
                    <b-form-input v-model="insertParams.fatherCategoryCode" />
                </b-form-fieldset>
                <b-form-fieldset horizontal label="集联数据信息关系" :label-cols="4" class="text-right">
                    <b-form-input v-model="insertParams.relationCodes" />
                </b-form-fieldset>
                <b-form-fieldset horizontal label="备注" :label-cols="4" class="text-right">
                    <b-form-input v-model="insertParams.remark" />
                </b-form-fieldset>
            </div>
        </div>
    </b-modal>
</template>
<script>
import Vue from 'vue'
import { Tree, Message } from 'element-ui'
Vue.use(Tree);
import api from 'common/api'
import config from 'common/config'

export default {
    components: {
        Tree
    },
    data() {
        return {
            treeData: [],
            propOption: {
                children: 'children',
                label: 'categoryName'
            },
            insertParams: {
                categoryCode: '',
                fatherCategoryCode: ''
            }
        }
    },
    mounted() {
        this.getCategoryCode()
    },
    methods: {
        // 加载子树数据
        loadNode(node, resolve) {
            if (node.level === 0) {
                let params = { categoryCode: config.product.classification.rootCode };
                api.product.classification.getSkuCategoryInfoBycategoryCode(params).then(res => {
                    if (res.data.code === 'success') {
                        let obj = res.data.obj;
                        let arr = [{
                            categoryName: obj.categoryName,
                            categoryCode: obj.categoryCode
                        }];
                        return resolve(arr);
                    }
                })
            } else {
                let params = { categoryCode: config.product.classification.rootCode };
                api.product.classification.getSkuCategoryInfoBycategoryCode(params).then(res => {
                    // if (res.data.code === 'success') {
                    //     let items = res.data.obj.salesAreaSubInfo;
                    //     let arr = [];
                    //     if (items !== null) {
                    //         items.forEach((item, index) => {
                    //             let data = {
                    //                 name: item.areaName,
                    //                 code: item.areaCode
                    //             }
                    //             arr.push(data)
                    //         })
                    //     }
                    //     return resolve(arr)
                    // }
                })
            }
        },
        // 节点展开事件
        expandClick() {

        },
        // 节点点击事件
        handleNodeClick(data) {
            console.log(data)
            this.insertParams.fatherCategoryCode = data.categoryCode;
        },
        // 获取商品分类编码
        getCategoryCode() {
            let params = { serviceCode: config.product.classification.getCategoryCode };
            api.ordinalInfo.getSequence(params, res => {
                if (res.data.code === 'success') {
                    let obj = res.data.obj;
                    this.insertParams.categoryCode = obj;
                }
            })
        },
        handleOk() {
            let params = this.insertParams;
            api.product.classification.insert(params).then(res => {
                if (res.data.code === 'success') {
                    Message({
                        type: 'success',
                        message: "操作成功"
                    });
                } else {
                    Message({
                        type: 'error',
                        message: "操作失败"
                    });
                }
            })
        }
    }
};

</script>
<style>
.modal-dialog {
    margin: 80px auto !important;
}
</style>