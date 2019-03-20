<template>
    <div class="row">
        <div class="col-md-12">
            <b-card>
                <div class="row">
                    <div class="col-md-12">
                        <b-button size="sm" variant="success" @click="insert">新增</b-button>
                        <b-button size="sm" variant="primary" @click="showDetail('update')">编辑</b-button>
                        <b-button size="sm" variant="warning" class="pull-right" @click="init">同步数据</b-button>
                    </div>
                </div>
                <div class="table-scrollable mb-2">
                    <b-table striped hover bordered show-empty :items="getWhObj.list" :fields="fields">
                        <template slot="radio" slot-scope="data">
                            <div @click="check(data.index)">
                                <input type="radio" name="radio" />
                            </div>
                        </template>
                        <template slot="warehouseCode" slot-scope="row">
                            <a href="javascript:;" @click.prevent="showDetail('watch', row.value)">{{ row.value }}</a>
                        </template>
                        <template slot="warehouseType" slot-scope="row">{{row.value | warehouseTypeFilter}}</template>
                        <template slot="calCostType" slot-scope="row">{{row.value | calCostTypeFilter}}</template>
                        <template slot="operation" slot-scope="data">
                            <b-button type="text" variant="danger" size="sm" @click="deleted(data.item)">删除</b-button>
                        </template>
                        <template slot="empty">暂无数据</template>
                    </b-table>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <pagination class="pull-right" @page-change="pageChange" :page-no="getWhObj.pageNum" :page-size="getWhObj.pageSize" :total-pages="getWhObj.pages" :total-result="getWhObj.total">
                        </pagination>
                    </div>
                </div>
            </b-card>
        </div>
    </div>
</template>
<script>

import Pagination from 'components/pagination/pagination'
import api from 'common/api'
import config from 'common/config'
import Vue from 'vue'
import { Message, MessageBox } from 'element-ui'
import { mapActions, mapGetters, mapMutations } from 'vuex'
Vue.component(MessageBox.name, MessageBox)

export default {
    components: {
        Pagination
    },
    props: ['queryParams'],
    data() {
        return {
            fields: {
                radio: {
                    label: '选择'
                },
                warehouseCode: {
                    label: '仓库编码'
                },
                warehouseName: {
                    label: '仓库名称'
                },
                warehouseAddrName: {
                    label: '仓库缩写'
                },
                storeCode: {
                    label: '仓库归属门店'
                },
                warehouseType: {
                    label: '仓库类型'
                },
                contactPerson: {
                    label: '联系人'
                },
                contactPhone: {
                    label: '联系电话'
                },
                warehouseAddress: {
                    label: '仓库地址'
                },
                remark: {
                    label: '备注'
                },
                operation: {
                    label: '操作'
                }
            },
            index: ''
        }
    },
    computed: {
        listIndex() {
            return (this.getWhObj.pageNum - 1) * this.getWhObj.pageSize
        },
        ...mapGetters('classification', [
            'getWhObj'
        ])
    },
    methods: {
        check(index) {
            this.index = index;
        },
        insert() {
            this.setIsWatch(false)
            const _this = this;
            let params = {
                serviceCode: config.supplyChain.warehouse.sequence,
                callback() {
                    _this.$router.push({
                        path: `insertOrUpdate/insert`
                    })
                }
            };
            this.getSequence(params)
        },
        showDetail(h, whCode) {
            if(h === 'watch') {
                this.setIsWatch(true)
                this.toDetail(whCode)
            }else {
                if(this.index === '') {
                    Message({
                        type: 'warning',
                        message: "请选择一条数据"
                    })
                    return
                }
                this.setIsWatch(false)
                let _whCode = this.getWhObj.list[this.index].warehouseCode
                this.toDetail(_whCode)
            }

        },
        toDetail(code) {
            const _this = this;
            let params = {
                whCode: { "warehouseCode": code },
                callback() {
                    _this.$router.push({
                        path: `insertOrUpdate/${code}`
                    })
                }
            };
            this.getWhDetail(params)
        },
        init() {
            api.supplyChain.warehouse.init().then(res => {
                this.alertInfo(res)
            })
        },
        pageChange(page) {
            this.queryParams.pageStart = page;
            this.queryParams.pageNums = config.pageNums;
            let params = this.queryParams;
            this.setWhObj(params)
        },
        deleted(item) {
            const createElement = this.$createElement;
            MessageBox({
                title: '提示',
                message: createElement('p', null, [
                    createElement('span', null, '是否确定删除 '),
                    createElement('span', null, item.warehouseName)
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        // 当删除完第二页的最后一条数据的时候 自动回到上一页
                        // 当删除第一页的最后一条数据的时候应该查询的pagestart重置为1
                        // 新增完一条数据后 - 删除后查询应从第一页开始查
                        if(this.getWhObj.list.length === 1) {
                            if(this.queryParams.pageStart === 1 || this.queryParams.pageStart == undefined ) {
                                this.queryParams.pageStart = 1;
                                this.queryParams.pageNums = config.pageNums
                            }else {
                                this.queryParams.pageStart --
                            }
                        }
                        item.isDeleted = 1;
                        this.update(item, () => {
                            Message({
                                type: 'success',
                                message: config.messInfo.success
                            });
                        })
                        done();
                        instance.confirmButtonLoading = false;
                    } else {
                        done();
                        // instance.confirmButtonLoading = false;
                        return
                    }
                }
            }).then(action => {}).catch(() => {})
        },
        update(params, callback) {
            api.supplyChain.warehouse.update(params).then(res => {
                if(res.data.code === 'success') {
                    callback()
                }else {
                    // this.alertInfo(res, true)
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
                    this.setWhObj(params)
                }
            }
        },
        ...mapActions({
            getSequence: 'classification/getSequence',
            setWhObj: 'classification/getWhObj',
            getWhDetail: 'classification/getWhDetail'
        }),
        ...mapMutations({
            setIsWatch: 'classification/SET_IS_WATCH'
        })
    },
    filters: {
        calCostTypeFilter(val) {
            if (val === '0') {
                return '计件'
            } else if (val === '1') {
                return '移动加权平均'
            } else if (val === '2') {
                return '月末加权平均'
            }
        },
        warehouseTypeFilter(val) {
          if (val === 'DepositWarehouse') {
            return '寄存仓'
          } else if (val === 'ShareWarehouse') {
            return '共享仓'
          } else if (val === 'StoreWarehouse') {
            return '门店仓'
          } else if (val === 'WarehouseTypeCar') {
            return '整车'
          } else if (val === 'WarehouseTypeGood') {
            return '精品'
          }
        }
    }
}
</script>


