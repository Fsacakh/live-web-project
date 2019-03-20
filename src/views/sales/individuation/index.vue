<template>
    <div>
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="销售区域" :label-cols="4" class="text-right">
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" variant="primary" @click="search">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div class="row">
                <div class="col-md-12">
                    <div class="s_btn" v-show="showBtn" size="sm" @click="btnClick">导入</div>
                    <upload v-show="!showBtn"  :formatList="['xlsx']" :addParams="addParams" :validate="validate" :buttonName="buttonName" :analysisExcel="analysisExcel" :url="url" :showBack="showBack"></upload>
                    <b-button size="sm" type="button" @click="downloadExcel">预设模板导出</b-button>
                </div>
            </div>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="dataList.list" :fields="fields">
                    <template slot="index" slot-scope="data">
                        {{data.index + 1 + ((page.pageNo - 1) * page.pageSize)}}
                    </template>
                    <template slot="updateTimeStr" slot-scope="data">
                        {{ data.item.updateTimeStr | switchDate }}
                    </template>
                    <!-- 标准MSRP -->
                    <template slot="standardMSRPInclusiveTax" slot-scope="data">
                        {{ data.item.standardMSRPInclusiveTax | toFixed(2) }}
                    </template>
                    <!-- 实际MSRP -->
                    <template slot="actualMSRPInclusiveTax" slot-scope="data">
                        {{ data.item.actualMSRPInclusiveTax | toFixed(2) }}
                    </template>
                    <!-- 实际采购价格 -->
                    <template slot="purchaseFee" slot-scope="data">
                        {{ data.item.purchaseFee | toFixed(2) }}
                    </template>

                    <template slot="empty">
                        暂无数据...
                    </template>
                </b-table>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <pagination @page-change="pageChange" :page-no="page.pageNo" :page-size="page.pageSize" :total-result="page.total" :total-pages="page.totalPages">
                    </pagination>
                </div>
            </div>
        </b-card>
    </div>
</template>
<script>
import config from 'common/config'
import common from 'common/common'
import api from 'common/api'
import IrisCar from 'components/iris-car'
import upload from 'components/iris-upload'
import Pagination from 'components/pagination/pagination'
import areaqueryshop from 'components/iris-areaqueryshop'
import { Message } from 'element-ui'
export default {
    data () {
        return {
            params: {
                storeCode: '',
                pageNums: config.pageNums,
                pageStart: 1
            },
            showBtn: true,
            dataList:[],
            page:{},
            addParams: {
                relationCode: '',
                singleFlag: '1',
                businessType: ''
            },
            buttonName: '导入',
            showBack:{
                storeCode: ''
            },
            url: '/v1/fileSys/file/parseSystemCarRelationExcelFile',
            page: {
                pageNo: 1,
                pageSize: 15,
                total: 1,
                totalPages: 1
            },
            fields:{
                index: {
                    label:'序号'
                },
                sfxCode: {
                    label: 'SFX'
                },
                colorCode: {
                    label: '颜色Color'
                },
                carCode: {
                    label: 'iris主车型Code'
                },
                brandName: {
                    label: '品牌'
                },
                seriesName: {
                    label: '车系'
                },
                modelName: {
                    label: '车型'
                },
                displayName: {
                    label: '车款'
                },
                standardMSRPInclusiveTax: {
                    label: '标准MSRP'
                },
                actualMSRPInclusiveTax: {
                    label: '实际MSRP'
                },
                purchaseFee: {
                    label: '实际采购价格'
                },
                purchaseRate:{
                    label: '采购税率'
                },
                carAppertanceName: {
                    label: '外观颜色'
                },
                carInteriorName: {
                    label: '内饰颜色'
                },
                updateTimeStr: {
                    label: '更新时间'
                }
            }
        }
    },
    methods:{
        selectStores (sales, stores) {
            this.params.storeCode = stores.value
            console.log(stores.value);
            this.showBack.storeCode = stores.value
            if(stores.value){
                this.showBtn = false
            }
        },
        search(){
            if(!this.params.storeCode){
                Message('请选择门店再查询')
                return
            }
            api.individuation.querySystemCarRelationInfo(this.params, res=>{
                if(res.data.code == 'success'){
                    this.dataList = res.data.obj
                    this.page.pageNo = res.data.obj.pageNum;
                    this.page.totalPages = res.data.obj.pages;
                    this.page.pageSize = res.data.obj.pageSize;
                    this.page.total = res.data.obj.total;
                }
            })
        },
        downloadExcel () {
            window.location.href = common.isDevFile() + '/opt/download/一汽丰田采购设置.xlsx'
        },
        validate() {
            if (this.showBack.storeCode) {
                return true;
            } else {
                return false;
            }
        },
        btnClick () {
            if (!this.params.storeCode) {
                Message ('请选择门店')
                return
            }
        },
        pageChange(page){
            this.params.pageStart = page
            this.search()
        },
        analysisExcel(res){
            Message('导入成功')
            this.search()
        }
    },
    components: {
        areaqueryshop,
        Pagination,
        upload  
    }
}
</script>
<style scoped lang="scss">
    .s_btn{
        border: 1px solid #E8EAEC;
        display: inline-block;
        font-size: 0.875rem;
        line-height: 1.5;
        font-weight: normal;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        padding: 4px 10px;
        border-radius: 3px;
        &:hover {
        background-color: #EEEEEE;
        border: 1px solid #666A6C;
        }
    }
</style>

