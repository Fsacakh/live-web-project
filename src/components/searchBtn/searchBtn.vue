<template>
    <div class="row">
        <div class="col-md-12 text-right">
            <b-button type="reset" size="sm" @click="myReset">{{resetText}}</b-button>
            <b-button size="sm" variant="primary" @click="myQuery">{{queryText}}</b-button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        resetText: {
            type: String,
            default: '重置'
        },
        queryText: {
            type: String,
            default: '查询'
        }
    },
    methods: {
        myReset() {
            this.$emit('reset')
        },
        myQuery() {
            this.$emit('query')
        }
    }
}
</script>
<style>

</style>