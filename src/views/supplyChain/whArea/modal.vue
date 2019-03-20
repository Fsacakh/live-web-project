<template>
    <b-modal id="insert" ref="insert" :title="isInsert ? '新增库区' : '编辑库区'" size="lg" @ok="handleOk" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-6">
                <b-form-fieldset horizontal label="销售区域" :label-cols="4" class="text-right">
                    <areaqueryshop :storeAll="true" ref="area" @select-change="selectChange"></areaqueryshop>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="库区编码" :label-cols="4" class="text-right">
                    <b-form-input v-model="insertParams.whAreaCode" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="库区名称" :label-cols="4" class="text-right">
                    <b-form-input v-model="insertParams.whAreaName" />
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="库区类型" :label-cols="4" class="text-right">
                    <b-form-select v-model="insertParams.whAreaType" :options="whAreaType">
                    </b-form-select>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="仓库名称 *" :label-cols="4" class="text-right">
                    <div class="text-left">
                        <search
                            ref="search"
                            :hasCheck="required"
                            :dataList="datalist"
                            @clearValue="clearValue"
                            option="warehouseName"
                            @dataChange="querySelect"
                            @itemValue="itemClick"
                            @clickShowBack="firstLoad"
                            @comScroll="scrollBottom">
                        </search>
                    </div>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="占地面积" :label-cols="4" class="text-right">
                    <b-form-input v-model="insertParams.floorSpace" />
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="库位总数" :label-cols="4" class="text-right">
                    <b-form-input v-model="insertParams.whLocationNums" />
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="存放商品总数" :label-cols="4" class="text-right">
                    <b-form-input v-model="insertParams.totalSkuNums" />
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
import Areaqueryshop from 'components/iris-areaqueryshop'
import Search from "components/iris-search/search";

export default {
    props: ['addClicked', 'queryParams', 'showModal'],
    components: {
        Search,
        Areaqueryshop
    },
    data() {
        return {
            insertParams: {
                whAreaCode: '',
                whAreaType: ''
            },
            isInsert: true,
            datalist: [],
            selectParams: {
                storeCodeSet: [],
                pageNums: config.pageNums,
                pageStart: 1
            },
            isLastPage: false,
            required: false
        }
    },
    computed: {
        ...mapGetters('classification', [
            'whAreaDetail',
            'whAreaType'
        ])
    },
    created() {
        api.toLogin.getJurisdiction().then(res => {
            if(res.data.code === 'success') {
                const Vo = res.data.obj || {}
                const storeVo = Vo.storeInfoVo || {}
                this.selectParams.storeCodeSet = storeVo ? [storeVo.storeCode] : ''
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

        // 确定新增or编辑
        handleOk(event) {
            if(this.insertParams.warehouseCode) {
                if (this.isInsert) {
                    delete this.insertParams.id
                    let params = this.insertParams;
                    api.supplyChain.whArea.insert(params).then(res => {
                        this.alertInfo(res, params)
                    })
                } else {
                    let params = this.insertParams;
                    api.supplyChain.whArea.update(params).then(res => {
                        let _params = {
                            whAreaCode: this.insertParams.whAreaCode,
                            pageNums: config.pageNums,
                            pageStart: 1
                        }
                        this.alertInfo(res, _params)
                    })
                }
            }else {
                this.required = true
                event.cancel()
            }

        },
        alertInfo(res, params) {
            if (res.data.code === 'success') {
                Message({
                    type: 'success',
                    message: "操作成功"
                });
                this.getWhAreaObj(params)
            } else {
                Message({
                    type: 'error',
                    message: "操作失败"
                });
            }
        },
        // 获取库区编码
        getWhAreaCode() {
            let params = { serviceCode: config.supplyChain.whArea.sequence };
            api.ordinalInfo.getSequence(params, res => {
                if (res.data.code === 'success') {
                    let obj = res.data.obj;
                    this.insertParams.whAreaCode = obj;
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
                this.insertParams.warehouseCode = obj.list[0].length ? obj.list[0].warehouseCode : '';
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
            this.insertParams.warehouseCode = item.warehouseCode;
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
        ...mapActions({
            getWhAreaObj: 'classification/getWhAreaObj'
        })
    },
    watch: {
        // 新增
        addClicked(val) {
            this.required = false
            this.isInsert = true;
            this.insertParams = {
                whAreaCode: '',
                whAreaName: '',
                whAreaType: '',
                warehouseCode: '',
                floorSpace: '',
                whLocationNums: '',
                totalSkuNums: '',
                prefixValue: '',
                remark: ''
            };
            this.$refs.search.setValue()
            this.getWhAreaCode()
        },
        // 详情-编辑
        whAreaDetail(val) {
            if (val && this.showModal) {
                this.required = false
                this.$refs.insert.show();
                this.isInsert = false;
                this.insertParams = {
                    id: val[0].id,
                    whAreaCode: val[0].whAreaCode,
                    whAreaName: val[0].whAreaName,
                    whAreaType: val[0].whAreaType,
                    warehouseCode: val[0].warehouseCode,
                    floorSpace: val[0].floorSpace,
                    whLocationNums: val[0].whLocationNums,
                    totalSkuNums: val[0].totalSkuNums,
                    prefixValue: val[0].prefixValue,
                    remark: val[0].remark
                }
                this.$refs.search.setValue(val[0].warehouseName)
            }
        }
    }
};

</script>
<style lang="css" scoped>
    .modal-dialog {
        margin: 80px auto !important;
    }
</style>
