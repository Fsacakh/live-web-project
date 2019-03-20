<template>
    <div class="cuetable-query">
        <div class="row">
            <div class="col-md-12">
                <b-card header="查询">
                    <el-row>
                        <el-col :span="12">
                            <AreaQueryShop ref="areaqueryshop" @select-change="selectStore" />
                        </el-col>
                        <el-col :span="6">
                            <el-date-picker
                                v-model="date"
                                type="month"
                                placeholder="选择年/月"
                            />
                        </el-col>
                    </el-row>
                    <!-- <QueryBtnGroup @resetClick="reset" @query="query(1)" class="btn-wrap" /> -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="pull-right">
                                <b-button size="sm" @click="reset">重置</b-button>
                                <b-button size="sm" variant="primary" @click="query(1)">查询</b-button>
                            </div>
                        </div>
                    </div>
                </b-card>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <b-card>
                    <div class="row">
                        <div class="col-md-12">
                            <el-button type="success" @click="add">新增</el-button>
                            <el-button type="primary" @click="edit">编辑</el-button>
                        </div>
                    </div>
                    <div class="table-scrollable mb-2">
                        <b-table striped hover bordered show-empty :items="tableInfo.list" :fields="fields" empty-text="暂无数据">
                            <template slot="radio" slot-scope="data">
                                <input type="radio" v-model="selectItem" :value="data.item"/>
                            </template>
                            <template slot="managerCode" slot-scope="data">
                                <a href="javascript: " @click="redirectTo('check', data.item)">{{ data.item.managerCode}}</a>
                            </template>
                            <template slot="yearStr" slot-scope="data">{{ data.item.dateVersion.slice(0, 4) }}</template>
                            <template slot="monthStr" slot-scope="data">{{ data.item.dateVersion.slice(-2) }}</template>
                        </b-table>
                    </div>
                    <!-- 分页 -->
                    <div class="row pagination"> 
                        <div class="col-md-12">
                            <Pagination 
                                class="pull-right" 
                                :page-no="tableInfo.pageNum" 
                                :page-size="tableInfo.pageSize" 
                                :total-pages="tableInfo.pages" 
                                :total-result="tableInfo.total"
                                @page-change="query" 
                            />
                        </div>
                    </div>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
    /**
    * Author: Nassua
    * Creat time: 2018-09-06
    * Des: 跨部门线索表查询
    */
    import Vue from 'vue'
    import { mapGetters, mapActions } from 'vuex'
    import { Row, Col, DatePicker, Button, Message } from 'element-ui'
    import AreaQueryShop from 'components/iris-areaqueryshop' 
    // import QueryBtnGroup from 'components/query-btn-group/query-btn-group'
    import Pagination from 'components/pagination/pagination'
    import api from 'common/api'
    import config from 'common/config'
    import { fields } from './config'

    Vue.use(Row)
    Vue.use(Col)
    Vue.use(DatePicker)
    Vue.use(Button)

    export default { 
        data() {
            return {
                storeCode: '',
                date: '',
                fields:fields,
                selectItem: ''
            }
        },
        computed: {
            ...mapGetters('cueTable', ['tableInfo'])
        },
        created() {
        
        },
        methods: {
            
            ...mapActions('cueTable', ['initTableInfo']),

            // 选择门店
            selectStore(area, store) {
                if (store instanceof Object) this.storeCode = store.value
            },

            // 查询
            query(pageStart) {

                const params = {
                    yearStr: this.date && new Date(this.date).Format('yyyy'),
                    monthStr: this.date && new Date(this.date).Format('MM'),
                    storeCode: this.storeCode,
                    crossDeptType: 1,
                    pageNums: config.pageNums,
                    pageStart,
                }

                this.initTableInfo(params)
            },

            // 重置
            reset() {
                
                const userInfo = sessionStorage.getItem('userInfo') && JSON.parse(sessionStorage.getItem('userInfo'))
                const availableType = userInfo.userAvailableInfo.availableType

                if (availableType) {
                    this.storeCode = ''
                    this.$refs.areaqueryshop.resetToStart()
                }

                this.date = ''
            },

            // 新增
            add() {
                this.$router.push({ path: 'add' })
            },

            // 编辑
            edit() {

                if (!this.selectItem) {
                    Message({
                        type: 'warning',
                        message: '请选择数据',
                        showClose: true
                    })
                    return
                }

                this.redirectTo('edit', this.selectItem)
            },

            // 跳转
            redirectTo(path, data) {
                this.$router.push({ 
                    path, 
                    query: { 
                        store: data.storeCode,
                        name: data.storeName, 
                        date: data.dateVersion,
                        manager: data.managerCode 
                    } 
                })
            }
        },  
        components: {
            AreaQueryShop,
            // QueryBtnGroup,
            Pagination
        }
    }
</script>

<style lang="scss">
    .cuetable-query {
        .el-col-6, .btn-wrap {
            box-sizing: border-box;
            padding-left: 30px;
        }
        input::-webkit-input-placeholder {
            color: #3e515b !important;
        }
        .btn-wrap {
            margin-top: 20px;
        }
    }
</style>
