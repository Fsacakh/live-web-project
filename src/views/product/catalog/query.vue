<template>
    <div class="row">
        <div class="col-md-12">
            <b-card header="查询">
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="商品目录编码" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.catlogCode" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="商品目录名称" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.catlogName" />
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
                catlogCode: '',
                catlogName: '',
                pageNums: config.pageNums,
                pageStart: 1
            }
        }
    },
    methods: {
        query() {
            this.queryParams.pageStart = 1; // 查询起始页重置为 1
            let params = this.queryParams;
            api.product.catalog.getQueryInfo(params).then(res => {
                if(res.data.code === 'success') {
                    let obj = res.data.obj;
                    this.getObj(obj)
                }
            })
            this.$emit('query', this.queryParams)
        },
        reset() {
           this.queryParams.catlogCode = '';
           this.queryParams.catlogName = '';
        },
        ...mapMutations({
            getObj: 'classification/GET_OBJ'
        })
    }
}
</script>
