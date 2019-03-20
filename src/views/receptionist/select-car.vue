<template>
<div class="row">
    <div class="col-md-10">
        <b-form-fieldset horizontal label="品牌 *" :label-cols="4" class="text-right">
            <div class="text-left">
                <search
                    ref="brand"
                    :dataList="brandlist"
                    :showSearch="false"
                    :hasCheck='brandCheck'
                    @itemValue="brandItemClick"
                    @clickShowBack="brandFirstLoad"
                    @clearValue="brandClearValue">
                </search>
            </div>
        </b-form-fieldset>
    </div>
    <div class="col-md-10">
        <b-form-fieldset horizontal label="车系 *" :label-cols="4" class="text-right">
            <div class="text-left">
                <search
                    ref="series"
                    :dataList="serieslist"
                    :showSearch="false"
                    :hasCheck='seriesCheck'
                    option="seriesName"
                    @itemValue="seriesItemClick"
                    @clickShowBack="seriesFirstLoad"
                    @clearValue="seriesClearValue">
                </search>
            </div>
        </b-form-fieldset>
    </div>
    <div class="col-md-10">
        <b-form-fieldset horizontal label="车型 *" :label-cols="4" class="text-right">
            <div class="text-left">
                <search
                    ref="model"
                    :dataList="modellist"
                    :showSearch="false"
                    :hasCheck='modelCheck'
                    option="modelName"
                    @itemValue="modelItemClick"
                    @clickShowBack="modelFirstLoad"
                    @clearValue="modelClearValue">
                </search>
            </div>
        </b-form-fieldset>
    </div>    
</div> 
</template>
<script>
import Search from 'components/iris-search/search'
import {queryCarInfo} from './com-reception'
export default {
    components: {
        Search
    },
    props: {
        brandCheck: {
            type: Boolean,
            default: false
        },
        seriesCheck: {
            type: Boolean,
            default: false
        },
        modelCheck: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            brandlist: [],
            brandParams: {
                code: '',
                level: 2,
                type: 0,
            },
            serieslist: [],
            seriesParams: {
                code: '',
                level: 4,
                type: 1,
            },
            modellist: [],
            modelParams: {
                code: '',
                level: 8,
                type: 2,
            },
        }
    },
    methods: {
        // 品牌名称 - 下拉
        brandClearValue() {
            this.$emit('getBrandCode', '')
            this.$refs.brand.setValue()
        },
        brandFirstLoad() {
            let params = this.brandParams;        
            queryCarInfo(params, obj => {
                this.brandlist = obj
            })
        },
        brandItemClick(item) {
            this.seriesParams.code = item.brandCode
            this.$emit('getBrandCode', item.brandCode)
        },
        // 车系名称 - 下拉
        seriesClearValue() {
            this.$emit('getSeriesCode', '')
            this.$refs.series.setValue()            
        },
        seriesFirstLoad() {
            let params = this.seriesParams;        
            queryCarInfo(params, obj => {
                this.serieslist = obj
            });
        },
        seriesItemClick(item) {
            this.modelParams.code = item.seriesCode
            this.$emit('getSeriesCode', item.seriesCode)
        },
        // 车型名称 - 下拉
        modelClearValue() {
            this.$emit('getModelCode', '')
            this.$refs.model.setValue()            
        },
        modelFirstLoad() {
            let params = this.modelParams;        
            queryCarInfo(params, obj => {
                this.modellist = obj
            })
        },
        modelItemClick(item) {
            this.$emit('getModelCode', item.modelCode)
        }
    }
}
</script>
