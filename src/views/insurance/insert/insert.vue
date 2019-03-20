<template>
<div class="animated fadeIn">
    <company></company>
    <insert-other></insert-other> 
</div>
</template>
<script>

import Company from './company'
import InsertOther from './insertOther'
import { mapMutations } from 'vuex'

export default {
    components: {
        Company,
        InsertOther
    },
    mounted() {
        this.getCocode()
    },
    methods: {
        getCocode() {
            if(!this.$route.params.id) {
                 this.toInsertOrUpdata(false)
            }else {
                this.toInsertOrUpdata(true)
            } 
        },
        ...mapMutations({
            toInsertOrUpdata: 'insurance/TO_INSERT_OR_UPDATA'
        })
    } 
}
</script>
<style>

</style>


