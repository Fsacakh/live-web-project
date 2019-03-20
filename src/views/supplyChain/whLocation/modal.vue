<template>
    <b-modal id="insert" ref="insert" :title="isInsert ? '新增库位' : '编辑库位'" size="lg" @ok="handleOk" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-6">
                <b-form-fieldset horizontal label="销售区域" :label-cols="4" class="text-right">
                    <areaqueryshop :storeAll="true" ref="area" @select-change="selectChange"></areaqueryshop>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="库位编码" :label-cols="4" class="text-right">
                    <b-form-input v-model="insertParams.whLocationCode" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="库位名称" :label-cols="4" class="text-right">
                    <b-form-input v-model="insertParams.whLocationName" />
                </b-form-fieldset>
            </div> 
            <div class="col-md-6">
                <b-form-fieldset horizontal label="仓库名称 *" :label-cols="4" class="text-right">
                    <div class="text-left">
                        <search
                            ref="searchWh"
                            :hasCheck="whRequired"
                            :dataList="datalist"
                            option="warehouseName"
                            @clearValue="clearValue"
                            @dataChange="querySelect"
                            @itemValue="itemClick"
                            @clickShowBack="firstLoad"
                            @comScroll="scrollBottom">
                        </search>
                    </div>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="库区名称 *" :label-cols="4" class="text-right">
                    <div class="text-left">
                        <search
                            ref="searchWhArea"
                            :hasCheck="whAreaRequired"
                            :dataList="whAreaList"
                            option="whAreaName"
                            @clearValue="whAreaClearValue"
                            @dataChange="whAreaQuerySelect"
                            @itemValue="whAreaItemClick"
                            @clickShowBack="whAreaFirstLoad"
                            @comScroll="whAreaScrollBottom">
                        </search>
                    </div>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="库位存放商品总数" :label-cols="4" class="text-right">
                    <b-form-input v-model="insertParams.skuNums" />
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="前缀" :label-cols="4" class="text-right">
                    <b-form-input v-model="insertParams.prefixValue" />
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="备注" :label-cols="4" class="text-right">
                    <b-form-input v-model="insertParams.remark" />
                </b-form-fieldset>
            </div>
        </div>
    </b-modal>
</template>
<script>
import { Message } from 'element-ui'
import api from 'common/api'
import config from 'common/config'
import { mapGetters, mapActions } from 'vuex'
import Search from "components/iris-search/search"
import Areaqueryshop from 'components/iris-areaqueryshop'

export default {
    props: ['addClicked', 'queryParams', 'showModal'],
    components: {
        Search,
        Areaqueryshop
    },
    data() {
        return {
            insertParams: {
                whLocationType: ''
            },
            isInsert: true,
            // 仓库名称参数
            datalist: [],
            selectParams: {
                storeCodeSet: [],
                pageNums: config.pageNums,
                pageStart: 1
            },
            isLastPage: false,
            // 库区名称参数
            whAreaList: [],
            whAreaSelectParams: {
                warehouseCode: '',
                pageNums: config.pageNums,
                pageStart: 1
            },
            whAreaisLastPage: false,
            whRequired: false,
            whAreaRequired: false
        }
    },
    computed: {
        ...mapGetters('classification', [
            'whLocationDetail'
        ])
    },
    created() {
        api.toLogin.getJurisdiction().then(res => {
            if(res.data.code === 'success') {
                let storeInfoVo = res.data.obj.storeInfoVo
                this.selectParams.storeCodeSet = storeInfoVo ? [storeInfoVo.storeCode] : []
                this.whAreaSelectParams.storeCode = storeInfoVo ? storeInfoVo.storeCode : ''
            }
        })
    },
    methods: {
        
        // 选择门店
        selectChange(sales, stores) {
            if (stores instanceof Array)
                stores.forEach((item) => { item.value && this.selectParams.storeCodeSet.push(item.value) })
            else
                this.selectParams.storeCodeSet = stores.value ? [stores.value] : []
        },

        // 确定新增or修改
        handleOk(event) {
            if(this.insertParams.warehouseCode && this.insertParams.whAreaCode) {
                if (this.isInsert) {
                    delete this.insertParams.id
                    let params = this.insertParams;
                    api.supplyChain.whLocation.insert(params).then(res => {
                        this.alertInfo(res, params)
                    })
                } else {
                    let params = this.insertParams;
                    api.supplyChain.whLocation.update(params).then(res => {
                        let _params = {
                            whLocationCode: this.insertParams.whLocationCode,
                            pageNums: config.pageNums,
                            pageStart: 1
                        }
                        this.alertInfo(res, _params)
                    })
                }
            }else if(!this.insertParams.warehouseCode && this.insertParams.whAreaCode) {
                this.whRequired = true
                this.whAreaRequired = false
                event.cancel()
            }else if(!this.insertParams.whAreaCode && this.insertParams.warehouseCode) {
                this.whRequired = false
                this.whAreaRequired = true
                event.cancel()
            }else {
                this.whRequired = true
                this.whAreaRequired = true
                event.cancel()
            } 
        },
        alertInfo(res, params) {
            if (res.data.code === 'success') {
                Message({
                    type: 'success',
                    message: "操作成功"
                });
                this.getWhlocationObj(params)
            } else {
                Message({
                    type: 'error',
                    message: "操作失败"
                });
            }
        },
        // 获取库位编码
        getwhLocationCode() {
            let params = { serviceCode: config.supplyChain.whLocation.sequence };
            api.ordinalInfo.getSequence(params, res => {
                if (res.data.code === 'success') {
                    let obj = res.data.obj;
                    this.insertParams.whLocationCode = obj;
                }
            })
        },
        // 仓库名称 - 下拉搜索
        clearValue() {
            this.insertParams.warehouseCode = '';
        },
        firstLoad() {
            if(this.selectParams.warehouseName) {
                delete this.selectParams.warehouseName;
            }else if(this.datalist.length !== 0) {
                return;
            }
            let params = this.selectParams;        
            this.queryWhInfo(params, obj => {
                this.datalist = obj.list;
            });
        },
        querySelect(data) {
            this.selectParams.pageStart = 1;
            this.selectParams.warehouseName = data;          
            let params = this.selectParams;        
            this.queryWhInfo(params, obj => {
                this.isLastPage = obj.isLastPage;            
                this.datalist = obj.list;
            });
        },
        itemClick(item) {
            this.$refs.searchWhArea.setValue()
            this.queryParams.whAreaCode = '';
            this.insertParams.warehouseCode = item.warehouseCode;
            this.whAreaFirstLoad() 
        },
        scrollBottom(isEnd) {
            if (isEnd && !this.isLastPage) {
                this.selectParams.pageStart ++
                let params = this.selectParams;        
                this.queryWhInfo(params, obj => {
                    this.isLastPage = obj.isLastPage;
                    this.datalist = this.datalist.concat(obj.list);
                });
            }
        },
        queryWhInfo(params, callback) {
            api.supplyChain.warehouse.getQueryInfo(params).then(res => {
                if (res.data.code === "success") {
                    let obj = res.data.obj;
                    callback(obj);
                }
            });
        },
        // 仓库名称 - 下拉搜索
        whAreaClearValue() {
            this.insertParams.whAreaCode = '';            
        },
        whAreaFirstLoad() {
            if(this.whAreaSelectParams.whAreaName) {
                delete this.whAreaSelectParams.whAreaName;
            }
            let params = this.whAreaSelectParams; 
            params.warehouseCode = this.insertParams.warehouseCode;       
            if(params.warehouseCode) {
                this.queryWhAreaInfo(params, obj => {
                    this.whAreaList = obj.list;
                });
            }
        },
        whAreaQuerySelect(data) {
            this.whAreaSelectParams.pageStart = 1;
            this.whAreaSelectParams.whAreaName = data;
            this.whAreaSelectParams.warehouseCode = this.insertParams.warehouseCode;            
            let params = this.whAreaSelectParams;        
            this.queryWhAreaInfo(params, obj => {
                this.isLastPage = obj.isLastPage;            
                this.whAreaList = obj.list;
            });
        },
        whAreaItemClick(item) {
            this.insertParams.whAreaCode = item.whAreaCode;
        },
        whAreaScrollBottom(isEnd) {
            if (isEnd && !this.isLastPage) {
                this.whAreaSelectParams.pageStart ++
                let params = this.whAreaSelectParams;        
                this.queryWhAreaInfo(params, obj => {
                    this.isLastPage = obj.isLastPage;
                    this.whAreaList = this.whAreaList.concat(obj.list);
                });
            }
        },
        queryWhAreaInfo(params, callback) {
            api.supplyChain.whArea.getQueryInfo(params).then(res => {
                if (res.data.code === "success") {
                    let obj = res.data.obj;
                    callback(obj);
                }
            });
        },
        ...mapActions({
            getWhlocationObj: 'classification/getWhlocationObj'
        })
    },
    watch: {
        // 新增
        addClicked(val) {
            this.whRequired = false
            this.whAreaRequired = false
            this.isInsert = true;
            this.insertParams = {
                whLocationCode: '',
                whLocationName: '',
                warehouseCode: '',
                whAreaCode: '',
                skuNums: '',
                prefixValue: '',
                remark: ''
            };
            this.$refs.searchWh.setValue();
            this.$refs.searchWhArea.setValue();
            this.getwhLocationCode()
        },
        // 详情-修改
        whLocationDetail(val) {
            if (val && this.showModal) {
                this.whRequired = false
                this.whAreaRequired = false
                this.$refs.insert.show();
                this.isInsert = false;
                this.insertParams = {
                    id: val[0].id,
                    whLocationCode: val[0].whLocationCode,
                    whLocationName: val[0].whLocationName,
                    warehouseCode: val[0].warehouseCode,
                    whAreaCode: val[0].whAreaCode,
                    skuNums: val[0].skuNums,
                    prefixValue: val[0].prefixValue,
                    remark: val[0].remark                 
                }
            }
            this.$refs.searchWh.setValue(val[0].warehouseName);
            this.$refs.searchWhArea.setValue(val[0].whAreaName);
        }
    }
};

</script>
<style lang="css" scoped>
.modal-dialog {
    margin: 80px auto !important;
}
</style>
