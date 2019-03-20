<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <b-card header="查询">
                    <div class="row">
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="客户姓名" :label-cols="4" class="text-right">
                                <b-form-input v-model="queryParams.customName" />
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="手机号" :label-cols="4" class="text-right">
                                <b-form-input v-model="queryParams.mobilePhone" />
                            </b-form-fieldset>
                        </div>
                        <!-- <div class="col-md-6">
                            <b-form-fieldset horizontal label="email" :label-cols="4" class="text-right">
                                <b-form-input v-model="queryParams.email" />
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="身份证号码" :label-cols="4" class="text-right">
                                <b-form-input v-model="queryParams.idCardNumber" />
                            </b-form-fieldset>
                        </div> -->
                    </div>
                    <search-btn @reset="reset" @query="query"></search-btn>
                </b-card>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <b-card>
                    <div class="row">
                        <div class="col-md-12">
                            <router-link to="/clientmain/addclientmain">
                                <b-button size="sm" variant="success" v-b-modal.insert>新增</b-button>
                            </router-link>
                            <b-button size="sm" variant="info" @click="update">编辑</b-button>
                        </div>
                    </div>
                    <div class="table-scrollable mb-2">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr class="text-center">
                                    <th class="text-center"></th>
                                    <th class="text-center">序号</th>
                                    <th class="text-center">客户姓名</th>
                                    <!-- <th class="text-center">客户来源</th> -->
                                    <!-- <th class="text-center">客户类型</th> -->
                                    <th class="text-center">手机号</th>
                                    <th class="text-center">操作</th>
                                </tr>
                            </thead>
                            <tbody class="text-center">
                                <tr v-for="(item,index) in datalist" class="text-center">
                                    <td class="text-center"><input type="radio" name="radio" value="" @click="checked(item)" /></td>
                                    <td class="text-center">{{index+1}}</td>
                                    <td class="text-center">
                                        <router-link :to="`/clientmain/subinfo/${item.customCode}`">
                                            {{item.customName}}
                                        </router-link>
                                    </td>
                                    <!-- <td class="text-center">{{item.customSourceName}}</td>   -->
                                    <!-- <td class="text-center">{{item.customTypeName}}</td> -->
                                    <td class="text-center">{{item.mobilePhone}}</td>
                                    <td class="text-center">
                                        <button @click="removeTree(item)" type="button" class="btn btn-danger btn-sm">删除</button>
                                    </td>
                                </tr>
                                <tr v-if="datalist.length==0">
                                    <td colspan='13' class="text-left">暂无数据...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <!-- :page-no="obj.pageNum" :page-size="obj.pageSize" :total-pages="obj.pages" :total-result="obj.total" -->
                            <pagination class="pull-right" @page-change="pageChange" :page-no="datalistobj.pageNum" :page-size="datalistobj.pageSize" :total-pages="datalistobj.pages" :total-result="datalistobj.total">
                            </pagination>
                        </div>
                    </div>
                </b-card>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import Pagination from 'components/pagination/pagination'
    import api from 'common/api'
    import common from 'common/common'
    import SearchBtn from 'components/searchBtn/searchBtn'
    import config from 'common/config'
    import {
        MessageBox,
        Message
    } from 'element-ui'
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    Vue.component(MessageBox.name, MessageBox) //用use会在页面一加载的时候弹出一个框来
    export default {
        components: {
            Pagination,
            SearchBtn
        },
        data() {
            return {
                datalist: [],
                datalistobj: {},
                queryParams: {
                    mobilePhone: '', //手机号
                    customName: '', //客户名字
                    email: "", //邮箱
                    idCardNumber: "", //身份证号码
                    pageStart: 1,
                    pageNums: config.pageNums,
                },
                checkeddata: false //选中的数据
            }
        },
        methods: {
            update() {
                if (this.checkeddata) {
                    this.$router.push({
                        path: `/clientmain/updataclientmain/${this.checkeddata.customCode}`
                    })
                }
            },
            query() {
                this.checkeddata = false
                this.datalist = [];
                this.datalistobj = {}
                api.clientadmin.clientmaininfo.queryclientmaininfo(this.queryParams, (msg) => {
                    if (msg.data.code === 'success') {
                        this.datalistobj = msg.data.obj
                        this.datalist = msg.data.obj.list
                    }
                })
            },
            reset() {
                this.queryParams = {
                    mobilePhone: '', //手机号
                    customName: '', //客户名字
                    email: "", //邮箱
                    idCardNumber: "", //身份证号码
                    pageStart: 1,
                    pageNums: 5,
                }
            },
            pageChange(page) {
                this.queryParams.pageStart = page
                this.query()
            },
            removeTree(item) {
                MessageBox.confirm('是否删除该数据', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'info'
                }).then(() => {
                    // 点击是的话在这里帮他保存
                    api.clientadmin.clientmaininfo.updataclientmaininfo({
                        id: item.id,
                        customCode: item.customCode,
                        customName: item.customName,
                        customSource: item.customSource,
                        customType: item.customType,
                        mobilePhone: item.mobilePhone,
                        isDeleted: "1"
                    }, (msg) => {
                        if (msg.data.message == 'success') {
                            common.alertInfo('success')
                            this.query()
                        } else {
                            common.alertInfo('warning')
                        }
                    })
                }).catch(() => {});
            },
            checked(item) {
                this.checkeddata = item;
            }
        },
        computed: {
            ...mapState('commoditybrand', [
                'querydata',
            ]),
        },
        mounted() {
            if (this.$route.params.code !== 'customcode') {
                api.clientadmin.clientmaininfo.queryclientmaininfo({
                    customCode: this.$route.params.code
                }, (msg) => {
                    if (msg.data.code === 'success') {
                        this.datalistobj = msg.data.obj
                        this.datalist = msg.data.obj.list
                    }
                })
            }
        }
    }
</script>
