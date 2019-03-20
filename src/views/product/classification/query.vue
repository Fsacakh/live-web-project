<template>
    <div class="row">
        <div class="col-md-12">
            <b-card header="查询">
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="商品分类编码" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.categoryCode" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="商品分类名称" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.categoryName" />
                        </b-form-fieldset>
                    </div>
                </div>
                <search-btn @reset="reset" @query="query"></search-btn>
            </b-card>
        </div>
    </div>
</template>
<script>

import SearchBtn from 'components/searchBtn/searchBtn'
import config from 'common/config'
import api from 'common/api'
import { mapMutations } from 'vuex'
export default {
    components: {
        SearchBtn
    },
    data() {
        return {
            queryParams: {
                categoryCode: '',
                categoryName: '',
                pageNums: config.pageNums,
                pageStart: 1
            }
        }
    },
    methods: {
        query() {
            this.queryParams.pageStart = 1; // 查询起始页重置为 1
            let params = this.queryParams;
            api.product.classification.getQueryInfo(params).then(res => {
                if(res.data.code === 'success') {
                    let obj = res.data.obj;
                    this.getDatalist(obj)
                }
            })
            this.$emit('query', this.queryParams)
        },
        reset() {
           this.queryParams.categoryCode = '';
           this.queryParams.categoryName = '';
        },
        ...mapMutations({
            getDatalist: 'classification/GET_DATALIST'
        })
    }
}
</script>
