<template>
    <div class="row">
        <div class="col-md-12">
            <div class="mb-2">
                <b-button variant="success" size="sm"  @click="add">新增</b-button>
            </div>
            <div>
                <b-table striped hover bordered show-empty :items="saleList" :fields="fields">
                    <template slot="index" slot-scope="data">{{data.index + 1}}</template>
                    <template slot="storeName" slot-scope="row">
                        <a href="javascript:;" v-b-modal.cost @click="getDetail(row)">{{row.value}}</a>
                    </template>
                    <template slot="empty">暂无数据</template>
                </b-table>
            </div>
            <cost-detail @success="queryAgain" :obj="obj" :getCode="getCode" :storeList="storeList"></cost-detail>
        </div>
    </div>
</template>
<script>

import CostDetail from './costDetail'
import { mapGetters, mapMutations } from 'vuex'
import config from 'common/config'
import api from 'common/api'
import { Message } from "element-ui";

export default {
    components: {
        CostDetail
    },
    data() {
        return {
            fields: {
                index: {
                    label: '序号'
                },
                salesAreaName: {
                    label: '销售区域'
                },
                storeName: {
                    label: '经销商店'
                }
            },
            saleList: [],
            showSaleList: false,
            obj: {},
            getCode: 0,
            storeList: []      // 一个门店只能有一条手续费
        }
    },
    computed: {
        ...mapGetters('insurance', [
            'coCode'
        ])
    },
    created() {
        this.getUser()
        if (this.$route.params.id) {
            this.getSaleList()
        }
    },
    methods: {
        add() {
            if(!this.showSaleList && this.saleList.length === 1) {
                Message({
                    type: "warning",
                    message: "该门店下已有手续费"
                });
                return;
            }else {
                this.getCode ++;
            }
        },
        getUser() {
            api.toLogin.getJurisdiction().then(res => {
                if (res.data.code === 'success') {
                    let _obj = res.data.obj;
                    this.obj = _obj;
                    if (_obj.availableType === '0') {
                        this.showSaleList = false;
                    } else {
                        this.showSaleList = true;
                    }
                }
            })
        },
        getSaleList() {
            let params = { coCode: this.$route.params.id || this.coCode }
            api.insurance.queryStoreInfoByCoCode(params).then(res => {
                if (res.data.code === 'success') {
                    this.saleList = res.data.obj
                    this.storeList = []
                    this.saleList.forEach((item) => {
                        this.storeList.push(item.storeCode)
                    });
                }
            })
        },
        queryAgain() {
            this.getSaleList()
        },
        getDetail(value) {
            let params = {
                "storeCode": value.item.storeCode,
                "coCode": this.$route.params.id || this.coCode
            };
            api.insurance.queryCostByCocode(params).then(res => {
                if (res.data.code === 'success') {
                    this.getCostDetail(res.data.obj)
                }
            })
        },
        ...mapMutations({
            getCostDetail: 'insurance/GET_COST_DETAIL'
        })
    },
    watch: {
        coCode(val) {
            if (val) this.getSaleList()
        }
    }
}
</script>
<style>

</style>


