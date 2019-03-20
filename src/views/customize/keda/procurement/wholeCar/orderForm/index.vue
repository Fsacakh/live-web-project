<template>
    <div class="animated fadeIn">
        <query :giveData="getData" ref="query"></query>
        <listbody @downLoadList='downLoadList' :dataList="dataList" :page="page"  :giveData="getData" :queryCondition="queryCondition"></listbody>
    </div>
</template>
<script>
import Query from './query'
import Listbody from './listbody'

export default {
    data() {
        return {
            dataList: [],
            page: {},
            queryCondition: {}
        }
    },
    methods: {
        downLoadList: function() {
            this.$refs.query.downLoadList()
        },
        getData(res, arg1) {
            const _this = this
            _this.dataList = res.data.obj.list
            _this.page.pageNo = res.data.obj.pageNum
            _this.page.totalResult = res.data.obj.total
            _this.page.totalPages = res.data.obj.pages
            _this.page.pageSize = res.data.obj.pageSize
            _this.queryCondition = arg1
        }
    },
    components: {
        Query,
        Listbody
    }
}
</script>
