<template>
    <div class="animated fadeIn">
        <listbody :queryParams="queryParams"></listbody>
    </div>
</template>
<script>
import Listbody from './listbody'

export default {
    components: {
        Listbody
    },
    data() {
        return {
            queryParams: {}
        }
    },
    methods: {
        query(data) {
            this.queryParams = data;
        }
    }
}
</script>
<style>

</style>
