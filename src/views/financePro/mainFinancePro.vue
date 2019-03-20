<template>
<div class="animated fadeIn">
    <search @query="getQueryParams"></search>
    <listbody :toListbody="toListbody"></listbody>
</div>
</template>
<script>


import Search from './search'
import Listbody from './listbody'

export default {
   components: {
       Search,
       Listbody
   },
   data() {
       return {
          toListbody: {}
       }
   },
   methods: {
       getQueryParams(queryParams) {
           this.toListbody = queryParams
       }
   }
}
</script>
<style>

</style>