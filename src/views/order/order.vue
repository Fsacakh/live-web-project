<template>
    <div class="animated fadeIn">
        <query @query="query" @queryObj = 'queryObj' ref="query"></query>
        <listbody :queryParams="queryParams" :obj="obj" @changeQuery ="changeQuery"></listbody>
    </div>
</template>
<script>
import Query from './query'
import Listbody from './listbody'
import api from 'common/api'
export default {
    components: {
        Query,
        Listbody
    },
    data() {
        return {
            queryParams: {
                storeCodeSet: []
            },
            obj:{},
        }
    },
    methods: {
        query(queryParams) {
            this.queryParams = queryParams;
        },
        queryObj(obj){
        	this.obj = obj
        },
        changeQuery(page){
        	this.$refs.query.query(page)
        },
        // 获取当前登陆人的门店信息
        getCurrentMessage() {
            const _this = this
            api.getUserAvailableInfo((res) => {
                if(res.data.code === 'success' && res.data.obj.availableType == 0 && res.data.obj.storeInfoVo) {
                    _this.queryParams.storeCodeSet.push(res.data.obj.storeInfoVo.storeCode)
                }
            })
        }
    },
    created() {
        const _this = this
        _this.getCurrentMessage()
    },
}
</script>