<template>
    <div class="row">
        <div class="col-md-12">
            <b-card>
                <div class="row">
                    <div class="col-md-12">
                        <b-button size="sm" variant="success" @click="insert" v-b-modal.insert>新增</b-button>
                        <b-button size="sm" variant="primary" @click="update">编辑</b-button>
                    </div>
                </div>
                <div class="table-scrollable mb-2">
                    <b-table striped hover bordered show-empty :items="whAreaObj.list" :fields="fields">
                        <template slot="radio" slot-scope="data">
                                <div @click="check(data.index)">
                                    <input type="radio" name="radio" />
                                </div>
</template>
<template slot="whAreaType" slot-scope="data">
     {{whAreaTypeFilter(data.item.whAreaType)}}
</template>
<template slot="index" slot-scope="data">
    {{data.index + 1 + listIndex}}
</template>
<template slot="totalSkuNums" slot-scope="row">
    {{row.value | filter}}
</template>
<template slot="operation" slot-scope="data">
    <b-button type="text" variant="danger" size="sm" @click="deleted(data.item)">
        删除</b-button>
</template>
<template slot="empty">
    暂无数据
</template>
                    </b-table>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <pagination class="pull-right" @page-change="pageChange" :page-no="whAreaObj.pageNum" :page-size="whAreaObj.pageSize" :total-pages="whAreaObj.pages" :total-result="whAreaObj.total">
                        </pagination>
                    </div>
                </div>
                <modal :addClicked="addClicked" :queryParams="queryParams" :showModal="showModal"></modal>
            </b-card>
        </div>
    </div>
</template>
<script>
    import Pagination from 'components/pagination/pagination'
    import Modal from './modal'
    import api from 'common/api'
    import {
        mapActions,
        mapGetters,
        mapMutations
    } from 'vuex'
    import config from 'common/config'
    import Vue from 'vue'
    import {
        Message,
        MessageBox
    } from 'element-ui'
    Vue.component(MessageBox.name, MessageBox)
    export default {
        components: {
            Pagination,
            Modal
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
                    whAreaCode: {
                        label: '库区编码'
                    },
                    whAreaName: {
                        label: '库区名称'
                    },
                    warehouseCode: {
                        label: '仓库编码'
                    },
                    warehouseName: {
                        label: '仓库名称'
                    },
                    whAreaType: {
                        label: '库区类型'
                    },
                    floorSpace: {
                        label: '占地面积'
                    },
                    whLocationNums: {
                        label: '仓库可容纳库位总数'
                    },
                    totalSkuNums: {
                        label: '每个库区可存放商品总数'
                    },
                    prefixValue: {
                        label: '前缀'
                    },
                    remark: {
                        label: '备注'
                    },
                    operation: {
                        label: '操作'
                    }
                },
                addClicked: 0,
                index: '',
                showModal: false
            }
        },
        computed: {
            listIndex() {
                return (this.whAreaObj.pageNum - 1) * this.whAreaObj.pageSize
            },
            ...mapGetters('classification', [
                'whAreaObj', 'whAreaType'
            ])
        },
        methods: {
            check(index) {
                this.index = index;
            },
            insert() {
                this.addClicked++;
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
                    this.showModal = true;
                    let params = {
                        "whAreaCode": this.whAreaObj.list[this.index].whAreaCode
                    };
                    this.getWhAreaDetail(params)
                }
            },
            pageChange(page) {
                this.queryParams.pageStart = page;
                this.queryParams.pageNums = config.pageNums;
                let params = this.queryParams;
                this.getWhAreaObj(params)
            },
            deleted(item) {
                const createElement = this.$createElement;
                MessageBox({
                    title: '提示',
                    message: createElement('p', null, [
                        createElement('span', null, '是否确定删除 '),
                        createElement('span', null, item.whAreaName)
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            if (this.whAreaObj.list.length === 1) {
                                if (this.queryParams.pageStart === 1) {
                                    this.queryParams.pageStart = 1;
                                } else {
                                    this.queryParams.pageStart--
                                }
                            }
                            let params = {
                                id: item.id,
                                whAreaCode: item.whAreaCode,
                                isDeleted: 1,
                                warehouseCode: item.warehouseCode
                            }
                            this.remove(params, () => {
                                done();
                                instance.confirmButtonLoading = false;
                            })
                        } else {
                            done();
                            instance.confirmButtonLoading = false;
                            return
                        }
                    }
                }).then(action => {
                    Message({
                        type: 'success',
                        message: config.messInfo.success
                    });
                }).catch(() => {})
            },
            remove(params, callback) {
                api.supplyChain.whArea.update(params).then(res => {
                    if (res.data.code === 'success') {
                        this.alertInfo(res, true)
                        callback()
                    }
                })
            },
            alertInfo(res, hasCallback = false) {
                if (res.data.code === 'success') {
                    Message({
                        type: 'success',
                        message: "操作成功"
                    });
                    if (hasCallback) {
                        let params = this.queryParams;
                        this.getWhAreaObj(params)
                    }
                } else {
                    Message({
                        type: 'error',
                        message: "操作失败"
                    });
                }
            },
            whAreaTypeFilter(val) {
                let result;
                for (let i = 0; i < this.whAreaType.length; i++) {
                    if (val == this.whAreaType[i].value) {
                        result = this.whAreaType[i].text
                    }
                }
                return result;
            },
            ...mapActions({
                getWhAreaObj: 'classification/getWhAreaObj',
                getWhAreaDetail: 'classification/getWhAreaDetail'
            })
        },
        filters: {
            filter(val) {
                if (val === -1) {
                    return ''
                } else {
                    return val
                }
            }
        }
    }
</script>


