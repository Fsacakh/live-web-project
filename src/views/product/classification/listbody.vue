<template>
    <div class="row">
        <div class="col-md-12">
            <b-card>
                <div class="row">
                    <div class="col-md-12">
                        <b-button v-if="addBtn" size="sm" variant="success" @click="insert">新增</b-button>
                        <b-button v-if="editBtn" size="sm" variant="info" @click="update">编辑</b-button>
                        <b-button v-if="syncBtn" size="sm" variant="warning" class="pull-right" @click="init">同步数据</b-button>
                    </div>
                </div>
                <div class="table-scrollable mb-2">
                    <b-table striped hover bordered show-empty :items="datalist.list" :fields="fields">
                        <template slot="radio" slot-scope="data">
                            <div @click="check(data.index)">
                                <input type="radio" name="radio" />
                            </div>
                        </template>
                        <template slot="index" slot-scope="data">{{data.index + 1 + listIndex}}</template>
                        <template slot="isDeleted" slot-scope="row">{{row.value === '0'? '可用' : '停用'}}</template>
                        <template slot="empty">暂无数据</template>
                    </b-table>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <pagination class="pull-right" @page-change="pageChange" :page-no="datalist.pageNum" :page-size="datalist.pageSize" :total-pages="datalist.pages" :total-result="datalist.total">
                        </pagination>
                    </div>
                </div>
                <!-- insert - and - update - modal -->
                <insert-modal :queryParams="queryParams" :showModal="showModal" ref="model"></insert-modal>
            </b-card>
        </div>
    </div>
</template>
<script>

import Pagination from 'components/pagination/pagination'
import InsertModal from './insertModal'
import { mapGetters, mapMutations } from 'vuex'
import { Message } from 'element-ui'
import api from 'common/api'
import { hasBtn } from 'common/com-api'
import apiUrls from 'common/api-url'
export default {
    components: {
        Pagination,
        InsertModal
    },
    props: ['queryParams'],
    data() {
        return {
            fields: {
                radio: {
                    label: '   '
                },
                index: {
                    label: '序号'
                },
                categoryCode: {
                    label: '商品分类编码'
                },
                categoryName: {
                    label: '商品分类名称'
                },
                remark: {
                    label: '备注'
                },
                isDeleted: {
                    label: '状态'
                }
            },
            index: '',
            showModal: true
        }
    },
    computed: {
        // 相关权限控制
        addBtn() {
            return hasBtn(apiUrls.product.classification.insert)
        },
        editBtn() {
            return hasBtn(apiUrls.product.classification.update)
        },
        syncBtn() {
            return hasBtn(apiUrls.product.classification.init)
        },
        listIndex() {
            return (this.datalist.pageNum - 1) * this.datalist.pageSize
        },
        ...mapGetters('classification', [
            'datalist'
        ])
    },
    methods: {
        check(index) {
            this.index = index;
        },
        insert() {
            this.showModal = true;
            this.$refs.model.insertClick()
        },
        update() {
            if (this.index === '') {
                Message({
                    type: 'warning',
                    message: "请选择一条数据"
                });
                this.showModal = false;
                return;
            } else {
                this.showModal = true
                let params = {
                    categoryCode: this.datalist.list[this.index].categoryCode
                };
                api.product.classification.getQueryInfo(params).then(res => {
                    if (res.data.code === 'success') {
                        let list = res.data.obj.list;
                        this.getDetail(list)
                        this.$refs.model.updateClick()
                    }
                })
            }
        },
        init() {
            this.showModal = false
            api.product.classification.init().then(res => {
                if (res.data.code === 'success') {
                    Message({
                        type: 'success',
                        message: "操作成功"
                    });
                    this.showModal = true
                }
            })
        },
        pageChange(page) {
            this.queryParams.pageStart = page;
            let params = this.queryParams;
            api.product.classification.getQueryInfo(params).then(res => {
                if (res.data.code === 'success') {
                    let obj = res.data.obj;
                    this.getDatalist(obj)
                }
            })
        },
        ...mapMutations({
            getDatalist: 'classification/GET_DATALIST',
            getDetail: 'classification/GET_DETAIL'
        })
    }
}
</script>
