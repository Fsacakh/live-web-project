<template>
    <div class="animated fadeIn">
        <query @query="query"></query>
        <listbody :queryParams="queryParams"></listbody>
    </div>
</template>
<script>
import Query from './query'
import Listbody from './listbody'

export default {
    components: {
        Query,
        Listbody
    },
    data() {
        return {
            queryParams: {}
        }
    },
    methods: {
        query(queryParams) {
            this.queryParams = queryParams;
        }
    }
}
</script>