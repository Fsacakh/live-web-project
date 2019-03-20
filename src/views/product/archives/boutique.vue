<template>
        <div class="animated">
            <b-card header="查询">
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="商品编码" :label-cols="4" class="text-right">
                            <b-form-input v-model="query.skuCode"/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="商品名称" :label-cols="4" class="text-right">
                            <b-form-input v-model="query.skuName"/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="商品规格" :label-cols="4" class="text-right">
                            <b-form-input v-model="query.skuStandards"/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="商品型号" :label-cols="4" class="text-right">
                            <b-form-input v-model="query.skuModel"/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="状态" :label-cols="4" class="text-right">
                            <select class="form-control" v-model="query.onOffFlag">
                                <option v-for="(item, index) in onOffFlag" :value="item.value" :key="index">{{item.text}}</option>
                            </select>
                        </b-form-fieldset>
                    </div>
<!--                     <div class="col-md-6">
                        <b-form-fieldset horizontal label="商品编码" :label-cols="4" class="text-right">
                            <b-form-input v-model="query.skuCode"/>
                        </b-form-fieldset>
                    </div> -->
                    <div class="col-md-12">
                        <div class="pull-right">
                            <b-button @click="clear">重置</b-button>
                            <b-button variant="primary" @click="queryArchives(1)">查询</b-button>
                        </div>
                    </div>
                </div>
            </b-card>
            <b-card>
                <div>
                    <b-button v-if="addArchivesBtn" size="sm" variant="success" type="button" @click="addArchives">新增</b-button>
                    <b-button v-if="jumpDetailBtn" size="sm" variant="info" type="button" @click="jumpDetail(selitem)">编辑</b-button>
                    <b-button class="pull-right" size="sm" variant="warning" @click="cache">同步数据</b-button>
                </div>
                <div class="table-scrollable">
                    <b-table striped hover bordered show-empty :items="boutiqueList" :fields="fields">
                        <template slot="checkbox" slot-scope="data" class="text-center">
                            <input type="radio" name="models" v-model="selitem" :value="data.item.skuCode">
                        </template>
                        <template slot="index" slot-scope="data">
                            {{ data.index + (pager.pageNo - 1)* pager.pageSize + 1  }}</a>
                        </template>
                        <template slot="skuCode" slot-scope="data">
                            <a href="javascript:;" @click.prevent="checkDetail(data.item.skuCode)">{{data.item.skuCode}}</a>
                        </template>
                        <template slot="onOffFlag" slot-scope="data">
                            {{data.item.onOffFlag == '0'?'下架':'上架'}}
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
        import { mapState } from 'vuex'
        import config from '../../../common/config.js'
        import { MessageBox, Message} from 'element-ui'
        import api from '../../../common/api'
        import Pagination from 'components/pagination/pagination'
        import apiUrl from 'common/api-url'
        import {hasBtn} from 'common/com-api'
        export default {
            data() {
                return {
                    onOffFlag: [
                        {
                            value: '',
                            text: ''
                        },
                        {
                            value: '1',
                            text: '上架'
                        },
                        {
                            value: '0',
                            text: '下架'
                        }
                    ],
                    selitem: '',
                    query: {
                        skuName: '',
                        skuCode: '',
                        skuModel: '',
                        skuStandards: '',
                        onOffFlag: '',
                        skuType: config.product.archives.boutuqueType,
                        pageNums: config.pageNums,
                        pageStart: 1
                    },
                    fields: {
                        checkbox: {label: '   '},
                        index: {label: '序号'},
                        skuCode: {label: '商品编码'},
                        skuName: {label: '商品名称'},
                        skuStandards: {label: '商品规格'},
                        skuModel: {label: '商品型号'},
                        onOffFlag: {label: "状态"}
                    },
                    list: []
                }
            },
            components: {
                Pagination,
            },
            computed: {
                ...mapState('archives', [
                    'pager',
                    'skuCode',
                    'boutiqueList'
                ]),
                addArchivesBtn(){
                    return hasBtn(apiUrl.product.archives.addArchives)
                },
                jumpDetailBtn(){
                    return hasBtn(apiUrl.product.archives.getEditInfo)
                }
            },
            methods: {
                //同步数据
                cache: function() {
                    api.product.archives.cache({}, (res) => {
                        if (res.data.code == "success") {
                            Message({
                                type: 'info',
                                message: config.messInfo.success
                            });
                        }
                    })
                },
                clear: function () {                         //清除重置
                    this.query.skuCode = ''
                    this.query.skuName = ''
                    this.query.skuStandards = ""
                    this.query.skuModel = ""
                    this.query.onOffFlag = ""
                },
                pageChange(page) {                          //分页查询
                    // this.query.pageStart = page
                    this.queryArchives(page)
                },
                checkDetail: function(id) {
                    this.$router.push({
                        path: `/boutique/boutiqueDetial/${id}`
                    })
                },
                jumpDetail: function (id) {
                    if (id == '') {
                        Message({
                            type: 'info',
                            message: config.messInfo.select
                        });
                    } else {
                        const $this = this
                        let params = {
                            skuCode: id,
                            pageNums: config.pageNums,
                            pageStart: 1
                        }
                        this.$store.dispatch('archives/getEditInfo', {
                            poros: params,
                            callBack: function (msg) {
                                if(msg.data.code == "success") {
                                    $this.$router.push({
                                        path: `/boutique/editboutique/${id}`
                                    })
                                }
                            }
                        })

                    }
                },
                addArchives: function() {
                    let _this = this
                    _this.$router.push({
                        path: `/boutique/addboutique/0`
                    })
                },
                queryArchives: function (page) {                //查询列表
                    const $this = this
                    this.query.pageStart = page
                    this.$store.dispatch('archives/queryArchives', {
                        poros: $this.query,
                        callBack: function (msg) {
                            if(msg.data.code == "success") {
                                $this.list = msg.data.obj.list
                            }
                        }
                    })
                },
            }
        }
    </script>
