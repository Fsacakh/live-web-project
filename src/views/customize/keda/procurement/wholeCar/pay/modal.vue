<template>
    <b-modal id="detail" ref="detail" title="详细信息" size="lg" ok-title="确定" cancel-title="取消" v-show="load">
        <div class="row">
            <div class="col-md-4 col-sm-6">
                <p>
                    <strong>厂家 : </strong>
                    <span>{{detailInfo.carFactoryName}}</span>
                </p>
            </div>
            <div class="col-md-4 col-sm-6">
                <p>
                    <strong>品牌 : </strong>
                    <span>{{detailInfo.carBrandName}}</span>
                </p>
            </div>
            <div class="col-md-4 col-sm-6">
                <p>
                    <strong>车系 : </strong>
                    <span>{{detailInfo.carSeriesName}}</span>
                </p>
            </div>
            <div class="col-md-4 col-sm-6">
                <p>
                    <strong>车型 : </strong>
                    <span>{{detailInfo.carModelName}}</span>
                </p>
            </div>
            <div class="col-md-4 col-sm-6">
                <p>
                    <strong>物流状态 : </strong>
                    <span>{{detailInfo.logisticsStatus | filter}}</span>
                </p>
            </div>
            <div class="col-md-4 col-sm-6">
                <p>
                    <strong>排量/进气 : </strong>
                    <span>{{opvAndIoType}}</span>
                </p>
            </div>
            <div v-for="(item, index) in list" class="col-md-4 col-sm-6">
                <p>
                    <strong>{{getKey(item.addCode)}} : </strong>
                    <span>{{item.addValue}}</span>
                </p>
            </div>
        </div>
    </b-modal>
</template>
<script>
import {getType} from 'common/com-api'
import config from 'common/config'
import api from 'common/api'
export default {
    data() {
        return {
            detailInfo: {},
            dataList: [],
            refList: [],
            load: false,
            list: []
        }
    },
    computed: {
        opvAndIoType() {
            return `${this.detailInfo.carOpvName}/${this.detailInfo.carIotypeName}`
        }
    },
    created() {
        getType(config.product.archives.refCode, (items) => {
            this.refList = items
        })
    },
    methods: {
        getDefaultInfo(code) {
            let params = {skuCode: code}
            api.product.archives.getEditInfo(params).then( res => {
                if(res.data.code === 'success') {
                    this.load = true
                    this.detailInfo = res.data.obj

                    this.list = []
                    res.data.obj.skuAddInfoVoList.forEach((item) => {
                        let obj = {
                            addCode: item.addCode,
                            addName: item.addName,
                            addValue: item.addValue,
                            // addCode: item.addCode.substring(6)
                        }
                        this.list.push(obj)
                    });
                    // this.list.sort(this._sort('addCode'))
                }
            })
        },
        getKey(item) {
            for(let i = 0, len = this.refList.length; i < len; i ++ ) {
                if(item == this.refList[i].refDetailCode) {
                    return this.refList[i].refDetailName
                }
            }
        },
        _sort(name) {
            return (a, b) => a[name] - b[name]
        }
    },
    filters: {
        filter(val) {
            if(val === -1) {
                return '采购待确认'
            }else if(val === 1) {
                return '在途'
            }else if(val === 2) {
                return '入库'
            }
        }
    }
}
</script>
