<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="选择经销商店" :label-cols="4" class="text-right">
                        <div class="text-left">
                            <areaqueryshop ref="areaqueryshop" :readonly="false"  @select-change="selectedfun"></areaqueryshop>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="生产号" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.productionCode"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="车架号" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.carVinNo"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="锁定状态" label-text-align="right" :label-cols="4">
                        <b-form-select :options="lockStatus" v-model="query.lockSubStatus"/>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="querylockinfo(1)">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card class="mb-4">
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :fields="fields" :items="locklist">
                    <template slot="index" slot-scope="data">
                        {{ data.index + (lockPager.pageNo - 1)* lockPager.pageSize + 1 }}
                    </template>
                    <template slot="skuCode" slot-scope="data">
                        <a href="javascript:;" @click="routerTo(data.item.skuCode)">
                            {{ data.item.skuCode }}
                        </a>
                    </template>
                    <template slot="lockStatus" slot-scope="data">
                        {{  data.item.lockStatus == '1'
                            ? ( data.item.lockSubStatus == '1'
                            ? '集团/经销商锁定'
                            : ( data.item.lockSubStatus == '0' ? '销售锁定'
                            : ( data.item.lockSubStatus == '2' ? '厂家锁定'
                            : '调拨锁定')))
                            : '未锁定'
                        }}
                    </template>
                    <template slot="handle" slot-scope="data">
                        <b-button size="sm"
                            v-if="lockBtn"
                            :variant="data.item.lockStatus=='1'?'success':'danger'"
                            @click="handle(data.item)">
                            {{ data.item.lockStatus == '1' ? '解锁': '锁定'}}
                        </b-button>
                    </template>
                    <template slot="empty">
                        暂无数据...
                    </template>
                </b-table>
            </div>
            <pagination 
                class="pull-right" 
                @page-change="pageChange"
                :page-no="lockPager.pageNo"
                :page-size="lockPager.pageSize"
                :total-result="lockPager.total"
                :total-pages="lockPager.totalPages">
            </pagination>
        </b-card>
        <lockmodel 
            :lockInfo="lockinfo"
            :querylockinfo="querylockinfo"
            ref="cl">
        </lockmodel>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import { MessageBox, Button, Message, TimePicker, DatePicker} from 'element-ui'
    import config from '../../../common/config.js'
    import apiUrls from 'common/api-url'
    import Pagination from 'components/pagination/pagination'
    import Areaqueryshop from '../component/areaqueryshop.vue'
    import lockmodel from './lockmodel'
    import api from "common/api";
    import { hasBtn } from 'common/com-api'
    Vue.use(TimePicker)
    Vue.use(DatePicker)
    export default {
        created() {
        },
        data() {
            return {
                query: {
                    pageNums: config.pageNums,
                    pageStart: 1,
                    lockSubStatus: '',
                    productionCode: '',
                    carVinNo: '',
                    skuTypeCode: config.product.archives.archivesType,
                    storeCodeSet: []
                },
                prePage:'', //当前页号
                lockType: config.lockType,
                lockStatus: config.lockStatus,
                select: [],
                fields: {
                    index: {
                        label: '序号'
                    },
                    skuCode: {
                        label: 'SKU编码'
                    },
                    productionCode: {
                        label: '生产号'
                    },
                    carVinNo: {
                        label: '车架号'
                    },
                    carFactoryName: {
                        label: '厂商'
                    },
                    carBrandName: {
                        label: '品牌'
                    },
                    carSeriesName: {
                        label: '车系'
                    },
                    carModelName: {
                        label: '车型'
                    },
                    skuName: {
                        label: 'SKU名称'
                    },
                    // storeName: {
                    //     label: '所属门店'
                    // },
                    lockStatus: {
                        label: '锁定状态'
                    },
                    handle: {
                        label: '操作'
                    }
                },
                // locklist: [],
                lockinfo: {},
            }
        },
        computed: {
            lockBtn() {
                return hasBtn(apiUrls.product.archives.editlock)
            },
            ...mapState('archives', [
                'locklist',
                'lockPager',
                'lockingCode',
            ])
        },
        methods: {
            routerTo(code) {
                this.$store.dispatch('archives/setIsNotEdit', true)
                this.$router.push({
                    path: `/archives/carloadDetails/${code}`
                })
            },
            clear() {
                this.query.lockStatus = '';
                this.query.productionCode = '';
                this.query.carVinNo = '';
                this.$refs.areaqueryshop.reset();
            },
            handle(val) {
                const $this = this;
                if (val.lockStatus == "0") {
                    $this.lockinfo.skuCode = val.skuCode;
                    $this.lockinfo.skuName = val.skuName;
                    $this.getlockCode();
                    this.$refs.cl.childShowModal();
                } else {
                    if(val.lockSubStatus!='0') {
                        $this.$store.dispatch('archives/getCode', {
                            poros: {"serviceCode": config.product.archives.getlockCode},
                            callBack: function (msg) {
                                if(msg.data.code=="success") {
                                    MessageBox.confirm(config.messInfo.deblocking + val.skuName, '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'info',
                                        beforeClose: (action, instance, done) => {
                                            if (action === 'confirm') {
                                                let params = {
                                                    lockingCode: $this.lockingCode,
                                                    skuCode: val.skuCode,
                                                    lockType: '-1',
                                                    pageStart: $this.prePage
                                                }
                                                $this.$store.dispatch('archives/editlock', {
                                                    poros: params,
                                                    callBack: function (msg) {
                                                        if (msg.data.code == "success") {
                                                            Message({
                                                                type: 'info',
                                                                message: config.messInfo.success
                                                            });
                                                            $this.querylockinfo($this.prePage + 1);
                                                            done();
                                                        }
                                                    }
                                                })
                                            } else {
                                                done();
                                                return
                                            }
                                        },
                                        callBack: function () {
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            },
            //获取门店信息
            selectedfun(area, store){
                //当只选择了区域时
                if (!store) {
                    this.getStoreCode(area[0].code);
                } else {
                    this.query.storeCodeSet = [];
                    this.query.storeCodeSet.push(store.value);
                }
            },
            //获取门店CODE
            getStoreCode(salesCode){
                this.query.storeCodeSet = [];
                api.finance.queryShopInfo({
                    salesAreaCodes: [salesCode],
                    needPageFlag: "0"
                }, (res) => {
                    let i = res.data.obj.length;
                    while(i--){
                        this.query.storeCodeSet.push(res.data.obj[i].storeCode)
                    }
                })
            },
            //分页查询整车采购信息
            querylockinfo: function(page) {
                const that = this;
                if (this.query.storeCodeSet[0] == 0 || this.query.storeCodeSet == '') {
                    this.query.storeCodeSet = '';
                    this.query.storeCodeSet = [];
                }
                this.query.pageStart = page  || this.prePage + 1;
                this.$store.dispatch('archives/querylockinfo', {
                    poros: that.query,
                    callBack: function(msg) {
                        that.prePage = msg.data.obj.prePage;
                    }
                })
            },
            getlockCode: function() {
                this.query.pageStart = this.prePage;
                this.$store.dispatch('archives/getCode', {
                    poros: { "serviceCode": config.product.archives.getlockCode },
                    callBack: function (msg) {
                    }
                })
            },
            pageChange(page) {
                this.querylockinfo(page);
            }
        },
        components: {
            lockmodel,
            Pagination,
            Areaqueryshop
        },
    }
</script>
<style lang="scss" scoped>
    .el-input {
        width: 100% !important;
    }
</style>
