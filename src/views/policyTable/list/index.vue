<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="选择经销商店" :label-cols="4" class="text-right">
                        <div class="text-left">
                            <areaqueryshop :readonly="false"  @sales-data="salesdata"  @select-change="selectedfun"></areaqueryshop>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="月份" :label-cols="4" class="text-right">
                        <el-date-picker
                            v-model="value4"
                            type="month"
                            @change="dateChange()"
                            placeholder="选择月">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="queryList(1)">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card class="mb-4">
            <div>
                <b-button v-if="addCheckDetailBtn" size="sm" variant="success" type="button" @click="checkDetail('add', 0)">新增</b-button>
                <b-button v-if="editCheckDetailBtn" size="sm" variant="primary" type="button" @click="checkDetail('edit', statusCode)">编辑</b-button>
            </div>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items='policyList' :fields="fields">
                    <template slot="checkbox" slot-scope="data" class="text-center">
                        <input type="radio" name="models" v-model="statusCode" :value="data.item.managerCode">
                    </template>
                    <template slot="managerCode" slot-scope="data">
                        <a href="javascript:;" @click.prevent="checkDetail('check', data.item.managerCode)">{{data.item.managerCode}}</a>
                    </template>
                    <template slot="index" slot-scope="data">
                        <!-- {{ data.index + (pager.pageNo - 1)* pager.pageSize + 1 }} -->
                    </template>
                    <template slot="empty">
                            暂无数据...
                    </template>
                </b-table>
            </div>
            <pagination class="pull-right" @page-change="pageChange"
                        :page-no="pager.pageNo"
                        :page-size="pager.pageSize"
                        :total-result="pager.total"
                        :total-pages="pager.totalPages">
            </pagination>
        </b-card>
    </div>
</template>
<script>
import Vue from 'vue'
import { MessageBox, Message, TimePicker, DatePicker} from 'element-ui'
import {mapActions, mapMutations, mapState} from 'vuex'
import common from 'common/common'
import config from 'common/config'
import Areaqueryshop from 'components/iris-areaqueryshop/index'
import Pagination from 'components/pagination/pagination'
import apiUrl from 'common/api-url'
import {hasBtn} from 'common/com-api'
Vue.use(TimePicker)
Vue.use(DatePicker)
export default {
    components: {
        Areaqueryshop,
        Pagination
    },
    data() {
        return {
            statusCode: '',
            value4: '',
            tacticsList: [],
            query: {
                yearStr: '',
                monthStr: '',
                storeCode: '',
                pageNums: config.pageNums,
                pageStart: 1,
                crossDeptType: 0
            },
            fields: {
                    checkbox: {
                        label: '序号'
                    },
                    managerCode: {
                        label: '编码'
                    },
                    managerName: {
                        label: '名称'
                    },
                    dateVersion: {
                        label: '日期'
                    },
                    updateTimeStr: {
                        label: '最后更新时间'
                    },
                    updateName: {
                        label: '最后更新人'
                    },
            },
        }
    },
    computed: {
        ...mapState('policyTable', [
            'policyList',
            'pager'
        ]),
        addCheckDetailBtn(){
            return hasBtn(apiUrl.policyTable.editCrossDeptManagerInfoList)
        },
        editCheckDetailBtn(){
            return hasBtn(apiUrl.policyTable.editCrossDeptKpiInfoList)
        }
    },
    methods: {
        ...mapActions('policyTable', [
            'queryPolicy'
        ]),
        salesdata: function() {},
        selectedfun: function(val1, val2) {
            this.query.storeCode = val2.value
            if(val2.value) {
                this.queryList(1)
            }
        },
        checkDetail: function(type, code) {
            if(type == 'edit') {
                if(!this.statusCode) {
                    Message({
                        type: 'info',
                        message: config.messInfo.select
                    });
                    return
                }
            } 
            this.$router.push({
                path: `/policytable/details`,
                query: {
                    status: type,
                    managerCode:type=='add'?0:(type=='check'?code:this.statusCode)

                }
            })
            
        },
        queryList(page) {
            this.query.pageStart = page
            this.queryPolicy({
                poros: this.query,
                callBack: function() {

                },
            })
        },
        clear() {
            this.value4 = ''
        },
        dateChange: function() {
            this.query.yearStr = common.eleTimeFormatim2(this.value4).slice(0, 4)
            this.query.monthStr = common.eleTimeFormatim2(this.value4).slice(5, 7)
            console.log(this.query)
        },
        pageChange: function(page) {
            this.queryList(page)
        }
    }
}
</script>
<style>

</style>
